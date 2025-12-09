# PostgreSQL Setup Guide for HobbyConnect

## Quick Start Options

### Option 1: PostgreSQL Local Installation (Windows)

#### Step 1: Download PostgreSQL
1. Go to https://www.postgresql.org/download/windows/
2. Download PostgreSQL 15+ installer
3. Run the installer

#### Step 2: Installation Setup
- **Port**: 5432 (default)
- **Username**: postgres
- **Password**: postgres (or your preference)
- **Superuser**: postgres

#### Step 3: Create Database
Open pgAdmin or use command line:
```powershell
# Using psql command line
psql -U postgres -c "CREATE DATABASE hobbyconnect;"
```

#### Step 4: Update .env
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hobbyconnect
```

#### Step 5: Apply Migrations
```bash
cd c:\Users\Saad Saeed\Documents\HobbyConnect
npx drizzle-kit push
```

---

### Option 2: Cloud Database (Recommended for Development)

#### Using Supabase (Free Tier Available)
1. Go to https://supabase.com
2. Create free account
3. Create new project
4. Copy connection string from project settings
5. Format: `postgresql://user:password@host:5432/dbname`
6. Add to `.env`:
   ```
   DATABASE_URL=your_supabase_connection_string
   ```

#### Using AWS RDS
1. Create RDS PostgreSQL instance
2. Copy endpoint and credentials
3. Create database named `hobbyconnect`
4. Add to `.env`

#### Using Render, Railway, or Heroku
- Similar process - get connection string from dashboard
- Add to `.env`

---

### Option 3: Docker PostgreSQL (Advanced)

```powershell
# Install Docker Desktop first from https://www.docker.com/products/docker-desktop

# Create PostgreSQL container
docker run -d `
  --name hobbyconnect-db `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=hobbyconnect `
  -p 5432:5432 `
  postgres:15

# To stop: docker stop hobbyconnect-db
# To start: docker start hobbyconnect-db
```

---

## Verification Steps

### 1. Test Connection
```powershell
# Install psql if not already available
# Then test connection:
psql -U postgres -h localhost -d hobbyconnect -c "SELECT 1;"
```

### 2. Apply Migrations
```bash
cd c:\Users\Saad Saeed\Documents\HobbyConnect
npm install

# Generate migrations (creates SQL files)
npx drizzle-kit generate

# Push migrations to database
npx drizzle-kit push
```

### 3. Verify Schema
```bash
# Check tables were created
psql -U postgres -h localhost -d hobbyconnect -c "\dt"
```

You should see 13 tables:
- users, agents, properties, leads, activities
- messages, message_templates
- lead_enrichment, lead_intent_segments, lead_scoring_results
- chatbot_conversations, property_embeddings, generated_outreach_messages

---

## Troubleshooting

### "password authentication failed"
- **Cause**: Wrong password in DATABASE_URL
- **Fix**: Verify password matches PostgreSQL setup
- **Test**: Try connecting with pgAdmin or psql directly

### "database does not exist"
- **Cause**: Database `hobbyconnect` not created
- **Fix**: 
  ```bash
  psql -U postgres -c "CREATE DATABASE hobbyconnect;"
  ```

### "ECONNREFUSED - connection refused"
- **Cause**: PostgreSQL not running
- **Windows**: Start "PostgreSQL 15" service or use pgAdmin
- **Docker**: `docker start hobbyconnect-db`

### Migration errors after push
- Delete migrations folder
- Delete database tables
- Run: `npx drizzle-kit generate && npx drizzle-kit push`

---

## Environment Setup

Update your `.env` file:

```env
# Database (Required for data persistence)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hobbyconnect

# OpenAI (Required for AI features)
OPENAI_API_KEY=sk-proj-your-api-key-here

# Optional: Vector Database
VECTOR_DB_PROVIDER=pinecone
PINECONE_API_KEY=your-key
PINECONE_ENV=us-west1-gcp

# Optional: Lead Enrichment
CLEARBIT_API_KEY=your-key
PEOPLE_DATA_LABS_API_KEY=your-key

# Optional: MLS Data
MLS_API_URL=your-mls-url
MLS_API_KEY=your-key

# Optional: Communication Services
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890

SENDGRID_API_KEY=your-key
SENDGRID_FROM_EMAIL=noreply@hobbyconnect.com

# Optional: Ad Platforms
FACEBOOK_APP_ID=your-id
FACEBOOK_APP_SECRET=your-secret
FACEBOOK_PAGE_ACCESS_TOKEN=your-token
FACEBOOK_PAGE_ID=your-id

GOOGLE_ADS_CUSTOMER_ID=your-id
GOOGLE_ADS_DEVELOPER_TOKEN=your-token
GOOGLE_ADS_CLIENT_ID=your-id
GOOGLE_ADS_CLIENT_SECRET=your-secret
```

---

## After Setup

Once database is running:

1. **Restart development server**:
   ```bash
   npm run dev
   ```

2. **Test AI endpoints** (ensure OPENAI_API_KEY is set):
   ```bash
   curl -X POST http://localhost:5000/api/ai/sentiment \
     -H "Content-Type: application/json" \
     -d '{"text":"Great property!"}'
   ```

3. **Continue with Phase 2** feature implementation

---

## Getting Help

- PostgreSQL docs: https://www.postgresql.org/docs/
- Drizzle docs: https://orm.drizzle.team/docs/overview
- Connection issues: https://stackoverflow.com/questions/tagged/postgresql

