# HobbyConnect AI API Endpoints - Complete Reference

Base URL: `http://localhost:5000/api/ai`

---

## 1. Lead Scoring

**Endpoint**: `POST /api/ai/lead-scoring`

**Purpose**: Analyze and score lead quality

**Request**:
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "+1234567890",
  "source": "website",
  "budget": 500000,
  "interestedProperties": 3,
  "engagementScore": 85,
  "conversationHistory": "John said he's looking for a 3-bedroom home in the suburbs..."
}
```

**Response**:
```json
{
  "qualityScore": 85,
  "level": "hot",
  "reasoning": "High budget, multiple property views, active engagement",
  "recommendedActions": [
    "Schedule property viewing",
    "Send tailored property list",
    "Initiate follow-up call"
  ]
}
```

---

## 2. Lead Enrichment

**Endpoint**: `POST /api/ai/enrichment`

**Purpose**: Extract entities and enrich lead data

**Request**:
```json
{
  "firstName": "Sarah",
  "lastName": "Johnson",
  "email": "sarah.j@company.com"
}
```

**Response**:
```json
{
  "enrichedData": {
    "names": ["Sarah", "Johnson"],
    "locations": ["New York", "Brooklyn"],
    "organizations": ["Tech Corp Inc"],
    "properties": [],
    "email": "sarah.j@company.com",
    "firstName": "Sarah",
    "lastName": "Johnson"
  }
}
```

---

## 3. Property Recommendations

**Endpoint**: `POST /api/ai/recommendations`

**Purpose**: Generate personalized property recommendations

**Request**:
```json
{
  "preferences": {
    "budget": 450000,
    "location": "San Francisco Bay Area",
    "propertyType": "condo",
    "bedrooms": 3,
    "bathrooms": 2
  },
  "properties": [
    {
      "id": "prop1",
      "title": "Modern Downtown Condo",
      "price": 425000,
      "location": "San Francisco",
      "bedrooms": 3,
      "bathrooms": 2,
      "features": "Smart home, updated kitchen, rooftop deck"
    },
    {
      "id": "prop2",
      "title": "Victorian House",
      "price": 650000,
      "location": "San Francisco",
      "bedrooms": 4,
      "bathrooms": 3,
      "features": "Charm, original hardwood, garden"
    }
  ]
}
```

**Response**:
```json
{
  "recommendations": [
    {
      "propertyId": "prop1",
      "matchScore": 92,
      "reasoning": "Matches budget, location, type, and bedroom count perfectly"
    },
    {
      "propertyId": "prop2",
      "matchScore": 45,
      "reasoning": "Over budget and too many bedrooms, but excellent neighborhood"
    }
  ]
}
```

---

## 4. Chatbot Message

**Endpoint**: `POST /api/ai/chatbot/message`

**Purpose**: Get AI response in conversation

**Request**:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "I'm looking for a 3-bedroom home in the suburbs with a good school district"
    }
  ],
  "systemPrompt": "Optional custom system prompt"
}
```

**Response**:
```json
{
  "response": "Great! I'd love to help you find the perfect home. Based on your preferences for a 3-bedroom in the suburbs with good schools, I have several excellent properties to show you. What's your budget range, and which suburbs are you most interested in?"
}
```

---

## 5. Intent Classification

**Endpoint**: `POST /api/ai/chatbot/intent`

**Purpose**: Classify lead intent from conversation

**Request**:
```json
{
  "conversation": "I'm thinking about selling my current home and buying something bigger. We've outgrown our place and need at least 4 bedrooms."
}
```

**Response**:
```json
{
  "intent": "Looking to sell current and buy larger home",
  "confidence": 0.95,
  "category": "seller"
}
```

---

## 6. Outreach Message Generation

**Endpoint**: `POST /api/ai/outreach-message`

**Purpose**: Generate personalized outreach messages

**Request**:
```json
{
  "leadProfile": {
    "firstName": "Michael",
    "lastName": "Chen",
    "intent": "buyer",
    "interests": ["modern homes", "smart technology", "walkable neighborhoods"],
    "recentActivity": "Viewed 5 tech-forward properties in last week"
  },
  "messageType": "initial",
  "property": {
    "title": "Smart Modern Home in Tech Hub",
    "price": 850000,
    "features": "AI-integrated, solar panels, smart appliances, near transit"
  }
}
```

**Response**:
```json
{
  "message": "Hi Michael! I noticed you've been interested in tech-forward homes, and I think we have the perfect match for you. Our Smart Modern Home in Tech Hub features AI integration, solar panels, and smart appliances—everything a tech enthusiast looks for. Would you like to schedule a viewing this weekend?"
}
```

