CREATE TYPE "public"."activity_type" AS ENUM('call', 'message', 'email', 'viewing', 'note', 'task');--> statement-breakpoint
CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'qualified', 'viewing', 'offer', 'closed', 'lost');--> statement-breakpoint
CREATE TYPE "public"."message_status" AS ENUM('pending', 'sent', 'delivered', 'read', 'failed');--> statement-breakpoint
CREATE TYPE "public"."property_status" AS ENUM('available', 'pending', 'sold', 'rented');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('house', 'apartment', 'condo', 'townhouse', 'land', 'commercial');--> statement-breakpoint
CREATE TABLE "activities" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "activity_type" NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"agent_id" varchar,
	"lead_id" varchar,
	"property_id" varchar,
	"scheduled_at" timestamp,
	"completed_at" timestamp,
	"is_completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agents" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"avatar" text,
	"specialization" text,
	"license_number" text,
	"bio" text,
	"is_active" boolean DEFAULT true,
	"total_deals" integer DEFAULT 0,
	"total_revenue" numeric(12, 2) DEFAULT '0',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chatbot_conversations" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" varchar,
	"agent_id" varchar,
	"session_id" varchar NOT NULL,
	"messages" text,
	"sentiment" text,
	"sentiment_score" numeric(3, 2),
	"extracted_intents" text[],
	"extracted_entities" text,
	"conversation_outcome" text,
	"duration" integer,
	"message_count" integer,
	"started_at" timestamp,
	"ended_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "generated_outreach_messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" varchar NOT NULL,
	"agent_id" varchar,
	"property_id" varchar,
	"message_type" text NOT NULL,
	"channel" text DEFAULT 'email',
	"subject" text,
	"body" text NOT NULL,
	"personalized_elements" text[],
	"generation_prompt" text,
	"model_version" text,
	"was_used" boolean DEFAULT false,
	"sent_at" timestamp,
	"response_received" boolean DEFAULT false,
	"response_content" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lead_enrichment" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" varchar NOT NULL,
	"enriched_data" text,
	"data_quality_score" numeric(3, 2),
	"last_enriched_at" timestamp,
	"source" text DEFAULT 'automated',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lead_intent_segments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" varchar NOT NULL,
	"intent" text NOT NULL,
	"confidence" numeric(3, 2),
	"category" text NOT NULL,
	"extracted_at" timestamp,
	"conversation_context" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lead_scoring_results" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" varchar NOT NULL,
	"quality_score" integer,
	"level" text NOT NULL,
	"reasoning" text,
	"recommended_actions" text[],
	"model_version" text,
	"confidence" numeric(3, 2),
	"scored_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"source" text DEFAULT 'website',
	"status" "lead_status" DEFAULT 'new',
	"budget" numeric(12, 2),
	"preferred_location" text,
	"preferred_type" "property_type",
	"notes" text,
	"assigned_agent_id" varchar,
	"interested_property_id" varchar,
	"last_contacted_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "message_templates" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"category" text DEFAULT 'general',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" varchar,
	"agent_id" varchar,
	"content" text NOT NULL,
	"direction" text NOT NULL,
	"channel" text DEFAULT 'whatsapp',
	"status" "message_status" DEFAULT 'pending',
	"sent_at" timestamp,
	"delivered_at" timestamp,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text,
	"price" numeric(12, 2) NOT NULL,
	"property_type" "property_type" DEFAULT 'house',
	"status" "property_status" DEFAULT 'available',
	"bedrooms" integer,
	"bathrooms" numeric(3, 1),
	"square_feet" integer,
	"lot_size" numeric(10, 2),
	"year_built" integer,
	"features" text[],
	"images" text[],
	"agent_id" varchar,
	"views" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "property_embeddings" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" varchar NOT NULL,
	"embedding" text,
	"embedding_model" text,
	"embedding_dimension" integer,
	"features" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"role" text DEFAULT 'agent',
	"avatar" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chatbot_conversations" ADD CONSTRAINT "chatbot_conversations_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chatbot_conversations" ADD CONSTRAINT "chatbot_conversations_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generated_outreach_messages" ADD CONSTRAINT "generated_outreach_messages_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generated_outreach_messages" ADD CONSTRAINT "generated_outreach_messages_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generated_outreach_messages" ADD CONSTRAINT "generated_outreach_messages_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_enrichment" ADD CONSTRAINT "lead_enrichment_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_intent_segments" ADD CONSTRAINT "lead_intent_segments_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_scoring_results" ADD CONSTRAINT "lead_scoring_results_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_assigned_agent_id_agents_id_fk" FOREIGN KEY ("assigned_agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_interested_property_id_properties_id_fk" FOREIGN KEY ("interested_property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_embeddings" ADD CONSTRAINT "property_embeddings_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;