import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, decimal, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leadStatusEnum = pgEnum("lead_status", ["new", "contacted", "qualified", "viewing", "offer", "closed", "lost"]);
export const propertyStatusEnum = pgEnum("property_status", ["available", "pending", "sold", "rented"]);
export const propertyTypeEnum = pgEnum("property_type", ["house", "apartment", "condo", "townhouse", "land", "commercial"]);
export const activityTypeEnum = pgEnum("activity_type", ["call", "message", "email", "viewing", "note", "task"]);
export const messageStatusEnum = pgEnum("message_status", ["pending", "sent", "delivered", "read", "failed"]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: text("role").default("agent"),
  avatar: text("avatar"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const agents = pgTable("agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  avatar: text("avatar"),
  specialization: text("specialization"),
  licenseNumber: text("license_number"),
  bio: text("bio"),
  isActive: boolean("is_active").default(true),
  totalDeals: integer("total_deals").default(0),
  totalRevenue: decimal("total_revenue", { precision: 12, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code"),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  propertyType: propertyTypeEnum("property_type").default("house"),
  status: propertyStatusEnum("status").default("available"),
  bedrooms: integer("bedrooms"),
  bathrooms: decimal("bathrooms", { precision: 3, scale: 1 }),
  squareFeet: integer("square_feet"),
  lotSize: decimal("lot_size", { precision: 10, scale: 2 }),
  yearBuilt: integer("year_built"),
  features: text("features").array(),
  images: text("images").array(),
  agentId: varchar("agent_id").references(() => agents.id),
  views: integer("views").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  source: text("source").default("website"),
  status: leadStatusEnum("status").default("new"),
  budget: decimal("budget", { precision: 12, scale: 2 }),
  preferredLocation: text("preferred_location"),
  preferredType: propertyTypeEnum("preferred_type"),
  notes: text("notes"),
  assignedAgentId: varchar("assigned_agent_id").references(() => agents.id),
  interestedPropertyId: varchar("interested_property_id").references(() => properties.id),
  lastContactedAt: timestamp("last_contacted_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: activityTypeEnum("type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  agentId: varchar("agent_id").references(() => agents.id),
  leadId: varchar("lead_id").references(() => leads.id),
  propertyId: varchar("property_id").references(() => properties.id),
  scheduledAt: timestamp("scheduled_at"),
  completedAt: timestamp("completed_at"),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id),
  agentId: varchar("agent_id").references(() => agents.id),
  content: text("content").notNull(),
  direction: text("direction").notNull(), // "inbound" or "outbound"
  channel: text("channel").default("whatsapp"),
  status: messageStatusEnum("status").default("pending"),
  sentAt: timestamp("sent_at"),
  deliveredAt: timestamp("delivered_at"),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messageTemplates = pgTable("message_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  content: text("content").notNull(),
  category: text("category").default("general"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  agent: one(agents, {
    fields: [users.id],
    references: [agents.userId],
  }),
}));

export const agentsRelations = relations(agents, ({ one, many }) => ({
  user: one(users, {
    fields: [agents.userId],
    references: [users.id],
  }),
  properties: many(properties),
  leads: many(leads),
  activities: many(activities),
  messages: many(messages),
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  agent: one(agents, {
    fields: [properties.agentId],
    references: [agents.id],
  }),
  leads: many(leads),
  activities: many(activities),
}));

export const leadsRelations = relations(leads, ({ one, many }) => ({
  assignedAgent: one(agents, {
    fields: [leads.assignedAgentId],
    references: [agents.id],
  }),
  interestedProperty: one(properties, {
    fields: [leads.interestedPropertyId],
    references: [properties.id],
  }),
  activities: many(activities),
  messages: many(messages),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  agent: one(agents, {
    fields: [activities.agentId],
    references: [agents.id],
  }),
  lead: one(leads, {
    fields: [activities.leadId],
    references: [leads.id],
  }),
  property: one(properties, {
    fields: [activities.propertyId],
    references: [properties.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  lead: one(leads, {
    fields: [messages.leadId],
    references: [leads.id],
  }),
  agent: one(agents, {
    fields: [messages.agentId],
    references: [agents.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertAgentSchema = createInsertSchema(agents).omit({ id: true, createdAt: true, totalDeals: true, totalRevenue: true });
export const insertPropertySchema = createInsertSchema(properties).omit({ id: true, createdAt: true, updatedAt: true, views: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true, updatedAt: true });
export const insertActivitySchema = createInsertSchema(activities).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export const insertMessageTemplateSchema = createInsertSchema(messageTemplates).omit({ id: true, createdAt: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Agent = typeof agents.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessageTemplate = z.infer<typeof insertMessageTemplateSchema>;
export type MessageTemplate = typeof messageTemplates.$inferSelect;
