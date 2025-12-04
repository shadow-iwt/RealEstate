# Real Estate Automation Platform

## Overview

This is a modern SaaS platform for real estate automation, designed to help real estate agents manage leads, properties, client communications, and analytics. The application provides a comprehensive CRM system with features for lead tracking, property management, automated messaging, and performance analytics.

The platform follows a clean, professional design inspired by modern SaaS dashboards like Linear and HubSpot, with real estate-specific patterns from Zillow. It emphasizes a data-dense yet approachable interface optimized for agents working across multiple devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight alternative to React Router.

**State Management**: TanStack Query (React Query) for server state management, eliminating the need for global state management libraries. Query invalidation patterns ensure data consistency across the application.

**UI Components**: Radix UI primitives with shadcn/ui component library, providing accessible, customizable components. The design system uses the "New York" style variant with Tailwind CSS for styling.

**Styling Approach**: Tailwind CSS with a custom design system defined in `index.css`. Uses CSS custom properties for theming, supporting light/dark modes with system preference detection.

**Typography**: Inter for primary UI, DM Sans for headings, with a carefully defined hierarchy for different text elements (32px page titles, 24px section headers, 18px card titles, etc.).

**Layout System**: Responsive grid layouts with mobile-first breakpoints (md: 768px, lg: 1024px). Dashboard uses a fixed sidebar (280px) with collapsible mobile menu. Consistent spacing units based on Tailwind's scale (3, 4, 6, 8, 12, 16).

**Form Handling**: React Hook Form with Zod validation via @hookform/resolvers. Forms use multi-step patterns with progress indicators and inline validation.

### Backend Architecture

**Framework**: Express.js server running on Node.js with TypeScript compilation via tsx in development and esbuild for production builds.

**API Design**: RESTful API endpoints under `/api` prefix. Standard CRUD operations for leads, properties, agents, activities, messages, and templates.

**Request Processing**: JSON body parsing with raw body preservation for webhook integrations. Request/response logging middleware tracks API performance and errors.

**Route Organization**: Centralized route registration in `server/routes.ts`. Each resource (leads, properties, agents, etc.) has standard CRUD endpoints with consistent error handling patterns.

**Static File Serving**: In production, Express serves the built Vite client from `dist/public`. Development mode uses Vite's middleware for HMR (Hot Module Replacement).

**Development Server**: Custom Vite integration with HMR over the same HTTP server. Replit-specific plugins for runtime error overlay, cartographer, and dev banner when running in Replit environment.

### Data Storage

**ORM**: Drizzle ORM with PostgreSQL dialect, providing type-safe database queries and migrations.

**Schema Design**: 
- **Users**: Authentication and user management with role-based access
- **Agents**: Real estate agent profiles with performance metrics (total deals, revenue)
- **Leads**: Lead tracking with status pipeline (new → contacted → qualified → viewing → offer → closed/lost)
- **Properties**: Property listings with detailed metadata (type, status, pricing, features)
- **Activities**: Activity log for calls, messages, emails, viewings, notes, and tasks
- **Messages**: SMS/messaging system with status tracking (pending, sent, delivered, read, failed)
- **Message Templates**: Reusable message templates for automated communications

**Schema Patterns**: Use of PostgreSQL enums for status fields ensures data integrity. Relationships defined using Drizzle's relations API. UUID primary keys generated via `gen_random_uuid()`.

**Type Safety**: Drizzle Zod integration generates Zod schemas from database schema, providing end-to-end type safety from database to API to frontend forms.

**Database Connection**: Connection pooling via node-postgres (pg) for efficient database access. Connection string from `DATABASE_URL` environment variable.

### Authentication and Authorization

Currently implements basic user authentication structure with username/password fields. Role field in users table supports future RBAC implementation. Sessions and authentication middleware not yet fully implemented but infrastructure is in place.

### Build and Deployment

**Production Build**: Two-stage build process:
1. Vite builds client-side React app to `dist/public`
2. esbuild bundles server code to `dist/index.cjs` with selective dependency bundling (allowlist for cold start optimization)

**Development**: tsx provides direct TypeScript execution without compilation step. Vite dev server runs in middleware mode integrated with Express.

**Path Aliases**: Consistent path mapping across TypeScript compilation and bundlers:
- `@/*` → client source files
- `@shared/*` → shared types and schemas
- `@assets/*` → attached assets

**Environment**: Drizzle migrations stored in `migrations/` directory. Database schema push via `drizzle-kit push` for rapid development.

## External Dependencies

### UI Component Libraries
- **Radix UI**: Accessible component primitives (accordion, dialog, dropdown, popover, tabs, etc.)
- **shadcn/ui**: Pre-styled component implementations following consistent design patterns
- **Lucide React**: Icon library for consistent iconography throughout the application
- **Embla Carousel**: Carousel functionality for image galleries

### Data Management
- **TanStack Query**: Server state management with caching, background updates, and optimistic updates
- **React Hook Form**: Form state management with performance optimization
- **Zod**: Schema validation for forms and API data
- **date-fns**: Date formatting and manipulation

### Styling
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **class-variance-authority**: Type-safe component variants
- **tailwind-merge & clsx**: Dynamic class name composition

### Database
- **Drizzle ORM**: Type-safe SQL query builder and ORM
- **node-postgres (pg)**: PostgreSQL client for Node.js
- **connect-pg-simple**: PostgreSQL session store (infrastructure present)

### Development Tools
- **Vite**: Fast development server and build tool
- **esbuild**: Production bundler for server code
- **TypeScript**: Type safety across full stack
- **tsx**: TypeScript execution for development

### Future Integrations
The codebase includes imports suggesting planned integrations for:
- Email (nodemailer)
- Payments (Stripe)
- AI features (OpenAI, Google Generative AI)
- File uploads (multer)
- WebSockets (ws)
- Spreadsheet export (xlsx)
- Authentication (Passport.js with local strategy)
- JWT tokens (jsonwebtoken)
- Rate limiting (express-rate-limit)