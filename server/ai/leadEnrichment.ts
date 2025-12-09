import { AIService } from './aiService';
import { aiConfig } from './config';

export interface LeadToEnrich {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  location?: string;
}

export interface EnrichedLeadData {
  leadId: string;
  basicInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    title?: string;
    location?: string;
  };
  clearbitData?: {
    domain?: string;
    industry?: string;
    companySize?: string;
    companyFounded?: number;
    companyRevenue?: string;
  };
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  publicRecords?: {
    homeOwner?: boolean;
    propertyValue?: number;
    mortgageStatus?: string;
    taxAssessment?: number;
  };
  predictedBudget?: number;
  buyingTimeline?: 'immediate' | 'soon' | 'exploring' | 'unknown';
  dataQualityScore: number; // 0-1
  enrichedAt: Date;
  sources: string[];
}

export class LeadEnrichmentEngine {
  private aiService: AIService;
  private config: typeof aiConfig;
  private enrichedLeads: Map<string, EnrichedLeadData> = new Map();

  constructor(config: typeof aiConfig = aiConfig) {
    this.config = config;
    this.aiService = new AIService(config);
  }

  /**
   * Enrich a single lead with Clearbit data
   */
  async enrichWithClearbit(lead: LeadToEnrich): Promise<Partial<EnrichedLeadData>> {
    try {
      if (!this.config.leadEnrichment.clearbit.apiKey) {
        console.warn('Clearbit API key not configured');
        return {};
      }

      console.log(`Enriching ${lead.email} with Clearbit...`);

      // In production: make actual API call to Clearbit
      // For now, return mock structure
      const mockClearbitData = {
        clearbitData: {
          domain: lead.company?.toLowerCase().replace(/\s+/g, '') + '.com',
          industry: 'Real Estate',
          companySize: '50-200',
          companyFounded: 2015,
          companyRevenue: '$10M-50M',
        },
        socialProfiles: {
          linkedin: `https://linkedin.com/in/${lead.firstName.toLowerCase()}-${lead.lastName.toLowerCase()}`,
          twitter: `@${lead.firstName}${lead.lastName}`.toLowerCase(),
        },
      };

      return mockClearbitData;
    } catch (error) {
      console.error('Error enriching with Clearbit:', error);
      return {};
    }
  }

  /**
   * Enrich a lead with public records data
   */
  async enrichWithPublicRecords(lead: LeadToEnrich): Promise<Partial<EnrichedLeadData>> {
    try {
      console.log(`Enriching ${lead.firstName} with public records...`);

      // In production: integrate with property data APIs
      // Examples: Zillow API, CoreLogic, RealAssure
      
      // For now, return mock structure
      const mockPublicRecords = {
        publicRecords: {
          homeOwner: Math.random() > 0.5,
          propertyValue: Math.floor(Math.random() * 1000000) + 200000,
          mortgageStatus: 'active',
          taxAssessment: Math.floor(Math.random() * 500000) + 150000,
        },
      };

      return mockPublicRecords;
    } catch (error) {
      console.error('Error enriching with public records:', error);
      return {};
    }
  }

  /**
   * Extract entities and predict buying intent from text
   */
  async extractIntentFromConversation(conversationHistory: string): Promise<{
    budget?: number;
    timeline?: 'immediate' | 'soon' | 'exploring' | 'unknown';
    propertyType?: string;
    location?: string;
  }> {
    try {
      // Use AI to extract intent from conversation
      const entities = await this.aiService.extractEntities(conversationHistory);
      const intent = await this.aiService.classifyLeadIntent(conversationHistory);

      // Parse budget from conversation
      const budgetMatch = conversationHistory.match(/\$(\d+[km]?)/i);
      let budget = undefined;
      if (budgetMatch) {
        budget = parseInt(budgetMatch[1]) * (budgetMatch[1].toLowerCase().includes('m') ? 1000000 : 1000);
      }

      return {
        budget,
        timeline: intent.category === 'buyer' ? 'soon' : 'exploring',
        location: entities.locations?.[0],
        propertyType: conversationHistory.includes('apartment') ? 'apartment' : 'house',
      };
    } catch (error) {
      console.error('Error extracting intent:', error);
      return {};
    }
  }

  /**
   * Calculate data quality score based on enrichment completeness
   */
  private calculateQualityScore(data: Partial<EnrichedLeadData>): number {
    let score = 0.5; // Start with base 0.5

    // Email: +0.1
    if (data.basicInfo?.email) score += 0.1;

    // Phone: +0.1
    if (data.basicInfo?.phone) score += 0.1;

    // Clearbit data: +0.15
    if (data.clearbitData) score += 0.15;

    // Public records: +0.2
    if (data.publicRecords?.homeOwner !== undefined) score += 0.2;

    // Social profiles: +0.1
    if (data.socialProfiles && Object.keys(data.socialProfiles).length > 0) {
      score += 0.1;
    }

    // Predicted budget: +0.1
    if (data.predictedBudget) score += 0.1;

    return Math.min(score, 1.0); // Cap at 1.0
  }

