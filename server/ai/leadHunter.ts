import { AIService } from './aiService';
import { aiConfig } from './config';

export interface LeadSource {
  name: string;
  url: string;
  lastChecked?: Date;
  isActive: boolean;
}

export interface RawLead {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  source: string;
  listingUrl?: string;
  listingPrice?: number;
  listingLocation?: string;
  conversationHistory?: string;
  rawData: Record<string, any>;
}

export interface ProcessedLead extends RawLead {
  deduplicationHash: string;
  qualityScore: number;
  intent: string;
  confidence: number;
  enrichedData?: Record<string, any>;
  isQualified: boolean;
}

export class LeadHunterService {
  private aiService: AIService;
  private config: typeof aiConfig;
  private processedLeads: Map<string, ProcessedLead> = new Map();

  constructor(config: typeof aiConfig = aiConfig) {
    this.config = config;
    this.aiService = new AIService(config);
  }

  /**
   * Generate a unique hash for deduplication
   */
  private generateLeadHash(lead: RawLead): string {
    const key = `${lead.firstName}_${lead.lastName}_${lead.email || lead.phone}`.toLowerCase();
    return Buffer.from(key).toString('base64');
  }

  /**
   * Check if lead already exists (deduplication)
   */
  private isDuplicate(lead: RawLead): boolean {
    const hash = this.generateLeadHash(lead);
    return this.processedLeads.has(hash);
  }

  /**
   * Scrape leads from Zillow property pages
   */
  async scrapeZillowLeads(propertyUrl: string): Promise<RawLead[]> {
    try {
      console.log(`Scraping Zillow: ${propertyUrl}`);
      
      // In production, use libraries like puppeteer or cheerio
      // For now, return mock data structure
      
      const mockLeads: RawLead[] = [
        {
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@example.com',
          phone: '+1234567890',
          source: 'zillow_inquiry',
          listingUrl: propertyUrl,
          listingPrice: 450000,
          listingLocation: 'San Francisco, CA',
          rawData: {
            inquiryTime: new Date(),
            ipAddress: '192.168.1.1',
            userAgent: 'Mozilla/5.0...',
          },
        },
      ];

      return mockLeads;
    } catch (error) {
      console.error('Error scraping Zillow:', error);
      return [];
    }
  }

  /**
   * Scrape leads from MLS listings
   */
  async scrapeMLSLeads(mlsId: string): Promise<RawLead[]> {
    try {
      console.log(`Fetching MLS leads: ${mlsId}`);
      
      // In production, integrate with MLS API
      // For now, return mock structure
      
      const mockLeads: RawLead[] = [];
      return mockLeads;
    } catch (error) {
      console.error('Error fetching MLS leads:', error);
      return [];
    }
  }

  /**
   * Scrape leads from Facebook Lead Ads
   */
  async scrapeFacebookLeads(): Promise<RawLead[]> {
    try {
      console.log('Fetching Facebook Lead Ads');
      
      // In production, use Facebook Graph API
      // For now, return mock structure
      
      const mockLeads: RawLead[] = [];
      return mockLeads;
    } catch (error) {
      console.error('Error fetching Facebook leads:', error);
      return [];
    }
  }

  /**
   * Scrape leads from classifieds sites
   */
  async scrapeClassifieds(query: string): Promise<RawLead[]> {
    try {
      console.log(`Searching classifieds: ${query}`);
      
      // In production, scrape sites like Craigslist, Facebook Marketplace
      // For now, return mock structure
      
      const mockLeads: RawLead[] = [];
      return mockLeads;
    } catch (error) {
      console.error('Error scraping classifieds:', error);
      return [];
    }
  }

  /**
   * Scrape leads from social media (Twitter, Instagram, etc)
   */
  async scrapeSocialMedia(hashtags: string[]): Promise<RawLead[]> {
    try {
      console.log(`Searching social media: ${hashtags.join(', ')}`);
      
      // In production, use social media APIs
      // For now, return mock structure
      
      const mockLeads: RawLead[] = [];
      return mockLeads;
    } catch (error) {
      console.error('Error scraping social media:', error);
      return [];
    }
  }

  /**
   * Process and qualify raw leads
   */
  async processLeads(rawLeads: RawLead[]): Promise<ProcessedLead[]> {
    const processedLeads: ProcessedLead[] = [];

    for (const lead of rawLeads) {
      try {
        // Skip duplicates
        if (this.isDuplicate(lead)) {
          console.log(`Skipping duplicate: ${lead.firstName} ${lead.lastName}`);
          continue;
        }

        // Score the lead quality
        const scoreResult = await this.aiService.analyzeLeadQuality({
          firstName: lead.firstName,
          email: lead.email,
          phone: lead.phone,
          source: lead.source,
          budget: lead.rawData.budget,
          interestedProperties: lead.rawData.propertyViews || 0,
          conversationHistory: lead.conversationHistory,
        });

        // Classify intent
        const intentResult = await this.aiService.classifyLeadIntent(
          lead.conversationHistory || `${lead.firstName} from ${lead.source}`
        );

        // Check if meets quality threshold
        const isQualified =
          scoreResult.qualityScore >=
          (this.config.leadHunter.qualityThreshold * 100);

        const hash = this.generateLeadHash(lead);
        const processed: ProcessedLead = {
          ...lead,
          deduplicationHash: hash,
          qualityScore: scoreResult.qualityScore,
          intent: intentResult.intent,
          confidence: intentResult.confidence,
          isQualified,
        };

        processedLeads.push(processed);
        this.processedLeads.set(hash, processed);
      } catch (error) {
        console.error(`Error processing lead ${lead.firstName}:`, error);
      }
    }

    return processedLeads;
  }

