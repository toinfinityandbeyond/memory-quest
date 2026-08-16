# Phase 0 Research: React App Foundations

All Technical Context items are resolved below. No open `NEEDS CLARIFICATION` remain.

## Decision 1: Build tooling — Vite + React + TypeScript

- **Decision**: Use Vite 5 with the React + TypeScript template, with the Vite `root` set to `src/`.
- **Rationale**: Vite gives fast dev startup, first-class React/TS support, and a simple static production build (`vite build`) that deploys anywhere (Netlify/Vercel/GitHub Pages), satisfying the constitution's static-deploy constraint. Setting `root: 'src'` honors the explicit request to initialize the project inside `src/` while keeping `index.html` and app code together.
- **Alternatives considered**:
  - **Create React App**: Deprecated/unmaintained, slower, heavier. Rejected.
  - **Next.js**: SSR/routing/server features are unneeded for a static single-screen SPA; adds complexity against Principle I. Rejected.

## Decision 2: Styling & design tokens — Tailwind CSS with tokens auto-generated from DESIGN.md

- **Decision**: Use Tailwind CSS 3. Instead of hand-copying values, a small Node script (`src/ui-kit/generate-tokens.mjs`) parses the YAML frontmatter of `src/ui-kit/DESIGN.md` (via `gray-matter` + `js-yaml`) and emits a typed `src/ui-kit/tokens.generated.ts`. `tailwind.config.ts` **imports** those generated tokens to extend the theme. The generator runs via a `tokens` npm script wired as `predev`/`prebuild`.
- **Rationale**: DESIGN.md is already structured as machine-readable tokens (colors, typography scale, `rounded`, `spacing`). Generating from it keeps **DESIGN.md as the single source of truth**, so when it changes the app re-syncs by re-running the generator — no manual duplication, no drift. This directly serves Principle II (maintainable) and IV (fidelity), and gives a reusable foundation (FR-006, FR-007) plus a typed module for non-class use cases (inline styles, JS-driven values).
- **Alternatives considered**:
  - **Hand-copying tokens into `tokens.ts`/Tailwind**: Simple initially but creates two sources of truth and visual drift when DESIGN.md changes. Rejected (this was the user's concern).
  - **Generated CSS variables (`tokens.css`)**: Also single-source and good for runtime theming, but less directly typed for TS/JS use and more indirect for Tailwind mapping. Kept as a possible complement, not the primary approach.
  - **CSS-in-JS (styled-components/emotion)**: Extra runtime cost and complexity for a token-driven design. Rejected.

## Decision 3: Icon library — lucide-react

- **Decision**: Use `lucide-react` for basic iconography (FR-013), wrapped by a small `ui-kit/components/Icon` primitive.
- **Rationale**: Lucide is lightweight, tree-shakeable, MIT-licensed, has a large set of clean, rounded, friendly icons that fit the "rounded/tactile" design language, and integrates trivially with React. A thin wrapper keeps icon usage consistent and swappable.
- **Alternatives considered**:
  - **react-icons**: Aggregates many packs but larger surface and inconsistent styles. Rejected for consistency.
  - **Font Awesome**: Heavier, licensing tiers for some icons. Rejected.
  - **Hand-crafted SVGs**: Violates FR-013's intent to avoid crafting individual assets. Rejected.

## Decision 4: Typography — Plus Jakarta Sans (self-hosted)

- **Decision**: Load Plus Jakarta Sans via `@fontsource/plus-jakarta-sans` (self-hosted) and set it as the base font family in the Tailwind theme and `globals.css`.
- **Rationale**: DESIGN.md mandates Plus Jakarta Sans exclusively. Self-hosting via Fontsource avoids a runtime dependency on Google's CDN, improves reliability/perf (SC-005), and keeps the build fully static.
- **Alternatives considered**:
  - **Google Fonts `<link>`**: Simpler but adds an external request and privacy/latency considerations. Acceptable fallback, not preferred.

## Decision 5: Testing harness — Vitest + React Testing Library

- **Decision**: Configure Vitest with jsdom and React Testing Library; add render/behavior tests for the welcome screen.
- **Rationale**: Vitest shares Vite's config/transform pipeline (fast, zero extra bundler config). RTL enables user-centric assertions (title/message visible, "Jugar" disabled and inert). This establishes the harness the constitution requires for future game-logic tests (Principle III) even though no game logic exists yet.
- **Alternatives considered**:
  - **Jest**: Requires separate transform setup with Vite/TS; more config overhead. Rejected.

## Decision 6: Welcome content is data-driven

- **Decision**: Store the Spanish welcome copy (title, message, primary action label, "coming soon" hint) in `src/content/welcome.ts`, separate from the component.
- **Rationale**: Principle II (maintainable personalization) — copy can change without touching component/logic. Keeps FR-003 (Spanish) content in one place.
- **Alternatives considered**:
  - **Hardcoding strings in JSX**: Simpler but couples content to code, against Principle II. Rejected.

## Decision 7: Deployment target

- **Decision**: Produce a static build (`vite build` → `dist/`) deployable to Netlify/Vercel/GitHub Pages. No deploy provider is committed to in this phase.
- **Rationale**: Satisfies FR-011 and the constitution's shareability constraint without locking into a provider.
- **Alternatives considered**: Committing to a single provider now — premature; deferred until sharing is actually needed.