---

## 7. Email Subject Lines

**Endpoint**: `POST /api/ai/email-subjects`

**Purpose**: Generate compelling email subject lines

**Request**:
```json
{
  "leadName": "Jennifer Walsh",
  "context": "Following up on viewing of luxury condo, 3 days after showing",
  "count": 3
}
```

**Response**:
```json
{
  "subjects": [
    "Jennifer - The condo you loved is still available (48 hrs)",
    "Your dream condo is waiting - let's move forward",
    "Quick question about the luxury condo you viewed"
  ]
}
```

---

## 8. Sentiment Analysis

**Endpoint**: `POST /api/ai/sentiment`

**Purpose**: Analyze sentiment of text

**Request**:
```json
{
  "text": "I absolutely loved the property! The views are stunning and the location is perfect for our family."
}
```

**Response**:
```json
{
  "sentiment": "positive",
  "score": 1
}
```

---

## 9. Market Trends

**Endpoint**: `POST /api/ai/market-trends`

**Purpose**: Summarize and analyze market data

**Request**:
```json
{
  "marketData": "San Francisco median home price: $1.2M (↑5% YoY). Days on market: 15 (↓20%). Inventory: 2 months (↓15%). Interest rates: 6.8%. Buyer demand: strong in neighborhoods near tech hubs."
}
```

**Response**:
```json
{
  "summary": "San Francisco's real estate market shows strong buyer momentum with prices up 5% year-over-year. The low inventory (2 months supply) and reduced days-on-market (15 days) indicate competitive conditions favoring sellers. Properties in tech hub adjacent areas are moving fastest. Agents should emphasize lifestyle benefits and location proximity to employment centers. For buyers, acting quickly is crucial in this competitive market."
}
```

---

## Error Handling

All endpoints return error responses in this format:

```json
{
  "error": "Description of what went wrong"
}
```

Common errors:
- `400`: Invalid request format
- `401`: Missing OpenAI API key
- `500`: Server error (check logs)

**Example Error**:
```json
{
  "error": "Failed to analyze sentiment"
}
```

---

## Testing with cURL

### Test Sentiment Analysis
```bash
curl -X POST http://localhost:5000/api/ai/sentiment \
  -H "Content-Type: application/json" \
  -d '{"text":"This is an amazing property!"}'
```

### Test Lead Scoring
```bash
curl -X POST http://localhost:5000/api/ai/lead-scoring \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "phone":"+1234567890",
    "source":"website",
    "budget":500000,
    "interestedProperties":3,
    "engagementScore":80
  }'
```

### Test Chatbot
```bash
curl -X POST http://localhost:5000/api/ai/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{
    "messages":[
      {"role":"user","content":"Im looking for a 3 bedroom home"}
    ]
  }'
```

---

## Testing with Postman

1. Import endpoints as collection
2. Set environment variable: `base_url = http://localhost:5000`
3. Use request templates provided above
4. Examine responses in "Pretty" view

---

## Integration Example (JavaScript/TypeScript)

```typescript
// Example: Call lead scoring endpoint
async function scoreLead(leadData) {
  const response = await fetch('http://localhost:5000/api/ai/lead-scoring', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });
  
  if (!response.ok) throw new Error('Scoring failed');
  return response.json();
}

// Usage
const leadScore = await scoreLead({
  firstName: "John",
  lastName: "Smith",
  email: "john@example.com",
  phone: "+1234567890",
  source: "website",
  budget: 500000,
  interestedProperties: 3
});

console.log(`Lead quality: ${leadScore.level}`);
```

---

## Rate Limiting

Currently no rate limiting is implemented. Add rate limiting middleware for production:

```typescript
import rateLimit from 'express-rate-limit';

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/ai/', aiLimiter);
```

---

## Performance Notes

- **Embeddings**: ~500ms (depends on text length)
- **Chat completions**: ~1-2s (depends on prompt)
- **Intent classification**: ~800ms
- **Sentiment analysis**: ~300ms

For production, consider:
- Response caching (Redis)
- Batch processing
- Async job queues (Bull, RabbitMQ)

---

## Next Phase: Database Persistence

Once PostgreSQL is configured, endpoints will automatically save results to:
- `lead_scoring_results` - Score history
- `chatbot_conversations` - Chat logs
- `lead_enrichment` - Enrichment data
- `generated_outreach_messages` - Message tracking

---

## Support

For issues or questions:
1. Check OpenAI API status: https://status.openai.com/
2. Review error logs in terminal
3. Verify .env variables are set correctly
4. Ensure PostgreSQL credentials are valid
