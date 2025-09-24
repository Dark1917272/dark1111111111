# Overview

This is a full-stack web application called "BankBros" that displays affiliate leaderboard data from Rainbet's API. The application is built as a modern React frontend with an Express.js backend, showcasing real-time affiliate tracking and performance metrics in a gambling/casino context. The project uses a monorepo structure with shared TypeScript types and schemas between frontend and backend.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Component Structure**: Organized into pages, components/ui, and layout components
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with CORS enabled for cross-origin requests
- **Error Handling**: Centralized error middleware with status code mapping
- **Development**: Hot reload with custom Vite integration for development mode
- **Request Logging**: Custom middleware for API request/response logging

## Data Layer
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Shared schema definitions between frontend and backend
- **Validation**: Zod schemas for runtime type checking and API validation
- **Storage Abstraction**: Interface-based storage layer with in-memory implementation for development

## External Dependencies

### Third-party APIs
- **Rainbet API**: External affiliate data provider for leaderboard information
- **Neon Database**: Serverless PostgreSQL database hosting

### UI and Component Libraries
- **Radix UI**: Headless component primitives for accessibility
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Embla Carousel**: Carousel/slider component functionality
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the entire application
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint/Prettier**: Code formatting and linting (implied by modern setup)

### Session and Authentication
- **connect-pg-simple**: PostgreSQL session store for Express sessions (prepared for future auth implementation)

### Validation and Forms
- **Zod**: Schema validation library
- **React Hook Form**: Form state management and validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

The application is structured to be easily deployable on platforms like Replit, with environment-based configuration and development-friendly tooling.