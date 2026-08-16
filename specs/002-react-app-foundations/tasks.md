---
description: "Task list for React App Foundations"
---

# Tasks: React App Foundations

**Input**: Design documents from `/specs/002-react-app-foundations/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Test tasks ARE included — the plan establishes a Vitest + RTL harness and `contracts/welcome-screen.md` defines an explicit Test Contract (WC-1, WC-2, WC-3), consistent with constitution Principle III.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Exact file paths are included in each task

## Path Conventions

- Vite project root is `src/` (per plan.md). All app paths below are relative to repo root and live under `src/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the React project inside `src/` and wire up the toolchain.

- [ ] T001 Initialize Vite + React + TypeScript project rooted at `src/` (create `src/package.json`, `src/vite.config.ts` with `root: '.'` served from `src/`, `src/tsconfig.json`, `src/index.html`, `src/main.tsx`, `src/App.tsx`)
- [ ] T002 Install runtime dependencies in `src/package.json`: `react`, `react-dom`, `lucide-react`, `@fontsource/plus-jakarta-sans`; and dev dependencies for token generation: `gray-matter`, `js-yaml`
- [ ] T003 [P] Install and configure Tailwind CSS + PostCSS (`src/tailwind.config.ts`, `src/postcss.config.js`, `src/styles/globals.css` with Tailwind layers)
- [ ] T004 [P] Configure Vitest + React Testing Library + jsdom (`src/vitest.config.ts` or `test` block in `vite.config.ts`, `src/test/setup.ts`, add `test` script to `src/package.json`)
- [x] T005 [P] Linter configured for React/TS. NOTE: the current create-vite template ships **oxlint** (`.oxlintrc.json`) and a `lint` script instead of ESLint/Prettier; kept as-is.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Design-token foundation and shared primitives that every screen depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T006 Create the token generator script `src/ui-kit/generate-tokens.mjs` that parses the YAML frontmatter of `src/ui-kit/DESIGN.md` (via `gray-matter` + `js-yaml`) and emits a typed `src/ui-kit/tokens.generated.ts` (colors, typography, rounded, spacing) per `data-model.md` DesignTokens entity; DESIGN.md stays the single source of truth. Add a `tokens` npm script and hook it as `predev`/`prebuild` in `src/package.json` so it re-runs on change
- [ ] T007 Run the generator and make the Tailwind theme in `src/tailwind.config.ts` **import** `tokens.generated.ts` (no hand-copied values) to map colors, fontFamily = Plus Jakarta Sans, fontSize/lineHeight/letterSpacing, borderRadius, spacing
- [ ] T008 Set base font + global styles in `src/styles/globals.css` (import Fontsource Plus Jakarta Sans, off-white background, `prefers-reduced-motion` base rule) and import it in `src/main.tsx`
- [ ] T009 [P] Create `Icon` primitive wrapping `lucide-react` in `src/ui-kit/components/Icon.tsx` (size/color bound to tokens)
- [x] T010 [P] Create `Button` primitive in `src/ui-kit/components/Button.tsx` (props `label`, `disabled`, `onClick`, `variant='primary'`; Teal primary with press/offset-shadow behavior; ignores `onClick` when disabled; exposes disabled state to assistive tech)

**Checkpoint**: Toolchain, tokens, and shared primitives ready — user stories can begin.

---

## Phase 3: User Story 1 - View the welcome screen (Priority: P1) 🎯 MVP

**Goal**: Render a Spanish welcome screen (title + message + primary action) that applies the DESIGN.md identity and is responsive across mobile/tablet/desktop.

**Independent Test**: Open the app in a browser; the title, welcome message, and "Jugar" action are all visible with design-system styling, and the layout stays centered/legible at mobile, tablet, and desktop widths.

### Tests for User Story 1

> Write these tests FIRST and ensure they FAIL before implementation.

- [x] T011 [P] [US1] Test that the welcome screen renders title, welcome message, and the "Jugar" action (WC-1) in `src/screens/__tests__/WelcomeScreen.test.tsx`

### Implementation for User Story 1

