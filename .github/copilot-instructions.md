# Copilot Instructions for Portfolio

## Build, Test & Lint

### Prerequisites
- Node.js 24 LTS required
- npm installed with Node.js

### Commands
```bash
npm install          # Install dependencies (required after cloning)
npm run dev          # Start Vite dev server on http://localhost:5173
npm run build        # Production build → dist/ folder
npm run lint         # Run OxLint for code quality checks
npm run preview      # Preview production build locally
```

**Important**: When running commands from this worktree, you may need to set the PATH to include Node.js:
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
```

## Architecture

This is a single-page React portfolio with client-side routing (hash-based navigation). 

**Key structure:**
- **Single component (`App.jsx`)** - Handles all routing and page states using `useSyncExternalStore` to sync with `window.location.hash`
- **No separate pages/routing library** - Routes are determined by hash: `#/about`, `#/portfolio`, `#/portfolio/{style}`
- **Static content** - All projects, copy, and descriptions live in the `projects` array in App.jsx; no CMS or database
- **React 19** - Uses latest React, so leverage modern patterns (no class components)

**Page states:**
1. **Home** (default hash or `#home`) - Hero section with intro and call-to-action
2. **About** (`#/about`) - Personal introduction page
3. **Portfolio list** (`#/portfolio`) - Grid of all projects
4. **Project detail** (`#/portfolio/{style}`) - Individual project overview, goal, process, and learning

## Key Conventions

### Design System
- **Colors** (defined in `:root` in `index.css`):
  - `--green: #315c44` (primary accent; used for buttons, links, highlights)
  - `--muted: #72786c` (secondary text, description copy)
  - `--line: #dfe1d8` (borders and dividers)
  - `background: #faf9f6` (warm off-white)
  
- **Typography**:
  - Font stack: `Pretendard`, system fonts (optimized for CJK languages)
  - Sizes use `clamp()` for responsive scaling (e.g., `clamp(36px, 4.1vw, 57px)`)
  - No separate font files; relies on system/web-safe fonts

- **Spacing**:
  - Container max-width: `1160px` with padding; applied via `.page-width` utility
  - Responsive padding: `calc(100% - 96px)` for mobile compatibility

### Component Patterns
- **Navigation state** - Use `useSyncExternalStore` to sync React with browser hash changes (see App.jsx)
- **Accessibility** - Each major section has semantic HTML (`<section>`, `<article>`) with `aria-labelledby` and `aria-current`
- **Focus management** - `tabIndex={-1}` on headings so headings can receive focus programmatically when navigating to new pages
- **Reduced motion** - Respect `prefers-reduced-motion: reduce` media query (see index.css)

### Project Data Structure
Projects are objects in the `projects` array with:
- `number`: "01", "02", "03" (display order)
- `category`: String like "WEB · 웹사이트" (Korean labels preferred)
- `title`: Project name
- `description`: Short 1-line summary
- `style`: "website", "idea", or "creative" (determines visual design in `ProjectArtwork`)
- `overview`, `goal`, `process` (array), `learning`: Details shown on project detail page

### Styling Conventions
- **CSS-only components** - Use semantic HTML with CSS for styling; no component libraries
- **Grid layouts** - Use CSS Grid for multi-column layouts (e.g., `.project-grid` uses `grid-template-columns: repeat(3, 1fr)`)
- **Transform for animations** - Hover states use `transform: translateY()` for subtle lift effects
- **Z-index management** - Sticky header uses `z-index: 10`; overlays and floating elements have higher z-index as needed
- **Isolation** - Use `isolation: isolate` on containers that have positioned children to control stacking context

### HTML Structure
- Use semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Skip links included for accessibility (`.skip-link` to jump to `#main`)
- Always include `aria-label`, `aria-labelledby`, `aria-current` for navigation and dynamic content
- Button text should be descriptive; use `<span aria-hidden="true">` for icon-only content

## Common Edits

**To update personal information:**
- Header logo and footer: Change `최호인` references in App.jsx (wordmark, footer)
- Home hero text: Edit the `<h1>` and description in the hero section
- Browser tab title: Update document.title logic in the useEffect

**To add/edit projects:**
- Add a new object to the `projects` array with the required fields
- Update the `ProjectArtwork` component if you add a new `style` category
- Edit corresponding CSS classes for new `style` values

**To modify colors:**
- Update CSS variables in `index.css` `:root`
- All color references use `var(--green)`, `var(--muted)`, `var(--line)` for consistency

**To adjust layout/spacing:**
- Container width and padding: `.page-width` in App.css
- Section padding: Add to relevant `padding-block` values
- Responsive breakpoints: Use `clamp()` for fluid scaling (no fixed media queries currently)
