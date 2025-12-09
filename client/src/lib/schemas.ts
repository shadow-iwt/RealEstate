import { z } from "zod";

// Lead schemas
export const insertLeadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().optional(),
  source: z.string().default("website"),
  status: z.enum(["new", "contacted", "qualified", "viewing", "offer", "closed", "lost"]).default("new"),
  budget: z.number().optional(),
  preferredLocation: z.string().optional(),
  preferredType: z.string().optional(),
  notes: z.string().optional(),
  assignedAgentId: z.string().optional(),
  propertyId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  score: z.number().optional(),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;

// Property schemas
export const insertPropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  propertyType: z.enum(["house", "apartment", "condo", "townhouse", "land", "commercial", "estate", "cabin", "villa", "loft", "penthouse", "single family home"]).default("house"),
  status: z.enum(["available", "pending", "sold", "rented", "active", "inactive"]).default("available"),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  squareFeet: z.number().optional(),
  lotSize: z.number().optional(),
  yearBuilt: z.number().optional(),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  agentId: z.string().optional(),
  ownerEmail: z.string().email().optional(),
  ownerPhone: z.string().optional(),
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;

// Agent schemas
export const insertAgentSchema = z.object({
  userId: z.string().optional(),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  avatar: z.string().optional(),
  specialization: z.string().optional(),
  licenseNumber: z.string().optional(),
  bio: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type InsertAgent = z.infer<typeof insertAgentSchema>;

// Message schemas
export const insertMessageSchema = z.object({
  conversationId: z.string().min(1, "Conversation ID is required"),
  senderId: z.string().min(1, "Sender ID is required"),
  recipientId: z.string().min(1, "Recipient ID is required"),
  content: z.string().min(1, "Message content is required"),
  status: z.enum(["pending", "sent", "delivered", "read", "failed"]).default("pending"),
  attachments: z.array(z.string()).optional(),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Activity schemas
export const insertActivitySchema = z.object({
  leadId: z.string().optional(),
  agentId: z.string().optional(),
  propertyId: z.string().optional(),
  type: z.enum(["call", "message", "email", "viewing", "note", "task", "text_message", "in_person_tour"]),
  description: z.string().optional(),
  result: z.string().optional(),
  notes: z.string().optional(),
});

export type InsertActivity = z.infer<typeof insertActivitySchema>;
