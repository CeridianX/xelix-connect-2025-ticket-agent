# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Xelix Connect 2025 - Ticket Agent Demo**

This is a demonstration helpdesk application featuring an AI-powered ticket agent interface. The application simulates a modern customer support platform where support agents can manage email tickets with assistance from an intelligent AI agent.

### What It Does

The application provides a comprehensive helpdesk interface that includes:

- **Email Ticket Management**: View and respond to customer support emails with full email threading, attachments, and status tracking
- **AI Ticket Agent**: Interactive AI assistant that helps resolve tickets by analyzing email content, extracting key information, and suggesting actions
- **Activity Tracking**: Monitor ticket history, status changes, and agent interactions in a dedicated activity feed
- **Intelligent Chat Interface**: Conversational AI agent with modern LLM-style typewriter animation for responses
- **Ticket Status Management**: Track tickets through states (In Progress, On Hold, Resolved) with visual indicators
- **Responsive Layout**: Adaptive interface that maintains usability across different screen sizes with proper overflow handling

### Technology Stack

**Frontend Framework:**
- React 18.3.1 with TypeScript
- Vite 6.3.5 (build tool and dev server)
- React Hooks (useState, useEffect) for state management

**Styling & UI:**
- Tailwind CSS v4.1.17 with JIT compiler
- Custom CSS variables for theming (light/dark mode support)
- shadcn/ui component library (48 Radix UI-based components)
- Lucide React for icons
- Custom animations (typewriter effect, slide-in, fade transitions)

