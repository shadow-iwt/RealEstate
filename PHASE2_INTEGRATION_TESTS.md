# Phase 2 Integration Test Guide

## Quick Start: Testing Lead Hunter & Enrichment APIs

### Prerequisites
- Server running: `npm run dev`
- Node.js 18+
- curl or Postman installed

---

## Lead Hunter Endpoints

### 1. Test: Hunt for Leads
```bash
curl -X POST http://localhost:5000/api/ai/hunt-leads \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "leadCount": 12,
  "leads": [
    {
      "id": "lead_abc123",
      "name": "Sample Lead",
      "email": "sample@example.com",
      "phone": "+1234567890",
      "source": "zillow",
      "intent": "homebuyer",
      "qualityScore": 0.92
    }
  ]
}
```

---

### 2. Test: Get Hunting Statistics
```bash
curl -X GET http://localhost:5000/api/ai/hunt-leads/stats
```

**Expected Response** (200 OK):
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
  "averageQualityScore": 0.78
}
```

---

### 3. Test: Export Leads (JSON)
```bash
curl -X POST http://localhost:5000/api/ai/hunt-leads/export \
  -H "Content-Type: application/json" \
  -d '{
    "format": "json",
    "onlyQualified": true
  }'
```

**Expected Response** (200 OK): JSON array of leads

---

### 4. Test: Export Leads (CSV)
```bash
curl -X POST http://localhost:5000/api/ai/hunt-leads/export \
  -H "Content-Type: application/json" \
  -d '{
    "format": "csv",
    "onlyQualified": true
  }' \
  -o leads.csv
```

**Expected**: CSV file with lead data

---

## Lead Enrichment Endpoints

### 5. Test: Enrich Single Lead
```bash
curl -X POST http://localhost:5000/api/ai/enrich-lead \
  -H "Content-Type: application/json" \
  -d '{
    "lead": {
      "id": "lead_1",
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "+1234567890"
    }
  }'
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "enrichedLead": {
    "id": "lead_1",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+1234567890",
    "clearbitData": {
      "company": "Tech Corp",
      "jobTitle": "Software Engineer"
    },
    "publicRecords": {
      "homeowner": true,
      "propertyValue": 650000
    },
    "extractedIntent": {
      "budget": 500000,
      "timeline": "3-6 months"
    },
    "qualityScore": 0.88
  }
}
```

---

### 6. Test: Enrich Multiple Leads (Batch)
```bash
curl -X POST http://localhost:5000/api/ai/enrich-leads \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "enrichedCount": 2,
  "enrichedLeads": [
    {
      "id": "lead_1",
      "qualityScore": 0.88,
      ...
    },
    {
      "id": "lead_2",
      "qualityScore": 0.85,
      ...
    }
  ]
}
```

---

### 7. Test: Get High-Value Leads
```bash
# Get high-value leads (quality score >= 0.7, budget >= $300k)
curl -X GET "http://localhost:5000/api/ai/high-value-leads"

# With custom thresholds
curl -X GET "http://localhost:5000/api/ai/high-value-leads?minQualityScore=0.8&minBudget=500000"
```

**Expected Response** (200 OK):
```json
{
  "success": true,
  "highValueLeadCount": 8,
  "highValueLeads": [
    {
      "id": "lead_123",
      "name": "John Smith",
      "qualityScore": 0.88,
      "extractedIntent": {
        "budget": 550000
      }
    }
  ]
}
```

---

### 8. Test: Get Enrichment Statistics
```bash
curl -X GET http://localhost:5000/api/ai/enrichment-stats
```

**Expected Response** (200 OK):
```json
{
  "totalEnriched": 156,
  "successfulEnrichments": 142,
  "enrichmentRate": 0.91,
  "averageQualityScore": 0.82,
  "highValueLeadCount": 64
}
```

---

### 9. Test: Export Enriched Leads
```bash
# Export as JSON
curl -X POST http://localhost:5000/api/ai/export-enriched-leads \
  -H "Content-Type: application/json" \
  -d '{"format": "json"}'

# Export as CSV
curl -X POST http://localhost:5000/api/ai/export-enriched-leads \
  -H "Content-Type: application/json" \
  -d '{"format": "csv"}' \
  -o enriched-leads.csv
```

---

## Error Testing

### Test: Missing Required Parameters
```bash
curl -X POST http://localhost:5000/api/ai/enrich-leads \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response** (400 Bad Request):
```json
{
  "error": "leads array required"
}
```

---

### Test: Invalid Lead Format
```bash
curl -X POST http://localhost:5000/api/ai/enrich-lead \
  -H "Content-Type: application/json" \
  -d '{"lead": null}'
```

**Expected Response** (400 Bad Request):
```json
{
  "error": "lead object required"
}
```

---

## Full Workflow Test Script

Save as `test-phase2.sh`:

