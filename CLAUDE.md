# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Xelix Connect 2025 - Ticket Agent Demo**

This is a demonstration helpdesk application featuring an AI-powered ticket agent interface. The application simulates a modern customer support platform where support agents can manage email tickets with assistance from an intelligent AI agent. The demo showcases an interactive workflow where the AI agent helps resolve a supplier invoice dispute by querying internal systems, drafting emails, and coordinating with colleagues.

### What It Does

The application provides a comprehensive helpdesk interface that includes:

- **Email Ticket Management**: View and respond to customer support emails with full email threading, attachments, and status tracking
- **AI Ticket Agent**: Interactive AI assistant that helps resolve tickets by analyzing email content, extracting key information, and suggesting actions through a conversational interface
- **Real-time Notifications**: Clickable notification bell with popover display showing incoming responses from colleagues, with red dot indicator and contextual messages
- **Activity Tracking**: Monitor ticket history, status changes, and agent interactions in a dedicated activity feed
- **Intelligent Chat Interface**: Conversational AI agent with modern LLM-style typewriter animation for responses, reasoning indicators, and interactive suggestion pills
- **Ticket Status Management**: Track tickets through states (In Progress, On Hold, Resolved) with visual indicators and dynamic status updates
- **Demo Workflow**: Pre-scripted interactive demo that simulates querying ERP systems, checking contracts, drafting emails, and receiving colleague responses
- **Responsive Layout**: Adaptive interface that maintains usability across different screen sizes with proper overflow handling
- **Animated Transitions**: Smooth slide-in animations for new emails and fade-in effects for chat messages

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

### Notification System

**Bell Icon with Popover** (`src/imports/Reply.tsx:247-278`)
- Clickable bell icon in top navigation bar
- Red dot indicator (6px diameter, color `#e74c3c`) appears when new notifications arrive
- Uses Radix UI Popover component for accessibility
- Positioned at top-right, aligned to end with 8px offset

**Notification Popover Design** (`src/imports/Reply.tsx:178-235`)
- Header: "Notifications" title with purple Bell icon (16px)
- Compact card-based layout supporting multiple notifications
- White background (`#ffffff`) with faint gray border (`#e3e3e3`)
- Width: 320px

**Notification Card Structure:**
- **Sender Row**: Purple Mail icon + sender name (Alex Morgan) + timestamp (right-aligned, 10px font)
- **Preview**: Brief message description (11px font)
- **Context Reference**: Gray box with purple Sparkles icon and "Ticket Agent:" prefix showing AI agent's commitment to notify
- **Actions**: Two compact buttons (View/Dismiss) that clear the red dot indicator

**State Management:**
- `showNotification`: Boolean for red dot visibility
- `isNotificationPopoverOpen`: Boolean for popover open/close state
- `notificationData`: Object containing sender, preview, and timestamp
- Triggered by `handleAddNewEmail()` function when Alex Morgan responds

### Activity Panel System

**Dual View Interface:**
- **Activity Feed**: Timeline of ticket events and status changes
- **Ticket Agent Chat**: AI conversation interface with initial message "Hi, how can i help with ticket **#173524**?" (ticket number in bold)