**Key Libraries:**
- @radix-ui/* - Accessible UI primitives (dialogs, dropdowns, popovers, etc.)
- class-variance-authority (CVA) - Component variant management
- clsx + tailwind-merge - Class name utilities
- react-hook-form - Form handling
- next-themes - Dark mode support
- sonner - Toast notifications

**Development Tools:**
- @vitejs/plugin-react-swc - Fast React refresh with SWC compiler
- PostCSS with Tailwind plugin
- TypeScript for type safety

## Development Commands

### Setup
```bash
npm i
```

### Development Server
```bash
npm run dev
```
Starts Vite dev server on port 3000 and opens browser automatically.

### Build
```bash
npm run build
```
Builds the production bundle to `build/` directory (not `dist/`).

## Key Features

### AI Chat Interface

The application features a sophisticated AI chat interface with the following capabilities:

**Typewriter Animation** (`src/imports/Reply.tsx:4520-4535`)
- Character-by-character text reveal at 30ms per character
- Implemented using React hooks (useState, useEffect)
- Creates modern LLM-style streaming responses
- Applied to agent messages while preserving instant display for user messages

**Message Types:**
- **Agent Messages**: AI responses with optional reasoning/thinking indicators
- **User Messages**: Support agent inputs with custom light purple styling (#f0ebf8 background, #5a1899 text)
- **Thinking Messages**: Visual indicators when AI is processing
- **Card Messages**: Rich content cards with structured data (PO amounts, invoice details, etc.)

**Chat Features:**
- Flexible bubble widths (agent: 95% max, user: 80% max)
- Smooth animations (slide-in-left for agent, slide-in-right for user)
- Exit animations for message removal
- Proper text wrapping with 1.6 line height for readability

### Activity Panel System

**Dual View Interface:**
- **Activity Feed**: Timeline of ticket events and status changes
- **Ticket Agent Chat**: AI conversation interface

**48px Sidebar Toggle:**
- Visual toggle between views using Lucide React icons (List, Sparkles)
- Icon size: 18px with 2px stroke width
- Active state styling with purple background (#501899)
- Persistent sidebar visibility (fixed width, no overflow clipping)

### Responsive Layout Architecture

**Flexible Container Hierarchy:**
- Uses `min-w-0` throughout container chain to enable proper flex shrinking
- Activity panel: Fixed 435px preferred width
- Email content area: Flexible with `flex-1`
- Proper overflow handling with `overflow-y-auto` for scrollable content

**ActionBar Design:**
- Compact icon-only status buttons (labels hidden on mobile)
- Horizontal scroll for overflow content
- Status indicators: In Progress, On Hold, Resolved
- Quick actions: Reply, Reply All, Forward, Internal Note

### Styling System

**Theme Variables** (`src/index.css:3-79`)
- Complete light/dark mode color schemes
- OKLCH color space for perceptual uniformity
- CSS custom properties for easy theming
- Consistent spacing using rem units

**Custom Animations** (`src/index.css:85-309`)
- Shimmer effects for loading states
- Sparkle pulse and orbit animations
- Slide-in transitions (left/right)
- Fade animations with collapse
- Center pulse effects

## Architecture

### Application Structure

- **Entry Point**: `src/main.tsx` → `src/App.tsx`
- **Main Components**:
  - `src/imports/Reply.tsx` - Primary help desk interface component (very large, ~80k tokens)
  - `src/components/ActivityIconFix.tsx` - DOM manipulation component that dynamically replaces text-based icon names with actual Lucide React icons

### Component Organization

- **UI Components** (`src/components/ui/`): 48 Radix UI-based components following shadcn/ui patterns with Tailwind styling
- **Figma Imports** (`src/imports/`): Contains exported components from Figma design, including SVG path definitions
- **Custom Components** (`src/components/`): Application-specific components including icon replacement logic

### Styling Architecture

- **CSS Framework**: Tailwind CSS with custom configuration in `src/index.css`
- **Component Variants**: Uses `class-variance-authority` (CVA) for component variant management
- **Utility Functions**: Components use `cn()` utility from `src/components/ui/utils.tsx` for class name merging
- **Global Styles**: `src/styles/globals.css` for application-wide styles

### Key Patterns

**Icon Replacement Pattern**: The `ActivityIconFix` component uses a MutationObserver to dynamically replace text content (like "bolt", "stopwatch") with corresponding Lucide React icons. This runs on mount and observes DOM changes to handle dynamically added content.

**Vite Path Aliases**: The project uses `@/` alias pointing to `src/` directory, configured in `vite.config.ts:49`. All imports should use this alias for consistency.

**Package Aliases**: Extensive versioned package aliases in Vite config (lines 11-48) map specific package versions to their base names for import resolution.

## Important Implementation Details

### Working with Reply Component
- The main `Reply.tsx` component is extremely large (79k+ tokens)
- When modifying it, use targeted edits rather than rewriting entire sections
- Contains the core help desk interface logic and UI

### Icon System
- Uses Lucide React for icons throughout the application
- Custom icon replacement logic in `ActivityIconFix.tsx` handles dynamic icon rendering
- Icon map includes: bolt→Zap, stopwatch→Timer, PAPERCLIP→Paperclip, list→List, comment→MessageSquare, sparkles→Sparkles

### UI Component Standards
- All UI components follow Radix UI + Tailwind pattern
- Components support dark mode via `next-themes`
- Focus states and accessibility handled via Radix primitives
- Consistent variant system using CVA

### Development Server Configuration
- Port: 3000 (configured in `vite.config.ts:57`)
- Auto-opens browser on start
- SWC used for fast React refresh
- Build target: esnext

## Design System Notes

Refer to `src/guidelines/Guidelines.md` for any project-specific design system rules (currently contains template content only).

## Recent Improvements & Implementation Notes

### Layout Optimization (2025-01-10)

**Problem Solved:** Eliminated horizontal scrolling and ensured all UI elements (including the 48px activity sidebar) are visible without overflow.

**Solution Approach:**
1. Changed container hierarchy from `min-w-px` to `min-w-0` throughout the component tree to allow proper flexbox shrinking
2. Removed conflicting `shrink-0` declarations that prevented containers from adapting to viewport
3. Added `overflow-x-auto` to ActionBar for graceful degradation on narrow screens
4. Removed `overflow-clip` from parent containers that were hiding the activity sidebar

**Files Modified:**
- `src/imports/Reply.tsx` - Multiple container components (EmailBody, EmailDetail, ContentContainer, ActionBar, ContentArea, EmailContent, etc.)

### Chat Bubble Styling (2025-01-10)

**User Chat Bubbles:**
- Background: `#f0ebf8` (light purple)
- Text color: `#5a1899` (dark purple)
- Border radius: `16px` (more rounded than agent bubbles)
- Max width: `80%` of container
- Alignment: Right-aligned with `justify-end`

**Agent Chat Bubbles:**
- Background: `#f5f5f5` (light gray)
- Text color: `#222222` (dark gray)
- Border radius: `8px`
- Max width: `95%` of container
- Alignment: Left-aligned with `justify-start`

### Typewriter Animation Implementation (2025-01-10)

**Component:** `TypewriterText` function component (`src/imports/Reply.tsx:4520-4535`)

**How It Works:**
1. Accepts `text` string and optional `speed` (default 30ms)
2. Uses `useState` to track `displayedText` and `currentIndex`
3. `useEffect` hook with dependency on `currentIndex` creates a timeout to add one character at a time
4. Cleanup function prevents memory leaks when component unmounts or text changes
5. Returns a `<span>` with the accumulated `displayedText`

**Applied To:**
- Agent messages with reasoning (line 4454)
- Simple agent messages (line 4508, conditional - excludes "thinking" type)
- User messages display instantly (no typewriter effect)

### Activity Panel Integration (2025-01-10)

**Panel Title Change:** Updated from "AI Agent" to "Ticket Agent" to better reflect the application's purpose

**Sidebar Icon Sizes:** Increased from 12px to 18px for better visibility and touch targets

**Implementation Details:**
- Activity panel width: `435px` (preferred, can flex slightly)
- Sidebar width: `48px` (fixed with `shrink-0`)
- Content area (Frame5): Uses `flex-1` to fill remaining space (387px when at preferred width)
- Toggle state managed via React state with `activeView` variable ('activity' | 'agent')

## Future Enhancement Opportunities

- **Backend Integration**: Connect to real ticket management API
- **Authentication**: Add user login and session management
- **Real-time Updates**: Implement WebSocket for live ticket updates
- **AI Integration**: Connect to actual LLM API for intelligent responses
- **Search & Filtering**: Add ticket search and advanced filtering options
- **Multi-language Support**: Internationalization for global support teams
- **Analytics Dashboard**: Add metrics and reporting for ticket resolution
- **Mobile Optimization**: Enhanced responsive design for tablet/mobile devices
