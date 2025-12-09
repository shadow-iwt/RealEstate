/**
 * AI Service Configuration
 * Central configuration for all AI/ML services, API keys, and model settings
 */

export const aiConfig = {
  // OpenAI Configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    models: {
      gpt4: 'gpt-4-turbo-preview',
      gpt35: 'gpt-3.5-turbo',
      embedding: 'text-embedding-3-large',
    },
    temperature: 0.7,
    maxTokens: 2000,
  },

  // Lead Enrichment APIs
  leadEnrichment: {
    clearbit: {
      apiKey: process.env.CLEARBIT_API_KEY || '',
      baseUrl: 'https://api.clearbit.com/v1',
    },
    peopleDataLabs: {
      apiKey: process.env.PEOPLE_DATA_LABS_API_KEY || '',
      baseUrl: 'https://api.peopledatalabs.com',
    },
  },

  // Web Scraping & Data Sources
  dataSources: {
    zillow: {
      baseUrl: 'https://www.zillow.com',
      rateLimitDelay: 2000, // ms between requests
    },
    mls: {
      baseUrl: process.env.MLS_API_URL || '',
      apiKey: process.env.MLS_API_KEY || '',
    },
  },

  // Vector Database (Pinecone or Weaviate)
  vectorDb: {
    provider: process.env.VECTOR_DB_PROVIDER || 'pinecone', // 'pinecone' or 'weaviate'
    pinecone: {
      apiKey: process.env.PINECONE_API_KEY || '',
      environment: process.env.PINECONE_ENV || 'us-west1-gcp',
      index: 'hobbyconnect-properties',
      namespace: 'default',
    },
    weaviate: {
      url: process.env.WEAVIATE_URL || 'http://localhost:8080',
    },
  },

  // ML Model Configuration
  mlModels: {
    leadScoring: {
      modelPath: './models/lead_scorer_xgboost.pkl',
      algorithm: 'xgboost', // 'xgboost', 'lightgbm', 'neural'
      features: 30,
      threshold: 0.5, // confidence threshold for high-quality leads
    },
    propertyRecommendation: {
      algorithm: 'hybrid', // 'collaborative', 'content_based', 'hybrid'
      embeddingDimension: 768,
      topK: 5,
    },
    intentClassification: {
      modelPath: './models/intent_classifier_bert.pkl',
      algorithm: 'bert', // fine-tuned BERT
      intents: [
        'first_time_buyer',
        'investor',
        'downsizer',
        'relocating',
        'upgrade',
        'second_home',
        'luxury',
      ],
    },
  },

  // Chatbot Configuration
  chatbot: {
    model: 'gpt-4-turbo-preview',
    temperature: 0.6,
    systemPrompt: `You are an expert real estate assistant helping leads find their perfect property.
Your role is to:
1. Qualify leads by understanding their needs, budget, and timeline
2. Recommend properties based on their preferences
3. Book property viewings
4. Answer questions about the real estate market and properties
5. Provide a warm, professional, and helpful tone

Always collect: budget, property type, location, timeline to buy/sell.
Recommend properties when you have enough information.
Schedule viewings in a natural way, confirming details.`,
    maxConversationTokens: 4000,
  },

  // Lead Hunter Configuration
  leadHunter: {
    sources: ['facebook_leads', 'zillow', 'mls', 'classifieds', 'social_media'],
    checkInterval: 15 * 60 * 1000, // 15 minutes
    qualityThreshold: 0.6,
    deduplicationEnabled: true,
  },

  // Email & SMS Configuration
  communications: {
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID || '',
      authToken: process.env.TWILIO_AUTH_TOKEN || '',
      phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    },
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY || '',
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@hobbyconnect.com',
    },
  },

  // Facebook Lead Ads
  facebookLeadAds: {
    appId: process.env.FACEBOOK_APP_ID || '',
    appSecret: process.env.FACEBOOK_APP_SECRET || '',
    accessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN || '',
    pageId: process.env.FACEBOOK_PAGE_ID || '',
  },

  // Google Ads
  googleAds: {
    customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || '',
    developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
    clientId: process.env.GOOGLE_ADS_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
  },

  // Market Data APIs
  marketData: {
    zillowApiKey: process.env.ZILLOW_API_KEY || '',
    realAssureApiKey: process.env.REAL_ASSURE_API_KEY || '',
    coreLogicApiKey: process.env.CORE_LOGIC_API_KEY || '',
  },

  // Feature Flags
  features: {
    enableLeadHunter: process.env.ENABLE_LEAD_HUNTER === 'true' || true,
    enableLeadEnrichment: process.env.ENABLE_LEAD_ENRICHMENT === 'true' || true,
    enablePredictiveScoring: process.env.ENABLE_PREDICTIVE_SCORING === 'true' || true,
    enableChatbot: process.env.ENABLE_CHATBOT === 'true' || true,
    enablePropertyRecommendation: process.env.ENABLE_PROPERTY_RECOMMENDATION === 'true' || true,
    enableFaceAds: process.env.ENABLE_FACEBOOK_ADS === 'true' || false,
    enableGoogleAds: process.env.ENABLE_GOOGLE_ADS === 'true' || false,
  },
};

export type AIConfig = typeof aiConfig;
