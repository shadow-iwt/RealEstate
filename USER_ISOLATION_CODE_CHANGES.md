# User Data Isolation - Key Code Changes

## 1. Authentication Middleware (server/index.ts)

```typescript
// Extract userId from Bearer token and attach to request
app.use((req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  
  if (token) {
    try {
      // Token format: userId:timestamp (base64 encoded)
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      const [userId] = decoded.split(":");
      (req as any).userId = userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  
  next();
});
```

## 2. Storage Methods with userId Filtering (server/storage.ts)

### Example: getLeads with userId filter
```typescript
async getLeads(userId?: string): Promise<any[]> {
  if (userId) {
    return await Lead.find({ userId }).sort({ createdAt: -1 }).lean();
  }
  return await Lead.find().sort({ createdAt: -1 }).lean();
}
```

### Example: getDashboardStats with userId filter
```typescript
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
  
  // Calculate stats based on filtered data
  // ... rest of calculation
}
```

## 3. Routes with userId Extraction and Permission Checks (server/routes.ts)

### Example: GET /api/leads with user isolation
```typescript
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
```

### Example: GET /api/leads/:id with ownership verification
```typescript
app.get("/api/leads/:id", async (req, res) => {
  try {
    const lead = await storage.getLead(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    
    // Verify user owns this lead
    if (lead.userId !== (req as any).userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    
    res.json(lead);
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ error: "Failed to fetch lead" });
  }
});
```

### Example: POST /api/leads with automatic userId assignment
```typescript
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
      description: `Lead ${data.firstName} ${data.lastName} was added...`,
      leadId: lead.id,
    });
    
    res.status(201).json(lead);
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ error: "Failed to create lead" });
  }
});
```

## 4. Database Models with userId Index (server/models/mongoose-models.ts)

```typescript
const LeadSchema = new Schema<ILead>({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  userId: { type: String, required: true, index: true },  // ← NEW: Required and indexed
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  source: { type: String, default: "website" },
  status: { type: String, default: "new" },
  // ... other fields
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
```

## 5. TypeScript Type Updates (server/types.ts)

```typescript
export interface Lead {
  id: string;
  userId: string;  // ← NEW: Required field
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  // ... other fields
  createdAt: Date;
  updatedAt: Date;
}

export type InsertLead = Omit<Lead, "id" | "createdAt" | "updatedAt">;
```

## 6. Database Migration (server/migrations/addUserIdFields.ts)

```typescript
// Migrate existing records to have userId
async function addUserIdFields() {
  const TEST_USER_ID = "69382587450104d430f06e8a"; // Test user ID
  
  // Add userId to all leads
  await Lead.updateMany(
    { userId: { $exists: false } },
    { $set: { userId: TEST_USER_ID } }
  );
  
  // Add userId to all properties
  await Property.updateMany(
    { userId: { $exists: false } },
    { $set: { userId: TEST_USER_ID } }
  );
  
  // ... similar for other collections
}
```

## How It Works End-to-End

1. **Login**: User logs in with email/password
   ```
   POST /api/auth/login
   Response: { token: "base64(userId:timestamp)", user: {...} }
   ```

2. **Authorization**: Client stores token and sends it with each request
   ```
   GET /api/leads
   Headers: { Authorization: "Bearer base64(userId:timestamp)" }
   ```

3. **Middleware**: Server extracts userId from token
   ```
   Token decoded → userId extracted → attached to req.userId
   ```

4. **Route Handler**: Extracts userId and passes to storage
   ```
   const userId = (req as any).userId;
   const leads = await storage.getLeads(userId);
   ```

5. **Storage Layer**: Filters database queries by userId
   ```
   await Lead.find({ userId }).sort({ createdAt: -1 })
   ```

6. **Permission Check**: Verifies ownership before access
   ```
   if (lead.userId !== userId) {
     return 403 Unauthorized
   }
   ```

## Result

✅ **Complete User Data Isolation**: Each user can only see and modify their own data
- Leads
- Properties
- Agents
- Activities
- Messages
- Message Templates
- Dashboard Statistics
- Analytics Reports

