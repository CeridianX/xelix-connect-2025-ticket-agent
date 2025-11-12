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

**Typewriter Animation** (`src/imports/Reply.tsx:~4911-4946`)
- Word-by-word text reveal at 80ms per word
- Implemented using React hooks (useState, useEffect, useRef)
- Creates modern LLM-style streaming responses
- Uses ref pattern to prevent memory leaks and duplicate callback execution
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

### Auto-Progression System

The application features an intelligent auto-progression system that creates a seamless, non-interactive demo experience for certain workflow steps:

**Auto-Progressing Scenarios:**
- **MSA Result** (`msa-result`): Auto-progresses after 0.6s (600ms)
- **Short Payment Result** (`short-payment-result`): Auto-progresses after 0.6s (600ms)
- **Confirm Colleague** (`confirm-colleague`): Auto-progresses after 0.6s (600ms)

**Implementation Details:**
- Uses `triggeredMessages` Set (line ~4480) to prevent duplicate auto-triggers
- New ChatMessage properties: `triggerShortPayment`, `triggerCommentsCheck`, `triggerDraftEmail`
- Multiple trigger points ensure reliable progression:
  - `handleTextComplete()`: Fires when main text animation completes
  - `handleAfterTextComplete()`: Fires when textAfterCard animation completes
  - `TypewriterText onComplete` callback: Primary trigger location
  - `useEffect` with animatedMessages dependency: Fallback trigger for already-animated messages

**Trigger Functions:**
- `triggerShortPaymentSequence()`: Initiates short-payment analysis
- `triggerCommentsCheckSequence()`: Initiates comments check workflow
- `triggerDraftEmailSequence()`: Initiates email drafting

**Timing Improvements:**
- MSA message timing: Reduced from 5800ms to 1800ms
- Short-payment message timing: Reduced from 5800ms to 2350ms
- More responsive demo flow with shorter delays between actions

### Chat Scrolling Behavior

**Scroll Management** (`src/imports/Reply.tsx:~4481, ~4546-4548`)
- Uses `messagesContainerRef` to directly control scroll position
- Scroll implementation: `messagesContainerRef.current.scrollTop = scrollHeight`
- Triggers on message changes when Activity Panel is in 'ai' view mode
- Ensures latest messages are always visible during demo progression

