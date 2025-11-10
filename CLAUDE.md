# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite application for an agent help desk interface (Xelix Connect), originally designed in Figma. The project uses React 18.3+ with TypeScript and is styled with Tailwind CSS.

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
