import {
  users, agents, properties, leads, activities, messages, messageTemplates,
  type User, type InsertUser,
  type Agent, type InsertAgent,
  type Property, type InsertProperty,
  type Lead, type InsertLead,
  type Activity, type InsertActivity,
  type Message, type InsertMessage,
  type MessageTemplate, type InsertMessageTemplate,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, ilike, or } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Agents
  getAgents(): Promise<Agent[]>;
  getAgent(id: string): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: string, agent: Partial<InsertAgent>): Promise<Agent | undefined>;

  // Properties
  getProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: string): Promise<boolean>;

  // Leads
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: string): Promise<boolean>;

  // Activities
  getActivities(limit?: number): Promise<Activity[]>;
  getActivitiesByAgent(agentId: string): Promise<Activity[]>;
  getActivitiesByLead(leadId: string): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: string, activity: Partial<InsertActivity>): Promise<Activity | undefined>;

  // Messages
  getMessages(leadId?: string): Promise<Message[]>;
  getMessagesByLead(leadId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  updateMessage(id: string, message: Partial<InsertMessage>): Promise<Message | undefined>;

  // Message Templates
  getMessageTemplates(): Promise<MessageTemplate[]>;
  createMessageTemplate(template: InsertMessageTemplate): Promise<MessageTemplate>;
  updateMessageTemplate(id: string, template: Partial<InsertMessageTemplate>): Promise<MessageTemplate | undefined>;

  // Dashboard Stats
  getDashboardStats(): Promise<{
    totalLeads: number;
    newLeadsThisWeek: number;
    totalProperties: number;
    activeListings: number;
    totalRevenue: number;
    revenueChange: number;
    conversionRate: number;
    conversionChange: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Agents
  async getAgents(): Promise<Agent[]> {
    return db.select().from(agents).orderBy(desc(agents.createdAt));
  }

  async getAgent(id: string): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent || undefined;
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const [newAgent] = await db.insert(agents).values(agent).returning();
    return newAgent;
  }

  async updateAgent(id: string, agent: Partial<InsertAgent>): Promise<Agent | undefined> {
    const [updated] = await db.update(agents).set(agent).where(eq(agents.id, id)).returning();
    return updated || undefined;
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    return db.select().from(properties).orderBy(desc(properties.createdAt));
  }

  async getProperty(id: string): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db.insert(properties).values(property).returning();
    return newProperty;
  }

  async updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const [updated] = await db
      .update(properties)
      .set({ ...property, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteProperty(id: string): Promise<boolean> {
    const result = await db.delete(properties).where(eq(properties.id, id));
    return true;
  }

  // Leads
  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async updateLead(id: string, lead: Partial<InsertLead>): Promise<Lead | undefined> {
    const [updated] = await db
      .update(leads)
      .set({ ...lead, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteLead(id: string): Promise<boolean> {
    await db.delete(leads).where(eq(leads.id, id));
    return true;
  }

  // Activities
  async getActivities(limit?: number): Promise<Activity[]> {
    const query = db.select().from(activities).orderBy(desc(activities.createdAt));
    if (limit) {
      return query.limit(limit);
    }
    return query;
  }

  async getActivitiesByAgent(agentId: string): Promise<Activity[]> {
    return db.select().from(activities).where(eq(activities.agentId, agentId)).orderBy(desc(activities.createdAt));
  }

  async getActivitiesByLead(leadId: string): Promise<Activity[]> {
    return db.select().from(activities).where(eq(activities.leadId, leadId)).orderBy(desc(activities.createdAt));
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const [newActivity] = await db.insert(activities).values(activity).returning();
    return newActivity;
  }

  async updateActivity(id: string, activity: Partial<InsertActivity>): Promise<Activity | undefined> {
    const [updated] = await db.update(activities).set(activity).where(eq(activities.id, id)).returning();
    return updated || undefined;
  }

  // Messages
  async getMessages(leadId?: string): Promise<Message[]> {
    if (leadId) {
      return db.select().from(messages).where(eq(messages.leadId, leadId)).orderBy(messages.createdAt);
    }
    return db.select().from(messages).orderBy(desc(messages.createdAt));
  }

  async getMessagesByLead(leadId: string): Promise<Message[]> {
    return db.select().from(messages).where(eq(messages.leadId, leadId)).orderBy(messages.createdAt);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values({
      ...message,
      sentAt: message.direction === "outbound" ? new Date() : undefined,
      status: message.direction === "outbound" ? "sent" : "delivered",
    }).returning();
    return newMessage;
  }

  async updateMessage(id: string, message: Partial<InsertMessage>): Promise<Message | undefined> {
    const [updated] = await db.update(messages).set(message).where(eq(messages.id, id)).returning();
    return updated || undefined;
  }

  // Message Templates
  async getMessageTemplates(): Promise<MessageTemplate[]> {
    return db.select().from(messageTemplates).where(eq(messageTemplates.isActive, true));
  }

  async createMessageTemplate(template: InsertMessageTemplate): Promise<MessageTemplate> {
    const [newTemplate] = await db.insert(messageTemplates).values(template).returning();
    return newTemplate;
  }

  async updateMessageTemplate(id: string, template: Partial<InsertMessageTemplate>): Promise<MessageTemplate | undefined> {
    const [updated] = await db.update(messageTemplates).set(template).where(eq(messageTemplates.id, id)).returning();
    return updated || undefined;
  }

  // Dashboard Stats
  async getDashboardStats() {
    const allLeads = await db.select().from(leads);
    const allProperties = await db.select().from(properties);
    const allAgents = await db.select().from(agents);

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const newLeadsThisWeek = allLeads.filter(
      (lead) => lead.createdAt && new Date(lead.createdAt) >= oneWeekAgo
    ).length;

    const activeListings = allProperties.filter(
      (property) => property.status === "available"
    ).length;

    const closedLeads = allLeads.filter((lead) => lead.status === "closed").length;
    const conversionRate = allLeads.length > 0 ? (closedLeads / allLeads.length) * 100 : 0;

    const totalRevenue = allAgents.reduce(
      (sum, agent) => sum + Number(agent.totalRevenue || 0),
      0
    );

    return {
      totalLeads: allLeads.length,
      newLeadsThisWeek,
      totalProperties: allProperties.length,
      activeListings,
      totalRevenue,
      revenueChange: 15.4,
      conversionRate: Math.round(conversionRate * 10) / 10,
      conversionChange: 2.3,
    };
  }
}

export const storage = new DatabaseStorage();
