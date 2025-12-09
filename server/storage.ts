import {
  User as UserType,
  Agent as AgentType,
  Property as PropertyType,
  Lead as LeadType,
  Activity as ActivityType,
  Message as MessageType,
  MessageTemplate as MessageTemplateType,
  InsertUser,
  InsertAgent,
  InsertProperty,
  InsertLead,
  InsertActivity,
  InsertMessage,
  InsertMessageTemplate,
} from "./types";
import {
  User,
  Agent,
  Property,
  Lead,
  Activity,
  Message,
  MessageTemplate,
} from "./models/mongoose-models";

export interface IStorage {
  // Users
  getUser(id: string): Promise<any>;
  getUserByUsername(username: string): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  createUser(user: InsertUser): Promise<any>;

  // Agents
  getAgents(): Promise<any[]>;
  getAgents(userId: string): Promise<any[]>;
  getAgent(id: string): Promise<any>;
  createAgent(agent: InsertAgent): Promise<any>;
  updateAgent(id: string, agent: Partial<InsertAgent>): Promise<any>;

  // Properties
  getProperties(): Promise<any[]>;
  getProperties(userId: string): Promise<any[]>;
  getProperty(id: string): Promise<any>;
  createProperty(property: InsertProperty): Promise<any>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<any>;
  deleteProperty(id: string): Promise<boolean>;

  // Leads
  getLeads(): Promise<any[]>;
  getLeads(userId: string): Promise<any[]>;
  getLead(id: string): Promise<any>;
  createLead(lead: InsertLead): Promise<any>;
  updateLead(id: string, lead: Partial<InsertLead>): Promise<any>;
  deleteLead(id: string): Promise<boolean>;

  // Activities
  getActivities(limit?: number): Promise<any[]>;
  getActivities(userId: string, limit?: number): Promise<any[]>;
  getActivitiesByAgent(agentId: string): Promise<any[]>;
  getActivitiesByLead(leadId: string): Promise<any[]>;
  createActivity(activity: InsertActivity): Promise<any>;
  updateActivity(id: string, activity: Partial<InsertActivity>): Promise<any>;

  // Messages
  getMessages(leadId?: string): Promise<any[]>;
  getMessages(userId: string, leadId?: string): Promise<any[]>;
  getMessagesByLead(leadId: string): Promise<any[]>;
  createMessage(message: InsertMessage): Promise<any>;
  updateMessage(id: string, message: Partial<InsertMessage>): Promise<any>;

  // Message Templates
  getMessageTemplates(): Promise<any[]>;
  getMessageTemplates(userId: string): Promise<any[]>;
  createMessageTemplate(template: InsertMessageTemplate): Promise<any>;
  updateMessageTemplate(id: string, template: Partial<InsertMessageTemplate>): Promise<any>;

