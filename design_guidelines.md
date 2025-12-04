# Real Estate Automation Platform - Design Guidelines

## Design Approach

**Selected Approach:** Design System - Modern SaaS Dashboard
**Reference Inspiration:** Linear (clean dashboard), HubSpot (CRM patterns), Zillow (property listings)
**Design Philosophy:** Professional, data-dense interface balanced with modern, approachable aesthetics for real estate agents working across devices.

## Typography System

**Font Families:** Inter (primary UI), DM Sans (headings)

**Hierarchy:**
- Page Titles: 32px/36px, font-bold
- Section Headers: 24px/28px, font-semibold
- Card Titles: 18px/24px, font-medium
- Body Text: 15px/22px, font-normal
- Small Text/Labels: 13px/18px, font-medium
- Data/Numbers: 16px/20px, font-semibold (tabular-nums)

## Layout System

**Spacing Units:** Tailwind units of 3, 4, 6, 8, 12, 16 (p-3, m-4, gap-6, py-8, space-y-12, px-16)

**Grid Structure:**
- Dashboard: Sidebar (280px) + Main content area
- Mobile: Single column, collapsible menu
- Property Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Analytics: grid-cols-1 md:grid-cols-2 lg:grid-cols-4

**Container Widths:**
- Dashboard content: max-w-7xl
- Property listings: max-w-6xl
- Forms: max-w-2xl

## Component Library

### Navigation
**Dashboard Sidebar:** Fixed left panel with logo, main navigation (Dashboard, Leads, Properties, Agents, Analytics), profile section at bottom. Icons from Heroicons (home, users, building-office, chart-bar). Mobile: slide-out drawer with overlay.

**Top Bar:** Search bar (full-width on mobile), notification bell, agent profile dropdown, quick action button "New Lead".

### Property Listing Cards
Modern card design with large image thumbnail (aspect-ratio-4/3), property title (font-semibold, 18px), price (prominent, 20px), location with map-pin icon, key stats row (beds/baths/sqft with icons), CTA buttons (View Details, Contact), availability badge (top-right overlay).

### Lead Capture Forms
Multi-step form with progress indicator, generous input spacing (space-y-6), clear labels above inputs, validation states, floating labels for active inputs, primary CTA button (full-width on mobile).

### CRM Dashboard Cards
Stat cards with large number display (32px), label underneath, trend indicator (up/down arrow with percentage), icon in top-right, subtle border, hover lift effect.

**Lead Pipeline:** Kanban-style columns (New, Contacted, Qualified, Viewing, Offer, Closed), draggable cards with lead name, property interest, contact method badges, timestamp, assigned agent avatar.

### Agent Activity Feed
Timeline layout with avatar, activity description, timestamp, property/lead reference card, expandable details. Icons for different activities (phone, message, calendar, eye).

### Data Tables
Sticky header, alternating row treatment, sortable columns with arrow indicators, row actions menu (three-dot), pagination at bottom, responsive: stack to cards on mobile.

### Property Detail Pages
**Hero Gallery:** Full-width carousel with thumbnail navigation, image counter, fullscreen toggle, agent contact overlay (blurred background button).

**Details Section:** Two-column layout (details + contact form), tabs for Description/Features/Location, interactive map embed, pricing breakdown table, schedule viewing CTA.

### WhatsApp Integration Panel
Message template builder, conversation thread view (chat bubble design), quick reply buttons, automation rule settings, status indicators for sent/delivered/read.

## Images

**Hero Image:** Yes - Property showcase hero on listing pages (1920x800px, architectural photography)

**Property Images:** Essential throughout - listing cards (400x300px), gallery carousels (1200x800px), detail page galleries

**Agent Avatars:** Circular thumbnails (40px standard, 64px in profiles)

**Placeholder Images:** Use subtle gradient placeholders for properties without photos

## Responsive Behavior

**Mobile-First Breakpoints:**
- Base: Single column, stacked layout, bottom navigation bar
- md (768px): Two-column grids, sidebar appears
- lg (1024px): Three-column grids, full dashboard layout
- xl (1280px): Four-column analytics, expanded sidebars

**Touch Targets:** Minimum 44px height for all interactive elements, increased spacing between clickable items on mobile.

## Form Design

Consistent input styling: 48px height, rounded corners (rounded-lg), clear focus states, floating labels, inline validation with icon indicators, grouped related fields, sticky submit button on mobile forms.

## Accessibility

High contrast ratios for text, clear focus indicators (2px ring), semantic HTML structure, ARIA labels for dashboard widgets, keyboard navigation throughout, screen reader announcements for live data updates.

## Animations

Minimal and purposeful: Card hover lift (scale-[1.02]), smooth transitions (transition-all duration-200), skeleton loaders for data fetching, slide transitions for mobile navigation, subtle fade-ins for new content.