# Real Estate CRM Platform

A modern, full-stack Real Estate Customer Relationship Management (CRM) platform built with React, Express, and PostgreSQL. This application helps real estate agents manage leads, properties, agents, and automate communication through WhatsApp integration.

## 🚀 Features

### Core Functionality
- **Lead Management**: Track leads through the sales pipeline (New → Contacted → Qualified → Viewing → Offer → Closed)
- **Property Listings**: Manage property listings with detailed information, images, and status tracking
- **Agent Management**: Organize your team with agent profiles, performance metrics, and specialization tracking
- **WhatsApp Integration**: Send and receive messages with leads through a WhatsApp-style interface
- **Activity Tracking**: Log all interactions (calls, messages, emails, viewings, notes) with leads and properties
- **Analytics Dashboard**: View key metrics, conversion rates, revenue tracking, and agent performance
- **Message Templates**: Create reusable message templates for quick responses

### User Interface
- Modern SaaS-style dashboard design
- Responsive layout (mobile, tablet, desktop)
- Dark/Light theme support
- Real-time data updates with React Query
- Intuitive Kanban board for lead pipeline visualization
- Advanced filtering and search capabilities

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **TanStack Query** - Data fetching and caching
- **Wouter** - Lightweight routing
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database toolkit
- **PostgreSQL** - Database
- **Zod** - Runtime validation

### Development Tools
- **tsx** - TypeScript execution
- **Drizzle Kit** - Database migrations
- **ESBuild** - Fast bundling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shadow-iwt/RealEstate.git
   cd RealEstate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/realestate_db
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up the database**
   
   Create a PostgreSQL database:
   ```sql
   CREATE DATABASE realestate_db;
   ```
   
   Then push the schema to your database:
   ```bash
   npm run db:push
   ```

## 🚀 Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at:
- **Frontend & API**: `http://localhost:5000`
- **API Endpoints**: `http://localhost:5000/api/*`

### Production Mode

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
RealEstate/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/         # Reusable UI components (Radix UI)
│   │   │   └── ...         # Feature-specific components
│   │   ├── pages/          # Page components (routes)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   └── main.tsx        # React entry point
│   └── index.html
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Database operations layer
│   ├── static.ts          # Static file serving
│   └── vite.ts            # Vite dev server integration
├── shared/                 # Shared code between client & server
│   └── schema.ts          # Database schema, types, and Zod schemas
├── script/                 # Build scripts
│   └── build.ts           # Production build script
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── drizzle.config.ts
```

## 🔌 API Endpoints

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Leads
- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get a specific lead
- `POST /api/leads` - Create a new lead
- `PATCH /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get a specific property
- `POST /api/properties` - Create a new property
- `PATCH /api/properties/:id` - Update a property
- `DELETE /api/properties/:id` - Delete a property

### Agents
- `GET /api/agents` - Get all agents
- `GET /api/agents/:id` - Get a specific agent
- `POST /api/agents` - Create a new agent
- `PATCH /api/agents/:id` - Update an agent

### Activities
- `GET /api/activities?limit=N` - Get activities (with optional limit)
- `POST /api/activities` - Create a new activity
- `PATCH /api/activities/:id` - Update an activity

### Messages
- `GET /api/messages?leadId=:id` - Get messages (optionally filtered by lead)
- `POST /api/messages` - Send a new message

### Message Templates
- `GET /api/message-templates` - Get all message templates
- `POST /api/message-templates` - Create a new template

### Analytics
- `GET /api/analytics` - Get analytics data

## 🗄️ Database Schema

The application uses the following main entities:

- **Users** - System users
- **Agents** - Real estate agents
- **Properties** - Property listings
- **Leads** - Potential customers
- **Activities** - Interaction logs
- **Messages** - WhatsApp-style messages
- **Message Templates** - Reusable message templates

See `shared/schema.ts` for complete schema definitions.

## 🎨 Design System

The application follows a modern SaaS dashboard design pattern with:
- Clean, professional interface
- Consistent spacing and typography
- Responsive grid layouts
- Accessible components (WCAG compliant)
- Smooth animations and transitions

See `design_guidelines.md` for detailed design specifications.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check TypeScript
- `npm run db:push` - Push database schema changes

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | No |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**shadow-iwt**

- GitHub: [@shadow-iwt](https://github.com/shadow-iwt)

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Shadcn/ui](https://ui.shadcn.com/) for component inspiration
- [Drizzle ORM](https://orm.drizzle.team/) for excellent TypeScript ORM
- [Vite](https://vitejs.dev/) for blazing fast development experience

---

**Note**: This is a full-stack application. Make sure PostgreSQL is running and the `DATABASE_URL` environment variable is properly configured before starting the application.

