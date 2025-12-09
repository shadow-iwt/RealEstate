// Type definitions for API/Storage layer
// These are the types used across the application, separate from Mongoose models

import { z } from "zod";

export interface User {
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

export type InsertUser = Omit<User, "id" | "createdAt">;

export interface Agent {
  id: string;
  userId: string;
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

export type InsertAgent = Omit<Agent, "id" | "createdAt">;

export interface Property {
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

export type InsertProperty = Omit<Property, "id" | "createdAt" | "updatedAt">;

export interface Lead {
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

export type InsertLead = Omit<Lead, "id" | "createdAt" | "updatedAt">;

export interface Activity {
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

export type InsertActivity = Omit<Activity, "id" | "createdAt">;

export interface Message {
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

export type InsertMessage = Omit<Message, "id" | "createdAt">;

export interface MessageTemplate {
  id: string;
  userId: string;
  name: string;
  content: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
}

export type InsertMessageTemplate = Omit<MessageTemplate, "id" | "createdAt">;

// Zod validation schemas for API endpoints
export const insertUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.string().default("agent"),
  avatar: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const insertAgentSchema = z.object({
  userId: z.string().optional(),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  avatar: z.string().optional(),
  specialization: z.string().optional(),
  licenseNumber: z.string().optional(),
  bio: z.string().optional(),
  isActive: z.boolean().default(true),
  totalDeals: z.number().default(0),
  totalRevenue: z.number().default(0),
});

export const insertPropertySchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().optional(),
  price: z.number().positive(),
  propertyType: z.string().default("house"),
  status: z.string().default("available"),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  squareFeet: z.number().optional(),
  lotSize: z.number().optional(),
  yearBuilt: z.number().optional(),
  features: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  agentId: z.string().optional(),
  views: z.number().default(0),
});

export const insertLeadSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  source: z.string().default("website"),
  status: z.string().default("new"),
  budget: z.number().optional(),
  preferredLocation: z.string().optional(),
  preferredType: z.string().optional(),
  notes: z.string().optional(),
  assignedAgentId: z.string().optional(),
  interestedPropertyId: z.string().optional(),
  lastContactedAt: z.date().optional(),
});

export const insertActivitySchema = z.object({
  type: z.string(),
  title: z.string().min(3),
  description: z.string().optional(),
  agentId: z.string().optional(),
  leadId: z.string().optional(),
  propertyId: z.string().optional(),
  scheduledAt: z.date().optional(),
  completedAt: z.date().optional(),
  isCompleted: z.boolean().default(false),
});

export const insertMessageSchema = z.object({
  leadId: z.string(),
  agentId: z.string(),
  content: z.string().min(1),
  direction: z.string(),
  channel: z.string().default("whatsapp"),
  status: z.string().default("pending"),
  sentAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  readAt: z.date().optional(),
});

export const insertMessageTemplateSchema = z.object({
  name: z.string().min(2),
  content: z.string().min(5),
  category: z.string().default("general"),
  isActive: z.boolean().default(true),
});
