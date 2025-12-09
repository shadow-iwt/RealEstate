import { OpenAI } from 'openai';
import { aiConfig } from './config';

export class AIService {
  private openai: OpenAI;
  private config: typeof aiConfig;

  constructor(config: typeof aiConfig = aiConfig) {
    this.config = config;
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || config.openai.apiKey,
    });
  }

  /**
   * Generate embeddings for text using OpenAI
   */
  async generateEmbeddings(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: this.config.openai.models.embedding,
        input: text,
      });
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embeddings:', error);
      throw error;
    }
  }

  /**
   * Chat completion with context
   */
  async chatCompletion(
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
    systemPrompt?: string
  ): Promise<string> {
    try {
      const allMessages = [
        {
          role: 'system' as const,
          content: systemPrompt || this.config.chatbot.systemPrompt,
        },
        ...messages,
      ];

      const response = await this.openai.chat.completions.create({
        model: this.config.chatbot.model,
        messages: allMessages,
        temperature: this.config.chatbot.temperature,
        max_tokens: this.config.openai.maxTokens,
      });

      return response.choices[0].message.content || '';
    } catch (error) {
      console.error('Error in chat completion:', error);
      throw error;
    }
  }

  /**
   * Generate text for various purposes
   */
  async generateText(
    prompt: string,
    maxTokens: number = 500
  ): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: this.config.openai.models.gpt35,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens,
        temperature: 0.7,
      });

      return response.choices[0].message.content || '';
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }

  /**
   * Analyze sentiment of text (positive, negative, neutral)
   */
  async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }> {
    try {
      const prompt = 'Analyze the sentiment of this text. Respond with ONLY: "positive", "negative", or "neutral" followed by a score from -1 to 1.' +
        '\n\nText: ' + text;

      const response = await this.generateText(prompt, 100);
      
      let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
      let score = 0;

      if (response.includes('positive')) {
        sentiment = 'positive';
        score = 1;
      } else if (response.includes('negative')) {
        sentiment = 'negative';
        score = -1;
      }

      return { sentiment, score };
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return { sentiment: 'neutral', score: 0 };
    }
  }

  /**
   * Extract named entities from text
   */
  async extractEntities(text: string): Promise<{
    names: string[];
    locations: string[];
    organizations: string[];
    properties: string[];
  }> {
    try {
      const prompt = 'Extract named entities from this text. List: names, locations, organizations, properties.' +
        '\n\nText: ' + text +
        '\n\nRespond in JSON format.';

      const response = await this.generateText(prompt, 300);
      
      try {
        const parsed = JSON.parse(response);
        return {
          names: parsed.names || [],
          locations: parsed.locations || [],
          organizations: parsed.organizations || [],
          properties: parsed.properties || [],
        };
      } catch {
        return { names: [], locations: [], organizations: [], properties: [] };
      }
    } catch (error) {
      console.error('Error extracting entities:', error);
      return { names: [], locations: [], organizations: [], properties: [] };
    }
  }

  /**
   * Classify lead intent (buyer, seller, investor, etc)
   */
  async classifyLeadIntent(conversationHistory: string): Promise<{
    intent: string;
    confidence: number;
    category: 'buyer' | 'seller' | 'investor' | 'unknown';
  }> {
    try {
      const prompt = 'Based on this conversation, classify the lead intent. ' +
        'Is this person a buyer, seller, or investor? ' +
        'Respond in JSON with: intent (string), confidence (0-1), category (buyer|seller|investor|unknown).' +
        '\n\nConversation: ' + conversationHistory;

      const response = await this.generateText(prompt, 200);
      
      try {
        const parsed = JSON.parse(response);
        return {
          intent: parsed.intent || 'unknown',
          confidence: parsed.confidence || 0.5,
          category: parsed.category || 'unknown',
        };
      } catch {
        return { intent: 'unknown', confidence: 0, category: 'unknown' };
      }
    } catch (error) {
      console.error('Error classifying intent:', error);
      return { intent: 'unknown', confidence: 0, category: 'unknown' };
    }
  }

  /**
   * Generate property recommendations based on preferences
   */
  async generatePropertyRecommendations(
    leadPreferences: {
      budget: number;
      location: string;
      propertyType: string;
      bedrooms?: number;
      bathrooms?: number;
    },
    availableProperties: Array<{
      id: string;
      title: string;
      price: number;
      location: string;
      bedrooms: number;
      bathrooms: number;
      features: string;
    }>
  ): Promise<
    Array<{
      propertyId: string;
      matchScore: number;
      reasoning: string;
    }>
  > {
    try {
      const prompt = 'Given these lead preferences and available properties, ' +
        'recommend the best matching properties with match scores (0-100). ' +
        'Respond in JSON with array of objects: propertyId, matchScore, reasoning.' +
        '\n\nLead Preferences: ' + JSON.stringify(leadPreferences) +
        '\n\nAvailable Properties: ' + JSON.stringify(availableProperties);

      const response = await this.generateText(prompt, 500);
      
      try {
        const parsed = JSON.parse(response);
        return Array.isArray(parsed) ? parsed : parsed.recommendations || [];
      } catch {
        return [];
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  /**
   * Generate personalized outreach message
   */
  async generateOutreachMessage(
    leadProfile: {
      firstName: string;
      lastName: string;
      intent: string;
      interests: string[];
      recentActivity?: string;
    },
    messageType: 'initial' | 'follow_up' | 'closing' = 'initial',
    property?: {
      title: string;
      price: number;
      features: string;
    }
  ): Promise<string> {
    try {
      let prompt = 'Generate a personalized, professional real estate outreach message.' +
        '\n\nLead Profile: ' + JSON.stringify(leadProfile) +
        '\nMessage Type: ' + messageType;

      if (property) {
        prompt += '\n\nProperty Details: ' + JSON.stringify(property);
      }

      prompt += '\n\nMake it friendly, concise, and action-oriented. No more than 150 words.';

      return await this.generateText(prompt, 250);
    } catch (error) {
      console.error('Error generating outreach message:', error);
      return '';
    }
  }

  /**
   * Analyze lead quality and scoring
   */
  async analyzeLeadQuality(leadData: {
    firstName: string;
    email?: string;
    phone?: string;
    source: string;
    budget?: number;
    interestedProperties: number;
    engagementScore?: number;
    conversationHistory?: string;
  }): Promise<{
    qualityScore: number; // 0-100
    level: 'hot' | 'warm' | 'cold';
    reasoning: string;
    recommendedActions: string[];
  }> {
    try {
      const prompt = 'Analyze this lead data and provide a quality score (0-100), ' +
        'level (hot/warm/cold), reasoning, and recommended actions. ' +
        'Respond in JSON format.' +
        '\n\nLead Data: ' + JSON.stringify(leadData);

      const response = await this.generateText(prompt, 400);
      
      try {
        const parsed = JSON.parse(response);
        return {
          qualityScore: parsed.qualityScore || 50,
          level: parsed.level || 'cold',
          reasoning: parsed.reasoning || 'Unable to determine',
          recommendedActions: parsed.recommendedActions || [],
        };
      } catch {
        return {
          qualityScore: 50,
          level: 'cold',
          reasoning: 'Error analyzing lead',
          recommendedActions: [],
        };
      }
    } catch (error) {
      console.error('Error analyzing lead quality:', error);
      return {
        qualityScore: 0,
        level: 'cold',
        reasoning: 'Error in analysis',
        recommendedActions: [],
      };
    }
  }

  /**
   * Generate email subject lines
   */
  async generateEmailSubjects(
    leadName: string,
    context: string,
    count: number = 3
  ): Promise<string[]> {
    try {
      const prompt = 'Generate ' + count + ' compelling email subject lines for a real estate agent. ' +
        'Context: ' + context +
        '\n\nRecipient: ' + leadName +
        '\n\nRespond with ONLY the subject lines, one per line, no numbering.';

      const response = await this.generateText(prompt, 200);
      return response.split('\n').filter(line => line.trim());
    } catch (error) {
      console.error('Error generating email subjects:', error);
      return [];
    }
  }

  /**
   * Market intelligence - summarize market trends
   */
  async summarizeMarketTrends(marketData: string): Promise<string> {
    try {
      const prompt = 'Analyze this real estate market data and provide key insights ' +
        'and trends in 2-3 paragraphs. Focus on actionable intelligence.' +
        '\n\nMarket Data: ' + marketData;

      return await this.generateText(prompt, 400);
    } catch (error) {
      console.error('Error summarizing market trends:', error);
      return '';
    }
  }
}
