import mongoose, { Schema, Document } from "mongoose";

// User Model
export interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  role: { type: String, default: "agent" },
  avatar: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);

// Agent Model
export interface IAgent extends Document {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  specialization?: string;
  licenseNumber?: string;
  bio?: string;
  isActive: boolean;
  totalDeals: number;
  totalRevenue: number;
  createdAt: Date;
}

const AgentSchema = new Schema<IAgent>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  userId: String,
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: String,
  specialization: String,
  licenseNumber: String,
  bio: String,
  isActive: { type: Boolean, default: true },
  totalDeals: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Agent = mongoose.model<IAgent>("Agent", AgentSchema);

// Property Model
export interface IProperty extends Document {
  id: string;
  userId: string;
  title: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  price: number;
  propertyType: string;
  status: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSize?: number;
  yearBuilt?: number;
  features: string[];
  images: string[];
  agentId?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  description: String,
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: String,
  price: { type: Number, required: true },
  propertyType: { type: String, default: "house" },
  status: { type: String, default: "available" },
  bedrooms: Number,
  bathrooms: Number,
  squareFeet: Number,
  lotSize: Number,
  yearBuilt: Number,
  features: [String],
  images: [String],
  agentId: String,
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Property = mongoose.model<IProperty>("Property", PropertySchema);

// Lead Model
export interface ILead extends Document {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  budget?: number;
  preferredLocation?: string;
  preferredType?: string;
  notes?: string;
  assignedAgentId?: string;
  interestedPropertyId?: string;
  lastContactedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  userId: { type: String, required: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  source: { type: String, default: "website" },
  status: { type: String, default: "new" },
  budget: Number,
  preferredLocation: String,
  preferredType: String,
  notes: String,
  assignedAgentId: String,
  interestedPropertyId: String,
  lastContactedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Lead = mongoose.model<ILead>("Lead", LeadSchema);

// Activity Model
export interface IActivity extends Document {
  id: string;
  userId: string;
  type: string;
  title: string;
  description?: string;
  agentId?: string;
  leadId?: string;
  propertyId?: string;
  scheduledAt?: Date;
  completedAt?: Date;
  isCompleted: boolean;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  userId: { type: String, required: true, index: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  agentId: String,
  leadId: String,
  propertyId: String,
  scheduledAt: Date,
  completedAt: Date,
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);

// Message Model
export interface IMessage extends Document {
  id: string;
  userId: string;
  leadId: string;
  agentId: string;
  content: string;
  direction: string;
  channel: string;
  status: string;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  userId: { type: String, required: true, index: true },
  leadId: { type: String, required: true },
  agentId: { type: String, required: true },
  content: { type: String, required: true },
  direction: { type: String, required: true },
  channel: { type: String, default: "whatsapp" },
  status: { type: String, default: "pending" },
  sentAt: Date,
  deliveredAt: Date,
  readAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model<IMessage>("Message", MessageSchema);

// Message Template Model
export interface IMessageTemplate extends Document {
  id: string;
  userId: string;
  name: string;
  content: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
}

const MessageTemplateSchema = new Schema<IMessageTemplate>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: "general" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const MessageTemplate = mongoose.model<IMessageTemplate>("MessageTemplate", MessageTemplateSchema);

// Lead Enrichment Model
export interface ILeadEnrichment extends Document {
  id: string;
  leadId: string;
  enrichedData?: Record<string, any>;
  dataQualityScore?: number;
  lastEnrichedAt?: Date;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadEnrichmentSchema = new Schema<ILeadEnrichment>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  leadId: { type: String, required: true },
  enrichedData: Schema.Types.Mixed,
  dataQualityScore: Number,
  lastEnrichedAt: Date,
  source: { type: String, default: "automated" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const LeadEnrichment = mongoose.model<ILeadEnrichment>("LeadEnrichment", LeadEnrichmentSchema);

// Lead Intent Segments Model
export interface ILeadIntentSegments extends Document {
  id: string;
  leadId: string;
  intent: string;
  confidence: number;
  category: string;
  extractedAt?: Date;
  conversationContext?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadIntentSegmentsSchema = new Schema<ILeadIntentSegments>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  leadId: { type: String, required: true },
  intent: { type: String, required: true },
  confidence: { type: Number, required: true },
  category: { type: String, required: true },
  extractedAt: Date,
  conversationContext: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const LeadIntentSegments = mongoose.model<ILeadIntentSegments>("LeadIntentSegments", LeadIntentSegmentsSchema);

// Lead Scoring Results Model
export interface ILeadScoringResults extends Document {
  id: string;
  leadId: string;
  qualityScore?: number;
  level: string;
  reasoning?: string;
  recommendedActions: string[];
  modelVersion?: string;
  confidence?: number;
  scoredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LeadScoringResultsSchema = new Schema<ILeadScoringResults>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  leadId: { type: String, required: true },
  qualityScore: Number,
  level: { type: String, required: true },
  reasoning: String,
  recommendedActions: [String],
  modelVersion: String,
  confidence: Number,
  scoredAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const LeadScoringResults = mongoose.model<ILeadScoringResults>("LeadScoringResults", LeadScoringResultsSchema);

// Chatbot Conversations Model
export interface IChatbotConversations extends Document {
  id: string;
  leadId?: string;
  agentId?: string;
  sessionId: string;
  messages?: Record<string, any>[];
  sentiment?: string;
  sentimentScore?: number;
  extractedIntents?: string[];
  extractedEntities?: Record<string, any>;
  conversationOutcome?: string;
  duration?: number;
  messageCount?: number;
  startedAt?: Date;
  endedAt?: Date;
  createdAt: Date;
}

const ChatbotConversationsSchema = new Schema<IChatbotConversations>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  leadId: String,
  agentId: String,
  sessionId: { type: String, required: true },
  messages: [Schema.Types.Mixed],
  sentiment: String,
  sentimentScore: Number,
  extractedIntents: [String],
  extractedEntities: Schema.Types.Mixed,
  conversationOutcome: String,
  duration: Number,
  messageCount: Number,
  startedAt: Date,
  endedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export const ChatbotConversations = mongoose.model<IChatbotConversations>("ChatbotConversations", ChatbotConversationsSchema);

// Property Embeddings Model
export interface IPropertyEmbeddings extends Document {
  id: string;
  propertyId: string;
  embedding?: number[];
  embeddingModel?: string;
  embeddingDimension?: number;
  features?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PropertyEmbeddingsSchema = new Schema<IPropertyEmbeddings>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  propertyId: { type: String, required: true },
  embedding: [Number],
  embeddingModel: String,
  embeddingDimension: Number,
  features: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PropertyEmbeddings = mongoose.model<IPropertyEmbeddings>("PropertyEmbeddings", PropertyEmbeddingsSchema);

// Generated Outreach Messages Model
export interface IGeneratedOutreachMessages extends Document {
  id: string;
  leadId: string;
  agentId?: string;
  propertyId?: string;
  messageType: string;
  channel: string;
  subject?: string;
  body: string;
  personalizedElements?: string[];
  generationPrompt?: string;
  modelVersion?: string;
  generatedAt?: Date;
  sentAt?: Date;
  opened?: boolean;
  clicked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GeneratedOutreachMessagesSchema = new Schema<IGeneratedOutreachMessages>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  leadId: { type: String, required: true },
  agentId: String,
  propertyId: String,
  messageType: { type: String, required: true },
  channel: { type: String, default: "email" },
  subject: String,
  body: { type: String, required: true },
  personalizedElements: [String],
  generationPrompt: String,
  modelVersion: String,
  generatedAt: Date,
  sentAt: Date,
  opened: Boolean,
  clicked: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const GeneratedOutreachMessages = mongoose.model<IGeneratedOutreachMessages>("GeneratedOutreachMessages", GeneratedOutreachMessagesSchema);
