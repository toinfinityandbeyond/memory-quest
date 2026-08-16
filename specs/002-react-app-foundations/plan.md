# Implementation Plan: React App Foundations

**Branch**: `002-react-app-foundations` | **Date**: 2026-08-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-react-app-foundations/spec.md`

## Summary

Bootstrap the memory game as a React single-page application initialized inside the `src/` folder, with no backend and no user management. This phase delivers a single Spanish-language welcome screen that applies the visual identity from `src/ui-kit/DESIGN.md`, exposes the design tokens (colors, typography, spacing, radii) as a reusable foundation, includes an icon library for basic iconography, and shows a visible-but-disabled "Jugar" primary action as a preview of the game. The app must build to a shareable static bundle. A testing harness is set up so future game-logic work can meet the constitution's testing requirement.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x

**Primary Dependencies**: Vite 5 (build/dev server), Tailwind CSS 3 (design tokens + styling), lucide-react (icon library), Plus Jakarta Sans (web font, self-hosted via @fontsource or Google Fonts); dev: gray-matter + js-yaml (parse DESIGN.md frontmatter for token generation)

**Storage**: N/A (no persistence this phase; static content lives in a versioned data file)

**Testing**: Vitest + React Testing Library + jsdom (harness established for future game logic; welcome-screen render/behavior tests included)

**Target Platform**: Modern evergreen browsers (desktop + mobile), delivered as a static build

**Project Type**: Single-page web application (frontend only)

**Performance Goals**: Welcome screen interactive in under 3s on a typical home connection (SC-005); no perceptible layout jank on mobile/tablet/desktop

**Constraints**: No mandatory backend; static build deployable to Netlify/Vercel/GitHub Pages; respect `prefers-reduced-motion`; minimum comfortable tap targets for children

**Scale/Scope**: 1 screen (welcome), reusable design-token layer, icon set; foundation for future game screens

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Simplicidad y Diversión Primero**: PASS — A single, fast welcome screen with clear intent; no gratuitous complexity. Static build keeps load times low.
- **II. Personalización Real y Mantenible**: PASS — Welcome screen copy (title, message, button label) and design tokens are kept in versioned data/config files, separate from component logic, so content can change without touching game logic.
- **III. Calidad de Código y Pruebas**: PASS — No game logic exists in this phase, so no game-logic tests are strictly required; however a testing harness (Vitest + RTL) is established and the welcome screen gets render/behavior tests, satisfying the spirit and unblocking future logic tests.
- **IV. Fidelidad al Diseño (Google Stitch / DESIGN.md)**: PASS — Design tokens are **generated automatically** from `src/ui-kit/DESIGN.md` (single source of truth) into `tokens.generated.ts`, which the Tailwind theme imports; re-running the generator keeps the app in sync whenever DESIGN.md changes, eliminating visual drift.
- **V. Accesibilidad para Niños**: PASS — Large tap targets, high contrast per palette, no long text required, reduced-motion respected.
- **Technical Constraints (Stack/Deploy)**: PASS — React + static build, no backend, deployable to Netlify/Vercel/GitHub Pages.

**Result**: No violations. Complexity Tracking not required.

## Project Structure

### Documentation (this feature)

```text
specs/002-react-app-foundations/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── welcome-screen.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

The React project is initialized inside the existing `src/` folder (Vite `root = src`). The existing `src/ui-kit/DESIGN.md` remains the design source of truth and is joined by generated token modules.

```text
src/                          # Vite project root
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts        # imports tokens.generated.ts into the Tailwind theme
├── postcss.config.js
├── index.html                # app entry (Vite root index)
├── public/                   # static assets served as-is
├── main.tsx                  # React bootstrap
├── App.tsx                   # app shell, renders the welcome screen
├── styles/
│   └── globals.css           # Tailwind layers + base font + CSS variables
├── ui-kit/
│   ├── DESIGN.md             # existing design reference — SINGLE SOURCE OF TRUTH
│   ├── generate-tokens.mjs   # parses DESIGN.md frontmatter → tokens.generated.ts
│   ├── tokens.generated.ts   # AUTO-GENERATED typed tokens (do not edit by hand)
│   └── components/           # reusable primitives (e.g., Button, Icon)
├── screens/
│   └── WelcomeScreen.tsx     # the welcome screen
├── content/
│   └── welcome.ts            # Spanish copy for the welcome screen (data-driven)
└── screens/__tests__/
    └── WelcomeScreen.test.tsx
```

**Structure Decision**: Single frontend SPA with the Vite project root set to `src/` per the explicit request to initialize the project inside `src`. App source lives directly under `src/` (no nested `src/src`), keeping `src/ui-kit` as the design foundation. Content is isolated in `content/`; design tokens are **generated from `DESIGN.md`** into `ui-kit/tokens.generated.ts` (imported by `tailwind.config.ts`), so `DESIGN.md` remains the single source of truth and the process is repeatable when it changes — honoring Principle II (maintainable personalization) and IV (design fidelity). The generator runs via a `tokens` npm script wired as `predev`/`prebuild`.

## Complexity Tracking

> No constitution violations; section intentionally empty.
