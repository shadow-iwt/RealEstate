# Phase 2 AI API Endpoints - Lead Hunter & Enrichment

## Overview
Phase 2 introduces Lead Hunter and Lead Enrichment services with comprehensive REST APIs for automated lead generation, qualification, and data enrichment.

---

## Lead Hunter Service

### 1. Start Lead Hunting
**POST** `/api/ai/hunt-leads`

Triggers the complete lead hunting pipeline: scrapes multiple sources, deduplicates, and qualifies leads.

**Request Body:**
```json
{}
```

**Response:**
```json
{
  "success": true,
  "leadCount": 12,
  "leads": [
    {
      "id": "lead_abc123",
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "+1234567890",
      "propertyAddress": "123 Main St, LA, CA",
      "source": "zillow",
      "intent": "homebuyer",
      "qualityScore": 0.92,
      "rawScore": 9.2,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Status Codes:**
- `200`: Success
- `500`: Lead hunting failed

---

### 2. Get Lead Hunting Statistics
**GET** `/api/ai/hunt-leads/stats`

Retrieves statistics about lead hunting operations.

**Query Parameters:**
- `period`: (optional) "day", "week", "month" - Default: all-time

**Response:**
```json
{
  "totalLeads": 156,
  "totalQualifiedLeads": 89,
  "qualificationRate": 0.57,
  "sourceBreakdown": {
    "zillow": 45,
    "mls": 32,
    "facebook": 28,
    "classifieds": 36,
    "social": 15
  },
  "intentBreakdown": {
    "homebuyer": 55,
    "investor": 20,
    "seller": 14
  },
  "averageQualityScore": 0.78,
  "lastHuntDate": "2024-01-15T10:30:00Z"
}
```

---

### 3. Export Leads
**POST** `/api/ai/hunt-leads/export`

Exports hunting results in JSON or CSV format.

**Request Body:**
```json
{
  "format": "json",
  "onlyQualified": true
}
```

**Parameters:**
- `format`: "json" or "csv" (default: "json")
- `onlyQualified`: boolean (default: true) - Only export qualified leads

**Response (JSON):**
```json
[
  {
    "id": "lead_abc123",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+1234567890",
    "propertyAddress": "123 Main St, LA, CA",
    "source": "zillow",
    "intent": "homebuyer",
    "qualityScore": 0.92
  }
]
```

**Response (CSV):**
```
id,name,email,phone,propertyAddress,source,intent,qualityScore
lead_abc123,John Smith,john@example.com,+1234567890,123 Main St LA CA,zillow,homebuyer,0.92
```

---

## Lead Enrichment Service

### 4. Enrich Multiple Leads
**POST** `/api/ai/enrich-leads`

Enriches a batch of leads with third-party data (Clearbit, public records, etc.).

**Request Body:**
```json
{
  "leads": [
    {
      "id": "lead_1",
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    {
      "id": "lead_2",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "+0987654321"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "enrichedCount": 2,
  "enrichedLeads": [
    {
      "id": "lead_1",
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "+1234567890",
      "clearbitData": {
        "company": "Tech Corp Inc",
        "jobTitle": "Software Engineer",
        "linkedinUrl": "https://linkedin.com/in/john-smith"
      },
      "publicRecords": {
        "homeowner": true,
        "propertyValue": 650000,
        "mortgageStatus": "active",
        "taxAssessment": 12500
      },
      "extractedIntent": {
        "budget": 500000,
        "timeline": "3-6 months",
        "propertyType": "single_family",
        "confidence": 0.85
      },
      "qualityScore": 0.88,
      "enrichmentSources": ["clearbit", "public_records", "conversation"],
      "enrichedAt": "2024-01-15T10:35:00Z"
    }
  ]
}
```

**Features:**
- Batch processing (up to 5 leads in parallel)
- Rate limiting (1s between batches)
- 8-factor quality scoring
- Duplicate detection
- Automatic deduplication

---

### 5. Enrich Single Lead
**POST** `/api/ai/enrich-lead`

Enriches a single lead with detailed data.

**Request Body:**
```json
{
  "lead": {
    "id": "lead_123",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+1234567890",
    "conversationHistory": "User mentioned budget of $400-500k and looking within 6 months"
  }
}
```

**Response:**
```json
{
  "success": true,
  "enrichedLead": {
    "id": "lead_123",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+1234567890",
    "clearbitData": {
      "company": "Tech Corp Inc",
      "jobTitle": "Software Engineer",
      "linkedinUrl": "https://linkedin.com/in/john-smith",
      "industry": "Technology"
    },
    "publicRecords": {
      "homeowner": true,
      "propertyValue": 650000,
      "mortgageStatus": "active",
      "taxAssessment": 12500,
      "yearBuilt": 2005
    },
    "extractedIntent": {
      "budget": 450000,
      "timeline": "6 months",
      "propertyType": "single_family",
      "bedrooms": null,
      "confidence": 0.92
    },
    "qualityScore": 0.92,
    "qualityFactors": {
      "emailValid": true,
      "phoneValid": true,
      "clearbitData": true,
      "publicRecords": true,
      "socialProof": true,
      "budgetExtracted": true,
      "timelineExtracted": true,
      "propertyTypeExtracted": true
    },
    "enrichmentSources": ["clearbit", "public_records", "conversation"],
    "enrichedAt": "2024-01-15T10:35:00Z"
  }
}
```

---

### 6. Get High-Value Leads
**GET** `/api/ai/high-value-leads`

Filters and returns leads with high purchase intent and budget.

**Query Parameters:**
- `minQualityScore`: float (0-1, default: 0.7) - Minimum quality score threshold
- `minBudget`: integer (default: 300000) - Minimum budget in USD

**Example Request:**
```
GET /api/ai/high-value-leads?minQualityScore=0.8&minBudget=500000
```

**Response:**
```json
{
  "success": true,
  "highValueLeadCount": 8,
  "highValueLeads": [
    {
      "id": "lead_123",
      "name": "John Smith",
      "email": "john@example.com",
      "qualityScore": 0.88,
      "extractedIntent": {
        "budget": 550000,
        "timeline": "3 months"
      },
      "isHomeowner": true,
      "propertyValue": 650000
    }
  ]
}
```

**Filtering Logic:**
- Must be homeowner (has property ownership record)
- Quality score >= minQualityScore
- Extracted budget >= minBudget

---

### 7. Get Enrichment Statistics
**GET** `/api/ai/enrichment-stats`

Retrieves comprehensive enrichment analytics.

**Response:**
```json
{
  "totalEnriched": 156,
  "successfulEnrichments": 142,
  "enrichmentRate": 0.91,
  "averageQualityScore": 0.82,
  "sourceBreakdown": {
    "clearbit": 142,
    "public_records": 156,
    "conversation": 89
  },
  "qualityDistribution": {
    "excellent": 78,
    "good": 52,
    "fair": 18,
    "poor": 8
  },
  "highValueLeadCount": 64,
  "lastEnrichmentDate": "2024-01-15T10:35:00Z"
}
```

---

### 8. Export Enriched Leads
**POST** `/api/ai/export-enriched-leads`

Exports enriched leads in JSON or CSV format.

**Request Body:**
```json
{
  "format": "json"
}
```

**Parameters:**
- `format`: "json" or "csv" (default: "json")

**Response Headers:**
```
Content-Type: application/json (or text/csv)
Content-Disposition: attachment; filename=enriched-leads.csv
```

**Response (JSON):**
```json
[
  {
    "id": "lead_123",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Tech Corp Inc",
    "jobTitle": "Software Engineer",
    "propertyValue": 650000,
    "budget": 450000,
    "timeline": "6 months",
    "qualityScore": 0.92,
    "isHomeowner": true
  }
]
```

---

## Complete Workflow Example

### Lead Generation → Enrichment Pipeline

```bash
# Step 1: Hunt for leads
curl -X POST http://localhost:5000/api/ai/hunt-leads \
  -H "Content-Type: application/json" \
  -d '{}'

# Step 2: Export qualified leads
curl -X POST http://localhost:5000/api/ai/hunt-leads/export \
  -H "Content-Type: application/json" \
  -d '{"format": "json", "onlyQualified": true}'

# Step 3: Enrich the qualified leads
curl -X POST http://localhost:5000/api/ai/enrich-leads \
  -H "Content-Type: application/json" \
  -d '{
    "leads": [...]  // Leads from step 2
  }'

# Step 4: Get high-value leads
curl -X GET "http://localhost:5000/api/ai/high-value-leads?minQualityScore=0.8&minBudget=400000"

# Step 5: Export enriched leads
curl -X POST http://localhost:5000/api/ai/export-enriched-leads \
  -H "Content-Type: application/json" \
  -d '{"format": "csv"}'
```

---

## Error Handling

All endpoints follow standard HTTP error codes:

| Status | Meaning |
|--------|---------|
| 200 | Success |
| 400 | Bad request (missing/invalid parameters) |
| 500 | Server error |

**Error Response Format:**
```json
{
  "error": "Failed to hunt leads"
}
```

---

## Rate Limiting

Lead Enrichment enforces intelligent rate limiting:
- **Batch size**: 5 leads maximum per request
- **Delay between batches**: 1 second
- **Max concurrent requests**: No limit

---

## Data Formats

### Lead Object
```typescript
{
  id: string;                    // Unique identifier
  name: string;                  // Lead name
  email: string;                 // Email address
  phone: string;                 // Phone number
  propertyAddress?: string;      // Property address
  source?: string;               // Data source (zillow, mls, facebook, etc)
  conversationHistory?: string;  // Chat/message history
}
```

### Enriched Lead Object
```typescript
{
  id: string;
  name: string;
  email: string;
  phone: string;
  clearbitData?: {
    company: string;
    jobTitle: string;
    linkedinUrl: string;
    industry: string;
  };
  publicRecords?: {
    homeowner: boolean;
    propertyValue: number;
    mortgageStatus: string;
    taxAssessment: number;
  };
  extractedIntent?: {
    budget: number;
    timeline: string;
    propertyType: string;
    confidence: number;
  };
  qualityScore: number;
  enrichmentSources: string[];
  enrichedAt: string;
}
```

---

## Testing Phase 2 Endpoints

### Requirements
1. Server running: `npm run dev`
2. Node.js 18+
3. TypeScript support

### Quick Test

```bash
# Test Lead Hunter
curl -X POST http://localhost:5000/api/ai/hunt-leads

# Test Lead Enrichment
curl -X POST http://localhost:5000/api/ai/enrich-lead \
  -H "Content-Type: application/json" \
  -d '{
    "lead": {
      "id": "test_123",
      "name": "Test User",
      "email": "test@example.com",
      "phone": "+1234567890"
    }
  }'

# Test High-Value Leads
curl -X GET "http://localhost:5000/api/ai/high-value-leads?minQualityScore=0.7"
```

---

## Next Steps

1. ✅ Phase 2 Feature 1-2 APIs implemented
2. ⏳ Feature 3: Predictive Lead Scoring
3. ⏳ Feature 4: AI Chatbot (Multi-channel)
4. ⏳ Feature 5: Property Recommendation Engine
5. ⏳ Features 6-35: Advanced features