  // Dashboard Stats
  getDashboardStats(): Promise<any>;
  getDashboardStats(userId: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<any> {
    return await User.findOne({ id }).lean();
  }

  async getUserByUsername(username: string): Promise<any> {
    return await User.findOne({ username }).lean();
  }

  async getUserByEmail(email: string): Promise<any> {
    return await User.findOne({ email }).lean();
  }

  async createUser(insertUser: InsertUser): Promise<any> {
    const user = new User(insertUser);
    return await user.save();
  }

  // Agents
  async getAgents(userId?: string): Promise<any[]> {
    if (userId) {
      return await Agent.find({ userId }).sort({ createdAt: -1 }).lean();
    }
    return await Agent.find().sort({ createdAt: -1 }).lean();
  }

  async getAgent(id: string): Promise<any> {
    return await Agent.findOne({ id }).lean();
  }

  async createAgent(agent: InsertAgent): Promise<any> {
    const newAgent = new Agent(agent);
    return await newAgent.save();
  }

  async updateAgent(id: string, agent: Partial<InsertAgent>): Promise<any> {
    return await Agent.findOneAndUpdate({ id }, agent, { new: true }).lean();
  }

  // Properties
  async getProperties(userId?: string): Promise<any[]> {
    if (userId) {
      return await Property.find({ userId }).sort({ createdAt: -1 }).lean();
    }
    return await Property.find().sort({ createdAt: -1 }).lean();
  }

  async getProperty(id: string): Promise<any> {
    return await Property.findOne({ id }).lean();
  }

  async createProperty(property: InsertProperty): Promise<any> {
    const newProperty = new Property(property);
    return await newProperty.save();
  }

  async updateProperty(id: string, property: Partial<InsertProperty>): Promise<any> {
    return await Property.findOneAndUpdate(
      { id },
      { ...property, updatedAt: new Date() },
      { new: true }
    ).lean();
  }

  async deleteProperty(id: string): Promise<boolean> {
    const result = await Property.deleteOne({ id });
    return result.deletedCount > 0;
  }

  // Leads
  async getLeads(userId?: string): Promise<any[]> {
    if (userId) {
      return await Lead.find({ userId }).sort({ createdAt: -1 }).lean();
    }
    return await Lead.find().sort({ createdAt: -1 }).lean();
  }

  async getLead(id: string): Promise<any> {
    return await Lead.findOne({ id }).lean();
  }

  async createLead(lead: InsertLead): Promise<any> {
    const newLead = new Lead(lead);
    return await newLead.save();
  }

  async updateLead(id: string, lead: Partial<InsertLead>): Promise<any> {
    return await Lead.findOneAndUpdate(
      { id },
      { ...lead, updatedAt: new Date() },
      { new: true }
    ).lean();
  }

  async deleteLead(id: string): Promise<boolean> {
    const result = await Lead.deleteOne({ id });
    return result.deletedCount > 0;
  }

  // Activities
  async getActivities(userIdOrLimit?: string | number, limit?: number): Promise<any[]> {
    const query = Activity.find();
    
    if (typeof userIdOrLimit === "string") {
      query.where({ userId: userIdOrLimit });
      if (limit) query.limit(limit);
    } else if (typeof userIdOrLimit === "number") {
      query.limit(userIdOrLimit);
    }
    
    return await query.sort({ createdAt: -1 }).lean();
  }

  async getActivitiesByAgent(agentId: string): Promise<any[]> {
    return await Activity.find({ agentId }).sort({ createdAt: -1 }).lean();
  }

  async getActivitiesByLead(leadId: string): Promise<any[]> {
    return await Activity.find({ leadId }).sort({ createdAt: -1 }).lean();
  }

  async createActivity(activity: InsertActivity): Promise<any> {
    const newActivity = new Activity(activity);
    return await newActivity.save();
  }

  async updateActivity(id: string, activity: Partial<InsertActivity>): Promise<any> {
    return await Activity.findOneAndUpdate({ id }, activity, { new: true }).lean();
  }

  // Messages
  async getMessages(userIdOrLeadId?: string, leadId?: string): Promise<any[]> {
    if (leadId) {
      // Called with (userId, leadId)
      return await Message.find({ userId: userIdOrLeadId, leadId }).sort({ createdAt: 1 }).lean();
    } else if (userIdOrLeadId) {
      // Could be userId or leadId - check if it looks like a leadId lookup
      return await Message.find({ leadId: userIdOrLeadId }).sort({ createdAt: 1 }).lean();
    }
    return await Message.find().sort({ createdAt: -1 }).lean();
  }

  async getMessagesByLead(leadId: string): Promise<any[]> {
    return await Message.find({ leadId }).sort({ createdAt: 1 }).lean();
  }

  async createMessage(message: InsertMessage): Promise<any> {
    const newMessage = new Message({
      ...message,
      sentAt: message.direction === "outbound" ? new Date() : undefined,
      status: message.direction === "outbound" ? "sent" : "delivered",
    });
    return await newMessage.save();
  }

  async updateMessage(id: string, message: Partial<InsertMessage>): Promise<any> {
    return await Message.findOneAndUpdate({ id }, message, { new: true }).lean();
  }

  // Message Templates
  async getMessageTemplates(userId?: string): Promise<any[]> {
    if (userId) {
      return await MessageTemplate.find({ userId, isActive: true }).lean();
    }
    return await MessageTemplate.find({ isActive: true }).lean();
  }

  async createMessageTemplate(template: InsertMessageTemplate): Promise<any> {
    const newTemplate = new MessageTemplate(template);
    return await newTemplate.save();
  }

  async updateMessageTemplate(id: string, template: Partial<InsertMessageTemplate>): Promise<any> {
    return await MessageTemplate.findOneAndUpdate({ id }, template, { new: true }).lean();
  }

  // Dashboard Stats
  async getDashboardStats(userId?: string) {
    let allLeads = await Lead.find().lean();
    let allProperties = await Property.find().lean();
    let allAgents = await Agent.find().lean();

    // Filter by userId if provided
    if (userId) {
      allLeads = allLeads.filter((lead) => lead.userId === userId);
      allProperties = allProperties.filter((property) => property.userId === userId);
      allAgents = allAgents.filter((agent) => agent.userId === userId);
    }

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