**Container Styling** (line ~4557)
- Messages container: `overflow-y-auto px-[8px] py-[16px] pb-[80px] flex-1 w-full min-h-0`
- Bottom padding increased from 64px to 80px for better message visibility
- Direct scrollTop control provides more reliable scrolling than scrollIntoView approach

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
- Suggestion pills (clickable buttons for manual demo progression)
- Auto-progressing scenarios (MSA result, short-payment result, confirm-colleague)
- Tool indicators showing which system is being queried
- Expandable reasoning sections (click to see AI's thought process)
- Email draft cards with expand/collapse functionality
- Status change buttons (In Progress, On Hold, Resolved)

**State Triggers:**
- `triggerSendEmailSequence()`: Handles internal email sending
- `triggerAlertSequence()`: Shows Alex Morgan's response
- `triggerShortPaymentSequence()`: Auto-triggered after MSA result display (0.6s delay)
- `triggerCommentsCheckSequence()`: Auto-triggered after short-payment result (0.6s delay)
- `triggerDraftEmailSequence()`: Auto-triggered after colleague confirmation (0.6s delay)
- `handleAddNewEmail()`: Displays new email in sidebar with animation
- `handlePillClick()`: Processes suggestion pill interactions (manual triggers)

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

### Typewriter Animation Implementation (2025-01-10, Updated 2025-01-12)

**Component:** `TypewriterText` function component (`src/imports/Reply.tsx:~4911-4946`)

**How It Works:**
1. Accepts `text` string, optional `speed` (default 80ms per word), and optional `onComplete` callback
2. Uses `useState` to track `currentIndex` for word position
3. Uses `useRef` for `onCompleteRef`, `hasCalledComplete`, and `wordsRef` to prevent memory leaks
4. Text splitting: Divides text by spaces using regex `/(\s+)/` while preserving whitespace
5. `useEffect` hook advances word index every 80ms (default speed)
6. Completion callback fires once when all words are displayed using ref pattern

**Speed Change (2025-01-12):**
- Changed from character-based (30ms/char) to word-based animation (80ms/word)
- Provides more natural reading rhythm and faster overall reveal
- Example: 10-word message takes ~800ms instead of ~1500ms for 50 characters

**Applied To:**
- All agent messages except "thinking" type and initial greeting
- Primary implementation with auto-progression triggers shown in lines ~4686-4714
- User messages display instantly (no typewriter effect)

**Callback Handling:**
- `onComplete` callback used to trigger auto-progression for certain scenarios
- Marks message as animated via `markMessageAnimated(idx)`
- Triggers card display for messages with `hasCard` property
- Initiates auto-progression sequences (short-payment, comments-check, draft-email)

### Activity Panel Integration (2025-01-10)

**Panel Title Change:** Updated from "AI Agent" to "Ticket Agent" to better reflect the application's purpose

**Sidebar Icon Sizes:** Increased from 12px to 18px for better visibility and touch targets

**Implementation Details:**
- Activity panel width: `435px` (preferred, can flex slightly)
- Sidebar width: `48px` (fixed with `shrink-0`)
- Content area (Frame5): Uses `flex-1` to fill remaining space (387px when at preferred width)
- Toggle state managed via React state with `activeView` variable ('activity' | 'agent')

### Message Visibility & Scrolling Optimization (2025-01-12)

**Problem:** Messages at bottom of chat were being cut off or hard to see, especially longer messages that required manual scrolling

**Solution:**
1. **Increased Bottom Padding**: Changed from `pb-[64px]` to `pb-[80px]` on messages container (line ~4557)
2. **Direct Scroll Control**: Replaced `scrollIntoView()` approach with direct `scrollTop` manipulation
3. **Ref-Based Scrolling**: Uses `messagesContainerRef.current.scrollTop = scrollHeight` for precise control

**Implementation** (`Reply.tsx:~4546-4548`):
```javascript
if (messagesContainerRef.current && activeView === 'ai') {
  messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
}
```

**Benefits:**
- More reliable scroll behavior across browsers
- Better message visibility with extra bottom padding
- Smoother auto-scroll during demo progression
- Prevents last message from being partially obscured by input area

### Interaction Pattern Changes (2025-01-12)

**Removed Manual Interactions:**
The following scenarios were changed from click-to-progress to auto-progression:
- `msa-result`: No longer requires click; auto-progresses after 600ms
- `short-payment-result`: No longer requires click; auto-progresses after 600ms
- `confirm-colleague`: No longer requires click; auto-progresses after 600ms

**Styling Removed:**
- `cursor-pointer` class no longer applied to these scenario bubbles (line ~4596)
- `onClick` handlers removed for these specific scenarios (lines ~4598-4608)
- Bubbles now appear as informational content rather than interactive elements

**Retained Manual Interactions:**
- `email-sent-result`: Still requires click to show notification
- `alert-result`: Still requires click to draft supplier response
- Suggestion pills: Remain clickable throughout demo
- Expandable reasoning sections: Remain clickable

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

### Auto-Progression & Timing Optimization (2025-01-12)

**Enhancement:** Streamlined demo experience with automatic workflow progression and improved timing

**Changes Made:**

1. **Auto-Progression Implementation:**
   - Added `triggeredMessages` Set state to track which messages have triggered sequences
   - Created new ChatMessage properties: `triggerShortPayment`, `triggerCommentsCheck`, `triggerDraftEmail`
   - Implemented multiple trigger handlers for reliability:
     - `handleTextComplete()`: Triggers after main text animation (lines ~4482-4502)
     - `handleAfterTextComplete()`: Triggers after textAfterCard animation (lines ~4504-4515)
     - TypewriterText `onComplete` callback: Primary trigger mechanism (lines ~4688-4714)
     - useEffect fallback: Handles already-animated messages (lines ~4522-4542)

2. **Timing Improvements:**
   - MSA message delay: 5800ms → 1800ms (67% faster)
   - Short-payment message delay: 5800ms → 2350ms (59% faster)
   - Auto-progression delay: 600ms for all three scenarios (MSA, short-payment, confirm-colleague)
   - Follow-up sequence: 2000ms → 800ms initial trigger

3. **Typewriter Speed Change:**
   - Changed from character-based (30ms/char) to word-based (80ms/word) animation
   - Overall faster text reveal while maintaining readability
   - Example: "Now I'll investigate the £100 short-payment." completes in ~1350ms vs ~1500ms previously

4. **Scrolling Improvements:**
   - Changed from `scrollIntoView()` to direct `scrollTop` control
   - Reference changed: `messagesEndRef` → `messagesContainerRef`
   - Implementation: `messagesContainerRef.current.scrollTop = scrollHeight`
   - More reliable cross-browser behavior

5. **Message Visibility:**
   - Increased bottom padding: `pb-[64px]` → `pb-[80px]`
   - Ensures last message is fully visible without being cut off
   - No more manual scrolling required to see complete messages

6. **Interaction Model Changes:**
   - Removed click-to-progress requirement for `msa-result`, `short-payment-result`, `confirm-colleague`
   - Removed `cursor-pointer` styling and `onClick` handlers for these scenarios
   - Messages now auto-progress 600ms after typewriter completion
   - Retained manual interactions for `email-sent-result` and `alert-result`

**State Management Pattern:**
```javascript
// Prevent duplicate triggers
if (!triggeredMessages.has(idx)) {
  setTriggeredMessages(prev => new Set(prev).add(idx));
  setTimeout(() => onTrigger(), 600);
}
```

**User Experience Impact:**
- Demo flows more naturally without requiring clicks at multiple checkpoints
- Faster pacing keeps user engaged
- Clearer distinction between interactive and informational elements
- More reliable scrolling keeps focus on latest content
- Overall demo completion time reduced by approximately 30-40%

**Files Modified:**
- `src/imports/Reply.tsx` - Multiple functions and components (85 insertions, 25 deletions)

## State Management Patterns

### Demo Progression State

The application uses overlapping state management patterns to ensure reliable demo progression without duplicate triggers or animations:

**Message Tracking State:**
- `animatedMessages`: Set<number> - Tracks which messages have completed typewriter animation
- `triggeredMessages`: Set<number> - Prevents duplicate auto-progression triggers (added 2025-01-12)
- `textCompleted`: Record<number, boolean> - Tracks completion of message text for card display timing
- `afterTextCompleted`: Record<number, boolean> - Tracks completion of textAfterCard content
- `cardShown`: Record<number, boolean> - Tracks card visibility state

**Purpose:**
These overlapping state management patterns ensure:
1. Typewriter animation only runs once per message
2. Auto-progression triggers fire exactly once (critical for demo reliability)
3. Cards appear at correct timing after text completes
4. Re-renders don't cause duplicate animations or triggers
5. Hot reloads during development don't break demo flow

**Implementation Pattern:**
The `triggeredMessages` Set acts as a guard to prevent duplicate function calls:

```javascript
// Check if not already triggered before executing
if (!triggeredMessages.has(idx)) {
  setTriggeredMessages(prev => new Set(prev).add(idx));
  setTimeout(() => onTrigger(), 600);
}
```

**Trigger Locations:**
Multiple trigger points provide redundancy:
1. **Primary**: TypewriterText `onComplete` callback (most reliable)
2. **Fallback 1**: `handleTextComplete()` for messages without textAfterCard
3. **Fallback 2**: `handleAfterTextComplete()` for messages with textAfterCard
4. **Fallback 3**: useEffect watching `animatedMessages` for pre-animated messages

This multi-layered approach ensures demo progression even if one trigger path fails.

## Future Enhancement Opportunities

- **Backend Integration**: Connect to real ticket management API
- **Authentication**: Add user login and session management
- **Real-time Updates**: Implement WebSocket for live ticket updates
- **AI Integration**: Connect to actual LLM API for intelligent responses
- **Search & Filtering**: Add ticket search and advanced filtering options
- **Multi-language Support**: Internationalization for global support teams
- **Analytics Dashboard**: Add metrics and reporting for ticket resolution
- **Mobile Optimization**: Enhanced responsive design for tablet/mobile devices