**48px Sidebar Toggle:**
- Visual toggle between views using Lucide React icons (List, Sparkles)
- Icon size: 18px with 2px stroke width
- Active state styling with purple background (#501899)
- Non-active icons have 1px purple outline border
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

**Custom Animations** (`src/index.css:85-343`)
- Shimmer effects for loading states
- Sparkle pulse and orbit animations
- Slide-in transitions (left/right)
- Fade animations with collapse
- Center pulse effects
- **Email slide-in animation**: `animate-email-slide-in` (0.6s duration) for smooth appearance of new emails in inbox
- **Message animations**: `animate-slide-in-left` for agent messages, `animate-slide-in-right` for user messages
- **Card animations**: `animate-fade-in-up` for card content with configurable delays

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

## Demo Workflow

The application includes a pre-scripted interactive demo that simulates a complete ticket resolution workflow:

**Scenario:** Supplier (Wilma Oberbrunner) queries a £100 short payment on invoice INV-0115644

**Demo Sequence:**
1. **Initial Inquiry**: Ticket agent greets with "Hi, how can i help with ticket #173524?"
2. **ERP Query**: Agent uses "Query ERP" tool to check invoice processing history
3. **Finds Note**: Discovers Alex Morgan's note: "Exceeded PO allowance - only paying up to PO limit"
4. **Contract Check**: Uses "Query Contract" tool to verify payment terms with supplier
5. **PO Comparison**: Displays comparison table showing £100 difference (Invoice: £1,100 vs PO: £1,000)
6. **Draft Internal Email**: Creates email to Alex Morgan requesting confirmation
7. **Send Email**: User clicks "Send" pill to send email
8. **Notification**: After 3 seconds, red dot appears on bell icon
9. **Alex Responds**: Click bell to see notification, new email slides into inbox
10. **Draft Supplier Response**: Agent compiles final response based on Alex's confirmation
11. **Status Update**: Changes ticket status from "In Progress" to "Resolved"

**Interactive Elements:**
- Suggestion pills (clickable buttons that trigger next demo step)
- Tool indicators showing which system is being queried
- Expandable reasoning sections (click to see AI's thought process)
- Email draft cards with expand/collapse functionality
- Status change buttons (In Progress, On Hold, Resolved)

**State Triggers:**
- `triggerSendEmailSequence()`: Handles internal email sending
- `triggerAlertSequence()`: Shows Alex Morgan's response
- `handleAddNewEmail()`: Displays new email in sidebar with animation
- `handlePillClick()`: Processes suggestion pill interactions

## Important Implementation Details

### Working with Reply Component
- The main `Reply.tsx` component is extremely large (79k+ tokens)
- When modifying it, use targeted edits rather than rewriting entire sections
- Contains the core help desk interface logic and UI

### Icon System
- Uses Lucide React for icons throughout the application
- Custom icon replacement logic in `ActivityIconFix.tsx` handles dynamic icon rendering
- Icon map includes: bolt→Zap, stopwatch→Timer, PAPERCLIP→Paperclip, list→List, comment→MessageSquare, sparkles→Sparkles
- Key icons: Bell, Mail, Sparkles, List, MessageSquare, ChevronsLeft

### Color Palette & Branding
**Primary Colors:**
- **Purple/Brand**: `#5a1899` (used for icons, active states, buttons, links)
- **Purple Dark**: `#501899` (active sidebar icons)
- **Purple Light**: `#f0ebf8` (user message bubbles background)

**UI Colors:**
- **Text Primary**: `#222222` (main text)
- **Text Secondary**: `#464646` (secondary text)
- **Text Muted**: `#717182` (timestamps, helper text)
- **Border**: `#e3e3e3` (subtle borders on cards, inputs)
- **Background**: `#ffffff` (cards, popover)
- **Background Alt**: `#f6f6f8` (page background)
- **Background Subtle**: `#f9f9f9` (context boxes, hover states)

**Status Colors:**
- **Blue**: `#1e70ae` (unread indicator, links, active ticket)
- **Red**: `#e74c3c` (notification dot, error states)
- **Green**: Used for resolved status
- **Yellow**: `#fef3c7` (reminder tags)

**Branding:**
- Application title: "Xelix Ticket Agent"
- Vendor names: "Acme PLC", "AP Team"
- Logo: Xelix brand red logo in top-left sidebar

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

### Notification System Implementation (2025-01-11)

**Feature:** Interactive notification bell with popover for colleague responses

**Components Created:**
- `NotificationPopover` component with compact card design
- Bell icon wrapper with Radix UI Popover integration
- State management for notification data and popover visibility

**Key Implementation Details:**
1. **Bell Icon** (`Reply.tsx:247-278`):
   - Made clickable with hover effect (color transition)
   - Wrapped in Radix UI `Popover` component
   - Red dot indicator positioned absolutely (top-right, 6px size)

2. **Popover Styling**:
   - White background with subtle gray border (`#e3e3e3`)
   - 320px width with 16px padding
   - Aligned to end, positioned below bell with 8px offset

3. **Notification Card**:
   - Purple icons: Bell (16px) in header, Mail (14px) for sender, Sparkles (12px) for context
   - Compact layout: 10px card padding, 8px internal gaps
   - Action buttons: 6px vertical padding, 11px font size
   - "Ticket Agent:" prefix with italic context message

4. **State Flow**:
   - `handleAddNewEmail()` triggered when demo sends internal email
   - Sets `showNotification=true` (red dot), populates `notificationData`
   - 3-second delay before triggering alert sequence
   - View/Dismiss actions clear red dot via `setShowNotification(false)`

**Props Propagation:**
- State lifted to `Reply` component (root)
- Passed through: `Reply` → `MainContainer` → `SearchAndIcons` → `IconsContainer` → `ButtonLightTheme1`
- 6 new props added for notification handling (isPopoverOpen, onPopoverChange, notificationData, onDismiss, onView)

### Email Animation Enhancement (2025-01-11)

**Problem:** Alex Morgan email appearance was too abrupt in demo sequence

**Solution:**
- Created new `animate-email-slide-in` CSS animation class (`src/index.css:332-334`)
- Duration: 0.6 seconds (double the standard animation time)
- Uses `slideInRight` keyframe for horizontal slide effect
- Applied to Alex Morgan email card (`Reply.tsx:1231`)

**Effect:** Email now smoothly slides in from the right over 0.6 seconds instead of instantly appearing

### Initial Ticket Agent Message (2025-01-11)

**Enhancement:** Made ticket number bold in initial greeting

**Implementation:**
- Initial message: "Hi, how can i help with ticket #173524?"
- Ticket number `#173524` styled with `font-['Barlow:Bold',sans-serif]` and `fontWeight: 700`
- Conditional rendering checks `idx === 0 && msg.role === 'agent'`
- Located at `Reply.tsx:4506-4509`

### Email List Diversification (2025-01-11)

**Change:** Varied sender names across email list for realism

**Updated Senders:**
- Container (line 494): Wilma Oberbrunner (kept as original)
- Container7 (line 600): James Rodriguez
- Container14 (line 706): Maria Chen
- Container21 (line 808): Wilma Oberbrunner (blue highlighted card)
- Container28 (line 899): Robert Anderson
- Container35 (line 990): Jennifer Lee

**Email Header:** Added "From:" label to match "To:" label format (`Reply.tsx:2147-2160`)

## Future Enhancement Opportunities

- **Backend Integration**: Connect to real ticket management API
- **Authentication**: Add user login and session management
- **Real-time Updates**: Implement WebSocket for live ticket updates
- **AI Integration**: Connect to actual LLM API for intelligent responses
- **Search & Filtering**: Add ticket search and advanced filtering options
- **Multi-language Support**: Internationalization for global support teams
- **Analytics Dashboard**: Add metrics and reporting for ticket resolution
- **Mobile Optimization**: Enhanced responsive design for tablet/mobile devices
