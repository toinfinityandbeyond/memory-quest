# Quickstart & Validation: React App Foundations

This guide validates that the foundations work end-to-end. Commands assume the Vite project root is `src/` (per the plan). Adjust the working directory to `src/` when running npm scripts.

## Prerequisites

- Node.js 18+ and npm.
- Repository cloned; working directory at repo root `memory-game/`.

## Setup

From the `src/` project root:

```bash
# install dependencies (React, Vite, Tailwind, lucide-react, testing libs, Fontsource)
npm install
```

Reference: dependencies and stack rationale are in [research.md](./research.md); token/content modules are in [data-model.md](./data-model.md).

## Run the app (dev)

```bash
npm run dev
```

**Expected**: Dev server starts; opening the printed URL shows the welcome screen with:
- Spanish title and welcome message (from `content/welcome.ts`).
- A visible **"Jugar"** button that is **disabled** with a "coming soon" hint.
- Design-system styling (Plus Jakarta Sans, DESIGN.md palette, rounded shapes).

Validate against the behavior table in [contracts/welcome-screen.md](./contracts/welcome-screen.md) (WC-1, WC-2, WC-6).

## Validate responsiveness (manual)

Resize the browser / use device emulation at mobile, tablet, and desktop widths.

**Expected**: Content stays centered and legible, no overflow or clipping (WC-4, SC-002).

## Validate disabled action (manual)

Click/tap "Jugar" several times.

**Expected**: Nothing navigates, no console errors, screen unchanged (WC-3, SC-006).

## Run tests

```bash
npm run test
```

**Expected**: Welcome-screen tests pass, covering WC-1 (title/message/action visible), WC-2 (action disabled), WC-3 (disabled action is inert). See the Test Contract in [contracts/welcome-screen.md](./contracts/welcome-screen.md).

## Build the static bundle

```bash
npm run build
npm run preview
```

**Expected**: `vite build` produces a static `dist/` bundle; `preview` serves it and the welcome screen renders identically to dev. This confirms the app is deployable to Netlify/Vercel/GitHub Pages (FR-011).

## Success check (maps to spec)

- [ ] Welcome screen renders with title, message, and disabled "Jugar" (SC-001, FR-001/002/004)
- [ ] Visual identity matches DESIGN.md (SC-004, FR-006/007)
- [ ] Responsive on 3 widths (SC-002, FR-008)
- [ ] Disabled action is inert (SC-006, FR-005)
- [ ] Icon library available and used for basic icons (FR-013)
- [ ] Static build succeeds and previews correctly (FR-011)