```bash
#!/bin/bash

echo "🚀 Phase 2 API Integration Test"
echo "================================"
echo ""

# Test 1: Hunt Leads
echo "1️⃣  Testing Lead Hunter..."
HUNT_RESULT=$(curl -s -X POST http://localhost:5000/api/ai/hunt-leads \
  -H "Content-Type: application/json" \
  -d '{}')
echo "Hunt Result: $HUNT_RESULT"
echo ""

# Test 2: Get Stats
echo "2️⃣  Testing Lead Statistics..."
STATS_RESULT=$(curl -s -X GET http://localhost:5000/api/ai/hunt-leads/stats)
echo "Stats Result: $STATS_RESULT"
echo ""

# Test 3: Enrich Lead
echo "3️⃣  Testing Lead Enrichment (Single)..."
ENRICH_RESULT=$(curl -s -X POST http://localhost:5000/api/ai/enrich-lead \
  -H "Content-Type: application/json" \
  -d '{
    "lead": {
      "id": "test_1",
      "name": "Test User",
      "email": "test@example.com",
      "phone": "+1234567890"
    }
  }')
echo "Enrichment Result: $ENRICH_RESULT"
echo ""

# Test 4: High-Value Leads
echo "4️⃣  Testing High-Value Leads Filter..."
HIGHVALUE_RESULT=$(curl -s -X GET "http://localhost:5000/api/ai/high-value-leads?minQualityScore=0.7")
echo "High-Value Result: $HIGHVALUE_RESULT"
echo ""

# Test 5: Enrichment Stats
echo "5️⃣  Testing Enrichment Statistics..."
ENRICHSTATS_RESULT=$(curl -s -X GET http://localhost:5000/api/ai/enrichment-stats)
echo "Enrichment Stats Result: $ENRICHSTATS_RESULT"
echo ""

echo "✅ Phase 2 API Tests Complete!"
```

**Run it**:
```bash
chmod +x test-phase2.sh
./test-phase2.sh
```

---

## Postman Collection

Import this into Postman as a collection:

```json
{
  "info": {
    "name": "Phase 2 - Lead Hunter & Enrichment",
    "description": "HobbyConnect AI - Lead Generation & Enrichment APIs"
  },
  "item": [
    {
      "name": "Hunt Leads",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/ai/hunt-leads",
        "header": [
          {"key": "Content-Type", "value": "application/json"}
        ],
        "body": {"raw": "{}"}
      }
    },
    {
      "name": "Hunt Stats",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/ai/hunt-leads/stats"
      }
    },
    {
      "name": "Enrich Single Lead",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/ai/enrich-lead",
        "header": [
          {"key": "Content-Type", "value": "application/json"}
        ],
        "body": {
          "raw": "{\"lead\": {\"id\": \"test_1\", \"name\": \"Test\", \"email\": \"test@example.com\", \"phone\": \"+1234567890\"}}"
        }
      }
    },
    {
      "name": "High-Value Leads",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/ai/high-value-leads?minQualityScore=0.7&minBudget=300000"
      }
    }
  ]
}
```

---

## Debugging Tips

### 1. Check Server Logs
Look for errors in terminal running `npm run dev`

### 2. Verify Endpoints Loaded
Check for these messages in server startup:
```
Lead Hunter Routes initialized
Lead Enrichment Routes initialized
```

### 3. Test Server Health
```bash
curl -X GET http://localhost:5000/api/health
```

### 4. Enable Verbose Curl Output
```bash
curl -v -X POST http://localhost:5000/api/ai/hunt-leads \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 5. Check Response Headers
```bash
curl -i -X POST http://localhost:5000/api/ai/hunt-leads \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## Performance Testing

### Load Test: Hunt Leads (10 requests)
```bash
for i in {1..10}; do
  echo "Request $i"
  curl -s -X POST http://localhost:5000/api/ai/hunt-leads \
    -H "Content-Type: application/json" \
    -d '{}' | jq '.leadCount'
done
```

### Load Test: Enrich Leads (Batch of 50)
```bash
curl -X POST http://localhost:5000/api/ai/enrich-leads \
  -H "Content-Type: application/json" \
  -d '{
    "leads": [
      {"id": "lead_1", "name": "Lead 1", "email": "lead1@example.com", "phone": "+1111111111"},
      {"id": "lead_2", "name": "Lead 2", "email": "lead2@example.com", "phone": "+2222222222"},
      ...
    ]
  }'
```

---

## Common Issues & Solutions

### Issue: "Failed to hunt leads"
**Solution**: Check if AIService methods are accessible. Verify `server/ai/aiService.ts` exists and imports are correct.

### Issue: "leads array required"
**Solution**: Ensure request body includes `leads` array:
```json
{
  "leads": [...]
}
```

### Issue: Port already in use (5000)
**Solution**: 
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
# Then restart
npm run dev
```

### Issue: CORS errors
**Solution**: Verify server has CORS enabled in index.ts

### Issue: Empty responses
**Solution**: Check that mock data exists in service methods. Current implementation uses mock data until database is connected.

---

## Next Steps After Testing

1. ✅ Verify all 8 endpoints respond correctly
2. ✅ Check response formats match documentation
3. ✅ Validate error handling with invalid inputs
4. ✅ Review server logs for any warnings

**If all tests pass**, proceed to:
- Feature 3: Predictive Lead Scoring
- Database persistence integration
- Real API integration (Clearbit, etc.)

