import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  insertLeadSchema,
  insertPropertySchema,
  insertActivitySchema,
  insertMessageSchema,
  insertMessageTemplateSchema,
  insertAgentSchema,
} from "./types";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Authentication Routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      // Find user by email
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate token
      const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");
      
      res.json({ 
        token, 
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          phone: user.phone,
        }
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password, fullName, company, phone } = req.body;

      if (!email || !password || !fullName) {
        return res.status(400).json({ error: "Email, password, and name are required" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      // Create new user
      const newUser = await storage.createUser({
        username: email.split("@")[0],
        email,
        password, // In production, this should be hashed
        fullName,
        phone: phone || "",
        role: "agent",
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        isActive: true,
      });

      // Generate token
      const token = Buffer.from(`${newUser.id}:${Date.now()}`).toString("base64");

      res.status(201).json({ 
        token, 
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role,
          phone: newUser.phone,
        }
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ error: "Failed to signup" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    res.json({ message: "Logged out successfully" });
  });

  // Dashboard Stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const stats = await storage.getDashboardStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Leads CRUD
  app.get("/api/leads", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const leads = await storage.getLeads(userId);
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:id", async (req, res) => {
    try {
      const lead = await storage.getLead(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      
      // Verify ownership
      if (lead.userId !== (req as any).userId) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      
      res.json(lead);
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ error: "Failed to fetch lead" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead({ ...data, userId });
      
      // Create activity for new lead
      await storage.createActivity({
        userId,
        type: "note",
        title: "New lead captured",
        description: `Lead ${data.firstName} ${data.lastName} was added from ${data.source || "website"}`,
        leadId: lead.id,
      });
      
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating lead:", error);
      res.status(500).json({ error: "Failed to create lead" });
    }
  });

  app.patch("/api/leads/:id", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const lead = await storage.getLead(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      
      // Verify ownership
      if (lead.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      
      const data = insertLeadSchema.partial().parse(req.body);
      const updatedLead = await storage.updateLead(req.params.id, data);
      
      // Create activity for status change
      if (data.status) {
        await storage.createActivity({
          userId,
          type: "note",
          title: `Lead status updated to ${data.status}`,
          description: `Lead status was changed to ${data.status}`,
          leadId: updatedLead.id,
        });
      }
      
      res.json(updatedLead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error updating lead:", error);
      res.status(500).json({ error: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const lead = await storage.getLead(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "Lead not found" });
      }
      
      // Verify ownership
      if (lead.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      
      await storage.deleteLead(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting lead:", error);
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  // Properties CRUD
  app.get("/api/properties", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const properties = await storage.getProperties(userId);
      
      // Normalize property data
      const normalized = properties.map((prop: any) => ({
        ...prop,
        status: prop.status ? (prop.status.toLowerCase() === 'active' ? 'available' : prop.status.toLowerCase()) : 'available',
        propertyType: prop.propertyType ? prop.propertyType.toLowerCase() : 'house',
      }));
      
      res.json(normalized);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      
      // Verify ownership
      if (property.userId !== (req as any).userId) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      
      // Normalize property data
      const normalized = {
        ...property,
        status: property.status ? (property.status.toLowerCase() === 'active' ? 'available' : property.status.toLowerCase()) : 'available',
        propertyType: property.propertyType ? property.propertyType.toLowerCase() : 'house',
      };
      
      res.json(normalized);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  app.post("/api/properties", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const data = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty({ ...data, userId });
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating property:", error);
      res.status(500).json({ error: "Failed to create property" });
    }
  });

  app.patch("/api/properties/:id", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      
      // Verify ownership
      if (property.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      
      const data = insertPropertySchema.partial().parse(req.body);
      const updatedProperty = await storage.updateProperty(req.params.id, data);
      res.json(updatedProperty);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error updating property:", error);
      res.status(500).json({ error: "Failed to update property" });
    }
  });

  app.delete("/api/properties/:id", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      
      // Verify ownership
      if (property.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      
      await storage.deleteProperty(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ error: "Failed to delete property" });
    }
  });

  // Agents CRUD
  app.get("/api/agents", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const agents = await storage.getAgents(userId);
      res.json(agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
      res.status(500).json({ error: "Failed to fetch agents" });
    }
  });

  app.get("/api/agents/:id", async (req, res) => {
    try {
      const agent = await storage.getAgent(req.params.id);
      if (!agent) {
        return res.status(404).json({ error: "Agent not found" });
      }
      
      // Verify ownership
      if (agent.userId !== (req as any).userId) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      
      res.json(agent);
    } catch (error) {
      console.error("Error fetching agent:", error);
      res.status(500).json({ error: "Failed to fetch agent" });
    }
  });

  app.post("/api/agents", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const data = insertAgentSchema.parse(req.body);
      const agent = await storage.createAgent({ ...data, userId });
      res.status(201).json(agent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating agent:", error);
      res.status(500).json({ error: "Failed to create agent" });
    }
  });

  app.patch("/api/agents/:id", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const agent = await storage.getAgent(req.params.id);
      if (!agent) {
        return res.status(404).json({ error: "Agent not found" });
      }
      
      // Verify ownership
      if (agent.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
      
      const data = insertAgentSchema.partial().parse(req.body);
      const updatedAgent = await storage.updateAgent(req.params.id, data);
      res.json(updatedAgent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error updating agent:", error);
      res.status(500).json({ error: "Failed to update agent" });
    }
  });

  // Activities
  app.get("/api/activities", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const activitiesData = await storage.getActivities(userId, limit);
      
      // Fetch related data for each activity
      const enrichedActivities = await Promise.all(
        activitiesData.map(async (activity) => {
          const [agent, lead, property] = await Promise.all([
            activity.agentId ? storage.getAgent(activity.agentId) : null,
            activity.leadId ? storage.getLead(activity.leadId) : null,
            activity.propertyId ? storage.getProperty(activity.propertyId) : null,
          ]);
          return { ...activity, agent, lead, property };
        })
      );
      
      res.json(enrichedActivities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const data = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity({ ...data, userId });
      res.status(201).json(activity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating activity:", error);
      res.status(500).json({ error: "Failed to create activity" });
    }
  });

  app.patch("/api/activities/:id", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const activity = await storage.updateActivity(req.params.id, {});
      if (!activity || activity.userId !== userId) {
        return res.status(404).json({ error: "Activity not found" });
      }
      
      const data = insertActivitySchema.partial().parse(req.body);
      const updatedActivity = await storage.updateActivity(req.params.id, data);
      res.json(updatedActivity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error updating activity:", error);
      res.status(500).json({ error: "Failed to update activity" });
    }
  });

  // Messages
  app.get("/api/messages", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const leadId = req.query.leadId as string | undefined;
      const messagesData = await storage.getMessages(userId, leadId);
      res.json(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const data = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage({ ...data, userId });
      
      // Create activity for message sent
      if (data.direction === "outbound" && data.leadId) {
        await storage.createActivity({
          userId,
          type: "message",
          title: "WhatsApp message sent",
          description: data.content.substring(0, 100) + (data.content.length > 100 ? "..." : ""),
          leadId: data.leadId,
          agentId: data.agentId,
        });
        
        // Update lead last contacted
        await storage.updateLead(data.leadId, {
          lastContactedAt: new Date(),
        });
      }
      
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  // Message Templates
  app.get("/api/message-templates", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const templates = await storage.getMessageTemplates(userId);
      res.json(templates);
    } catch (error) {
      console.error("Error fetching message templates:", error);
      res.status(500).json({ error: "Failed to fetch message templates" });
    }
  });

  app.post("/api/message-templates", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const data = insertMessageTemplateSchema.parse(req.body);
      const template = await storage.createMessageTemplate({ ...data, userId });
      res.status(201).json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating message template:", error);
      res.status(500).json({ error: "Failed to create message template" });
    }
  });

  // Analytics
  app.get("/api/analytics", async (req, res) => {
    try {
      const userId = (req as any).userId;
      const stats = await storage.getDashboardStats(userId);
      const leads = await storage.getLeads(userId);
      const agents = await storage.getAgents(userId);

      // Calculate lead sources
      const leadsBySource = leads.reduce((acc, lead) => {
        const source = lead.source || "Unknown";
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Calculate lead statuses
      const leadsByStatus = leads.reduce((acc, lead) => {
        const status = lead.status || "new";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      res.json({
        ...stats,
        topAgents: agents.sort((a, b) => (b.totalDeals || 0) - (a.totalDeals || 0)).slice(0, 5),
        leadsBySource: Object.entries(leadsBySource).map(([source, count]) => ({ source, count })),
        leadsByStatus: Object.entries(leadsByStatus).map(([status, count]) => ({ status, count })),
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // AI Service Routes
  const { AIService } = await import("./ai/aiService");
  const { aiConfig } = await import("./ai/config");
  const aiService = new AIService(aiConfig);

  // Lead Scoring
  app.post("/api/ai/lead-scoring", async (req, res) => {
    try {
      const leadData = req.body;
      const qualityAssessment = await aiService.analyzeLeadQuality(leadData);
      res.json(qualityAssessment);
    } catch (error) {
      console.error("Error in lead scoring:", error);
      res.status(500).json({ error: "Failed to score lead" });
    }
  });

  // Lead Enrichment
  app.post("/api/ai/enrichment", async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body;
      const entities = await aiService.extractEntities(
        `${firstName} ${lastName} ${email}`
      );
      res.json({
        enrichedData: {
          ...entities,
          email,
          firstName,
          lastName,
        },
      });
    } catch (error) {
      console.error("Error in enrichment:", error);
      res.status(500).json({ error: "Failed to enrich lead" });
    }
  });

  // Property Recommendations
  app.post("/api/ai/recommendations", async (req, res) => {
    try {
      const { preferences, properties } = req.body;
      const recommendations = await aiService.generatePropertyRecommendations(
        preferences,
        properties
      );
      res.json({ recommendations });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  // Chatbot Message
  app.post("/api/ai/chatbot/message", async (req, res) => {
    try {
      const { messages, systemPrompt } = req.body;
      const response = await aiService.chatCompletion(messages, systemPrompt);
      res.json({ response });
    } catch (error) {
      console.error("Error in chatbot:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Intent Classification
  app.post("/api/ai/chatbot/intent", async (req, res) => {
    try {
      const { conversation } = req.body;
      const intent = await aiService.classifyLeadIntent(conversation);
      res.json(intent);
    } catch (error) {
      console.error("Error classifying intent:", error);
      res.status(500).json({ error: "Failed to classify intent" });
    }
  });

  // Outreach Message Generation
  app.post("/api/ai/outreach-message", async (req, res) => {
    try {
      const { leadProfile, messageType, property } = req.body;
      const message = await aiService.generateOutreachMessage(
        leadProfile,
        messageType,
        property
      );
      res.json({ message });
    } catch (error) {
      console.error("Error generating outreach message:", error);
      res.status(500).json({ error: "Failed to generate message" });
    }
  });

  // Email Subject Lines
  app.post("/api/ai/email-subjects", async (req, res) => {
    try {
      const { leadName, context, count } = req.body;
      const subjects = await aiService.generateEmailSubjects(
        leadName,
        context,
        count || 3
      );
      res.json({ subjects });
    } catch (error) {
      console.error("Error generating email subjects:", error);
      res.status(500).json({ error: "Failed to generate subjects" });
    }
  });

  // Sentiment Analysis
  app.post("/api/ai/sentiment", async (req, res) => {
    try {
      const { text } = req.body;
      const sentiment = await aiService.analyzeSentiment(text);
      res.json(sentiment);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      res.status(500).json({ error: "Failed to analyze sentiment" });
    }
  });

  // Market Trends
  app.post("/api/ai/market-trends", async (req, res) => {
    try {
      const { marketData } = req.body;
      const summary = await aiService.summarizeMarketTrends(marketData);
      res.json({ summary });
    } catch (error) {
      console.error("Error summarizing market trends:", error);
      res.status(500).json({ error: "Failed to summarize trends" });
    }
  });

  // Lead Hunter Routes
  const { LeadHunterService } = await import("./ai/leadHunter");
  const leadHunter = new LeadHunterService();

  app.post("/api/ai/hunt-leads", async (req, res) => {
    try {
      const leads = await leadHunter.huntLeads();
      res.json({
        success: true,
        leadCount: leads.length,
        leads: leads,
      });
    } catch (error) {
      console.error("Lead hunting error:", error);
      res.status(500).json({ error: "Failed to hunt leads" });
    }
  });

  app.get("/api/ai/hunt-leads/stats", async (req, res) => {
    try {
      const stats = leadHunter.getLeadStatistics();
      res.json(stats);
    } catch (error) {
      console.error("Lead stats error:", error);
      res.status(500).json({ error: "Failed to get lead statistics" });
    }
  });

  app.post("/api/ai/hunt-leads/export", async (req, res) => {
    try {
      const { format = "json", onlyQualified = true } = req.body;
      const exported = await leadHunter.exportLeads(format as "json" | "csv", onlyQualified);
      
      if (format === "csv") {
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
      } else {
        res.setHeader("Content-Type", "application/json");
      }
      res.send(exported);
    } catch (error) {
      console.error("Lead export error:", error);
      res.status(500).json({ error: "Failed to export leads" });
    }
  });

  // Lead Enrichment Routes
  const { LeadEnrichmentEngine } = await import("./ai/leadEnrichment");
  const enrichmentEngine = new LeadEnrichmentEngine();

  app.post("/api/ai/enrich-leads", async (req, res) => {
    try {
      const { leads } = req.body;
      if (!leads || !Array.isArray(leads)) {
        return res.status(400).json({ error: "leads array required" });
      }

      const enriched = await enrichmentEngine.enrichLeadsBatch(leads);
      res.json({
        success: true,
        enrichedCount: enriched.length,
        enrichedLeads: enriched,
      });
    } catch (error) {
      console.error("Lead enrichment error:", error);
      res.status(500).json({ error: "Failed to enrich leads" });
    }
  });

  app.post("/api/ai/enrich-lead", async (req, res) => {
    try {
      const { lead } = req.body;
      if (!lead) {
        return res.status(400).json({ error: "lead object required" });
      }

      const enriched = await enrichmentEngine.enrichLead(lead);
      res.json({
        success: true,
        enrichedLead: enriched,
      });
    } catch (error) {
      console.error("Single lead enrichment error:", error);
      res.status(500).json({ error: "Failed to enrich lead" });
    }
  });

  app.get("/api/ai/high-value-leads", async (req, res) => {
    try {
      const { minQualityScore = 0.7, minBudget = 300000 } = req.query;
      const highValueLeads = enrichmentEngine.identifyHighValueLeads(
        parseFloat(minQualityScore as string),
        parseFloat(minBudget as string)
      );

      res.json({
        success: true,
        highValueLeadCount: highValueLeads.length,
        highValueLeads: highValueLeads,
      });
    } catch (error) {
      console.error("High-value leads error:", error);
      res.status(500).json({ error: "Failed to get high-value leads" });
    }
  });

  app.get("/api/ai/enrichment-stats", async (req, res) => {
    try {
      const stats = enrichmentEngine.getStatistics();
      res.json(stats);
    } catch (error) {
      console.error("Enrichment stats error:", error);
      res.status(500).json({ error: "Failed to get enrichment statistics" });
    }
  });

  app.post("/api/ai/export-enriched-leads", async (req, res) => {
    try {
      const { format = "json" } = req.body;
      const exported = await enrichmentEngine.exportEnrichedLeads(format as "json" | "csv");

      if (format === "csv") {
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=enriched-leads.csv");
      } else {
        res.setHeader("Content-Type", "application/json");
      }
      res.send(exported);
    } catch (error) {
      console.error("Enriched lead export error:", error);
      res.status(500).json({ error: "Failed to export enriched leads" });
    }
  });

  return httpServer;
}