  /**
   * Enrich a single lead with all available data
   */
  async enrichLead(lead: LeadToEnrich): Promise<EnrichedLeadData> {
    try {
      console.log(`🔍 Enriching lead: ${lead.firstName} ${lead.lastName}`);

      // Collect data from all sources in parallel
      const [clearbitData, publicRecordsData] = await Promise.all([
        this.enrichWithClearbit(lead),
        this.enrichWithPublicRecords(lead),
      ]);

      // Merge all data
      const enrichedData: EnrichedLeadData = {
        leadId: lead.id,
        basicInfo: {
          name: `${lead.firstName} ${lead.lastName}`,
          email: lead.email || '',
          phone: lead.phone,
          company: lead.company,
          location: lead.location,
        },
        ...clearbitData,
        ...publicRecordsData,
        dataQualityScore: 0, // Will be calculated below
        enrichedAt: new Date(),
        sources: ['manual'],
      };

      // Extract intent from any available text
      if (lead.company || lead.location) {
        const intentData = await this.extractIntentFromConversation(
          `${lead.firstName} from ${lead.company || ''} in ${lead.location || ''}`
        );
        enrichedData.buyingTimeline = intentData.timeline;
        enrichedData.predictedBudget = intentData.budget;
      }

      // Calculate quality score
      enrichedData.dataQualityScore = this.calculateQualityScore(enrichedData);

      // Track sources
      if (clearbitData.clearbitData) enrichedData.sources.push('clearbit');
      if (publicRecordsData.publicRecords) enrichedData.sources.push('public_records');

      // Store in cache
      this.enrichedLeads.set(lead.id, enrichedData);

      console.log(
        `✅ Enriched ${lead.firstName}: quality score ${enrichedData.dataQualityScore.toFixed(2)}`
      );

      return enrichedData;
    } catch (error) {
      console.error(`Error enriching lead ${lead.firstName}:`, error);
      throw error;
    }
  }

  /**
   * Enrich multiple leads in batch
   */
  async enrichLeadsBatch(leads: LeadToEnrich[]): Promise<EnrichedLeadData[]> {
    console.log(`📦 Enriching batch of ${leads.length} leads...`);

    const enrichedLeads: EnrichedLeadData[] = [];
    const batchSize = 5; // API-friendly batch size

    for (let i = 0; i < leads.length; i += batchSize) {
      const batch = leads.slice(i, i + batchSize);
      const results = await Promise.all(batch.map((lead) => this.enrichLead(lead)));
      enrichedLeads.push(...results);

      // Rate limiting
      if (i + batchSize < leads.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log(`✅ Enriched ${enrichedLeads.length} leads`);
    return enrichedLeads;
  }

  /**
   * Identify high-value leads (home owners with good budgets)
   */
  identifyHighValueLeads(
    minQualityScore: number = 0.7,
    minBudget?: number
  ): EnrichedLeadData[] {
    const leads = Array.from(this.enrichedLeads.values());

    return leads.filter(
      (lead) =>
        lead.dataQualityScore >= minQualityScore &&
        (lead.publicRecords?.homeOwner === true ||
          (lead.predictedBudget && (!minBudget || lead.predictedBudget >= minBudget)))
    );
  }

  /**
   * Get enriched lead by ID
   */
  getEnrichedLead(leadId: string): EnrichedLeadData | undefined {
    return this.enrichedLeads.get(leadId);
  }

  /**
   * Get enrichment statistics
   */
  getStatistics(): {
    totalEnriched: number;
    averageQualityScore: number;
    highValueLeads: number;
    byDataSource: Record<string, number>;
  } {
    const leads = Array.from(this.enrichedLeads.values());
    const sourceCount: Record<string, number> = {};

    let qualitySum = 0;
    let highValueCount = 0;

    leads.forEach((lead) => {
      qualitySum += lead.dataQualityScore;

      if (lead.publicRecords?.homeOwner && lead.predictedBudget) {
        highValueCount++;
      }

      lead.sources.forEach((source) => {
        sourceCount[source] = (sourceCount[source] || 0) + 1;
      });
    });

    return {
      totalEnriched: leads.length,
      averageQualityScore:
        leads.length > 0 ? qualitySum / leads.length : 0,
      highValueLeads: highValueCount,
      byDataSource: sourceCount,
    };
  }

  /**
   * Export enriched leads as CSV
   */
  exportEnrichedLeads(format: 'json' | 'csv' = 'json'): string {
    const leads = Array.from(this.enrichedLeads.values());

    if (format === 'json') {
      return JSON.stringify(leads, null, 2);
    }

    // CSV format
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Company',
      'Location',
      'Home Owner',
      'Predicted Budget',
      'Buying Timeline',
      'Quality Score',
      'Sources',
    ];

    const rows = leads.map((lead) => [
      lead.basicInfo.name,
      lead.basicInfo.email,
      lead.basicInfo.phone || '',
      lead.basicInfo.company || '',
      lead.basicInfo.location || '',
      lead.publicRecords?.homeOwner ? 'Yes' : 'No',
      lead.predictedBudget ? `$${lead.predictedBudget.toLocaleString()}` : 'Unknown',
      lead.buyingTimeline || 'Unknown',
      lead.dataQualityScore.toFixed(2),
      lead.sources.join('; '),
    ]);

    const csv =
      headers.join(',') +
      '\n' +
      rows
        .map((row) => row.map((cell) => `"${cell}"`).join(','))
        .join('\n');

    return csv;
  }
}
