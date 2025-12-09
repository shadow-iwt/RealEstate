// Client-side type definitions (no server dependencies)

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "viewing" | "offer" | "closed" | "lost";
  budget?: number;
  preferredLocation?: string;
  preferredType?: string;
  notes?: string;
  assignedAgentId?: string;
  propertyId?: string;
  lastContacted?: string;
  createdAt?: string;
  tags?: string[];
  score?: number;
  userId?: string;
};

export type InsertLead = Omit<Lead, "id" | "createdAt">;

export type Property = {
  id: string;
  title: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  price: number;
  propertyType: "house" | "apartment" | "condo" | "townhouse" | "land" | "commercial" | "estate" | "cabin" | "villa" | "loft" | "penthouse" | "single family home";
  status: "available" | "pending" | "sold" | "rented" | "active" | "inactive";
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSize?: number;
  yearBuilt?: number;
  features?: string[];
  images?: string[];
  agentId?: string;
  views?: number;
  ownerEmail?: string;
  ownerPhone?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
};

export type InsertProperty = Omit<Property, "id" | "createdAt" | "updatedAt">;

export type Agent = {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  specialization?: string;
  licenseNumber?: string;
  bio?: string;
  isActive?: boolean;
  totalDeals?: number;
  totalRevenue?: number;
  createdAt?: string;
};

export type InsertAgent = Omit<Agent, "id" | "createdAt">;

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  status?: "pending" | "sent" | "delivered" | "read" | "failed";
  attachments?: string[];
  createdAt?: string;
};

export type MessageTemplate = {
  id: string;
  title: string;
  content: string;
  category?: string;
  createdAt?: string;
};

export type Activity = {
  id: string;
  leadId?: string;
  agentId?: string;
  propertyId?: string;
  type: "call" | "message" | "email" | "viewing" | "note" | "task" | "text_message" | "in_person_tour";
  description?: string;
  result?: string;
  notes?: string;
  createdAt?: string;
  lead?: Lead;
  agent?: Agent;
  property?: Property;
};

export type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone?: string;
  role?: "agent" | "admin" | "user";
  avatar?: string;
  isActive?: boolean;
  createdAt?: string;
};