  /**
   * Collect leads from all enabled sources
   */
  async collectLeadsFromAllSources(): Promise<RawLead[]> {
    const allLeads: RawLead[] = [];
    const sources = this.config.leadHunter.sources;

    try {
      // Collect from each source in parallel
      const promises = [];

      if (sources.includes('zillow')) {
        promises.push(
          this.scrapeZillowLeads('https://www.zillow.com/homes/for_sale/').then(
            (leads) => allLeads.push(...leads)
          )
        );
      }

      if (sources.includes('mls')) {
        promises.push(
          this.scrapeMLSLeads('all').then((leads) => allLeads.push(...leads))
        );
      }

      if (sources.includes('facebook_leads')) {
        promises.push(
          this.scrapeFacebookLeads().then((leads) => allLeads.push(...leads))
        );
      }

      if (sources.includes('classifieds')) {
        promises.push(
          this.scrapeClassifieds('real estate').then((leads) =>
            allLeads.push(...leads)
          )
        );
      }

      if (sources.includes('social_media')) {
        promises.push(
          this.scrapeSocialMedia(['#realestate', '#homeshopping']).then((leads) =>
            allLeads.push(...leads)
          )
        );
      }

      await Promise.all(promises);
    } catch (error) {
      console.error('Error collecting leads from all sources:', error);
    }

    return allLeads;
  }

  /**
   * Run the complete lead hunting pipeline
   */
  async huntLeads(): Promise<ProcessedLead[]> {
    try {
      console.log('🔍 Starting lead hunt...');

      // Step 1: Collect leads from all sources
      console.log('📊 Collecting leads from all sources...');
      const rawLeads = await this.collectLeadsFromAllSources();
      console.log(`📈 Found ${rawLeads.length} raw leads`);

      // Step 2: Process and qualify leads
      console.log('⚙️ Processing and qualifying leads...');
      const qualifiedLeads = await this.processLeads(rawLeads);
      console.log(`✅ Qualified ${qualifiedLeads.length} leads`);

      // Step 3: Filter for qualified leads only
      const hotLeads = qualifiedLeads.filter((lead) => lead.isQualified);
      console.log(`🔥 ${hotLeads.length} hot leads ready for followup`);

      return hotLeads;
    } catch (error) {
      console.error('Error in lead hunting pipeline:', error);
      return [];
    }
  }

  /**
   * Get statistics about leads hunted
   */
  getLeadStatistics(): {
    totalProcessed: number;
    totalQualified: number;
    bySource: Record<string, number>;
    byIntent: Record<string, number>;
    averageQualityScore: number;
  } {
    const leads = Array.from(this.processedLeads.values());

    const bySource: Record<string, number> = {};
    const byIntent: Record<string, number> = {};
    let totalScore = 0;

    leads.forEach((lead) => {
      bySource[lead.source] = (bySource[lead.source] || 0) + 1;
      byIntent[lead.intent] = (byIntent[lead.intent] || 0) + 1;
      totalScore += lead.qualityScore;
    });

    const qualified = leads.filter((l) => l.isQualified).length;

    return {
      totalProcessed: leads.length,
      totalQualified: qualified,
      bySource,
      byIntent,
      averageQualityScore:
        leads.length > 0 ? totalScore / leads.length : 0,
    };
  }

  /**
   * Export leads for CRM import
   */
  exportLeads(
    format: 'json' | 'csv' = 'json',
    onlyQualified: boolean = true
  ): string {
    const leads = Array.from(this.processedLeads.values()).filter(
      (lead) => !onlyQualified || lead.isQualified
    );

    if (format === 'json') {
      return JSON.stringify(leads, null, 2);
    }

    // CSV format
    const headers = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'source',
      'qualityScore',
      'intent',
      'listingLocation',
    ];
    const rows = leads.map((lead) => [
      lead.firstName,
      lead.lastName,
      lead.email || '',
      lead.phone || '',
      lead.source,
      lead.qualityScore,
      lead.intent,
      lead.listingLocation || '',
    ]);

    const csv =
      headers.join(',') +
      '\n' +
      rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

    return csv;
  }

  /**
   * Schedule periodic lead hunting
   */
  scheduleLeadHunt(intervalMs: number = 15 * 60 * 1000): NodeJS.Timer {
    console.log(
      `⏰ Scheduling lead hunt every ${intervalMs / 1000 / 60} minutes`
    );

    return setInterval(async () => {
      console.log('🔄 Running scheduled lead hunt...');
      await this.huntLeads();
    }, intervalMs);
  }
}
