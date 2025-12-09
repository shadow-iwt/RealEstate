import { Router, Request, Response } from 'express';
import { AIService } from '../ai/aiService';
import { aiConfig } from '../ai/config';

const router = Router();
const aiService = new AIService(aiConfig);

// Endpoint: Score a lead's quality
router.post('/lead-scoring', async (req: Request, res: Response) => {
  try {
    const leadData = req.body;
    const qualityAssessment = await aiService.analyzeLeadQuality(leadData);
    res.json(qualityAssessment);
  } catch (error) {
    console.error('Error in lead scoring:', error);
    res.status(500).json({ error: 'Failed to score lead' });
  }
});

// Endpoint: Enrich lead data
router.post('/enrichment', async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName } = req.body;
    
    // Extract entities from conversation if provided
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
    console.error('Error in enrichment:', error);
    res.status(500).json({ error: 'Failed to enrich lead' });
  }
});

// Endpoint: Generate property recommendations
router.post('/recommendations', async (req: Request, res: Response) => {
  try {
    const { preferences, properties } = req.body;
    const recommendations = await aiService.generatePropertyRecommendations(
      preferences,
      properties
    );
    res.json({ recommendations });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Endpoint: Chat with AI chatbot
router.post('/chatbot/message', async (req: Request, res: Response) => {
  try {
    const { messages, systemPrompt } = req.body;
    const response = await aiService.chatCompletion(messages, systemPrompt);
    res.json({ response });
  } catch (error) {
    console.error('Error in chatbot:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Endpoint: Extract intent from conversation
router.post('/chatbot/intent', async (req: Request, res: Response) => {
  try {
    const { conversation } = req.body;
    const intent = await aiService.classifyLeadIntent(conversation);
    res.json(intent);
  } catch (error) {
    console.error('Error classifying intent:', error);
    res.status(500).json({ error: 'Failed to classify intent' });
  }
});

// Endpoint: Generate outreach message
router.post('/outreach-message', async (req: Request, res: Response) => {
  try {
    const { leadProfile, messageType, property } = req.body;
    const message = await aiService.generateOutreachMessage(
      leadProfile,
      messageType,
      property
    );
    res.json({ message });
  } catch (error) {
    console.error('Error generating outreach message:', error);
    res.status(500).json({ error: 'Failed to generate message' });
  }
});

// Endpoint: Generate email subject lines
router.post('/email-subjects', async (req: Request, res: Response) => {
  try {
    const { leadName, context, count } = req.body;
    const subjects = await aiService.generateEmailSubjects(
      leadName,
      context,
      count || 3
    );
    res.json({ subjects });
  } catch (error) {
    console.error('Error generating email subjects:', error);
    res.status(500).json({ error: 'Failed to generate subjects' });
  }
});

// Endpoint: Analyze sentiment
router.post('/sentiment', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const sentiment = await aiService.analyzeSentiment(text);
    res.json(sentiment);
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    res.status(500).json({ error: 'Failed to analyze sentiment' });
  }
});

// Endpoint: Summarize market trends
router.post('/market-trends', async (req: Request, res: Response) => {
  try {
    const { marketData } = req.body;
    const summary = await aiService.summarizeMarketTrends(marketData);
    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing market trends:', error);
    res.status(500).json({ error: 'Failed to summarize trends' });
  }
});

export default router;