- [x] T012 [P] [US1] Create data-driven Spanish content in `src/content/welcome.ts` (`title`, `welcomeMessage`, `primaryActionLabel="Jugar"`, `comingSoonHint`) per `data-model.md` WelcomeContent entity
- [x] T013 [US1] Implement `WelcomeScreen` in `src/screens/WelcomeScreen.tsx` rendering title, message, primary action (via `Button`), optional decorative `Icon`, reading copy from `src/content/welcome.ts`
- [x] T014 [US1] Render `WelcomeScreen` from `src/App.tsx` as the sole view at `/`
- [x] T015 [US1] Apply responsive, centered layout using token-based Tailwind utilities in `src/screens/WelcomeScreen.tsx` (mobile/tablet/desktop; no overflow/clipping) (FR-008, WC-4)
- [x] T016 [US1] Ensure visual fidelity to `src/ui-kit/DESIGN.md` (palette, headline weight/letter-spacing, rounded shapes, ≥18px body) in `src/screens/WelcomeScreen.tsx` (FR-006, WC-6)

**Checkpoint**: Welcome screen is fully functional and independently testable (MVP).

---

## Phase 4: User Story 2 - Primary action as a preview of the game (Priority: P2)

**Goal**: The "Jugar" action is visible but disabled, clearly signals "coming soon", and is completely inert on interaction.

**Independent Test**: The "Jugar" button is visible and disabled; clicking/tapping it repeatedly causes no navigation, no error, and no state change.

### Tests for User Story 2

> Write these tests FIRST and ensure they FAIL before implementation.

- [x] T017 [P] [US2] Test that the "Jugar" action is disabled (WC-2) in `src/screens/__tests__/WelcomeScreen.test.tsx`
- [x] T018 [P] [US2] Test that clicking the disabled action triggers no handler/navigation and throws no error (WC-3) in `src/screens/__tests__/WelcomeScreen.test.tsx`

### Implementation for User Story 2

- [x] T019 [US2] Render the primary action as disabled with the `comingSoonHint` associated to it in `src/screens/WelcomeScreen.tsx` (FR-004; `disabled` + accessible state)
- [x] T020 [US2] Guarantee the action is inert when disabled in `src/ui-kit/components/Button.tsx` (no `onClick`/navigation while `disabled`) (FR-005, WC-3)

**Checkpoint**: Both user stories work independently; the disabled action preview is complete.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, reduced-motion, deployability, and final validation across stories.

- [x] T021 [P] Verify comfortable tap-target sizes (≥44px) and palette contrast for text on background across `src/ui-kit/components/Button.tsx` and `src/screens/WelcomeScreen.tsx` (FR-009, accessibility contract)
- [x] T022 [P] Honor `prefers-reduced-motion` for any decorative animation in `src/styles/globals.css` / `src/screens/WelcomeScreen.tsx` (WC-5)
- [x] T023 Verify static build + preview works (`npm run build` && `npm run preview` from `src/`) producing a deployable `dist/` (FR-011)
- [x] T024 Run `specs/002-react-app-foundations/quickstart.md` validation end-to-end and check off its success criteria

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Phase 5)**: Depends on desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Depends only on Foundational. Independently testable.
- **US2 (P2)**: Builds on the same `WelcomeScreen`/`Button` files as US1; logically extends US1 but is independently testable via disabled-state assertions. If done in parallel, coordinate edits to `WelcomeScreen.tsx` and `Button.tsx`.

### Within Each User Story

- Tests written first and failing → implementation.
- Tokens/primitives (Phase 2) before screen composition.

### Parallel Opportunities

- T003, T004, T005 (Setup) can run in parallel.
- T009, T010 (Foundational primitives) can run in parallel.
- T011 and T012 (US1) can run in parallel (different files).
- T017 and T018 (US2 tests) can run in parallel.

---

## Parallel Example: User Story 1

```bash
# US1 test + content can be created in parallel (different files):
Task: "Welcome screen render test in src/screens/__tests__/WelcomeScreen.test.tsx"
Task: "Spanish content module in src/content/welcome.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (tokens + primitives).
3. Complete Phase 3: User Story 1 (welcome screen renders).
4. **STOP and VALIDATE**: Test US1 independently; deploy/demo if ready.

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. US1 → welcome screen visible (MVP).
3. US2 → disabled "Jugar" preview + inert behavior.
4. Polish → accessibility, reduced-motion, static build validation.

---

## Notes

- [P] tasks = different files, no dependencies.
- US1 and US2 both touch `WelcomeScreen.tsx` and `Button.tsx`; sequence P1 → P2 to avoid conflicts unless coordinated.
- Verify tests fail before implementing.
- Commit after each task or logical group.
