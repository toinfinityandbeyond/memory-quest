# Phase 1 Data Model: React App Foundations

This phase has **no persistent data** and **no domain entities**. The "data" here is static, versioned configuration: design tokens and welcome-screen content. Both are modeled as typed, in-repo modules to honor Principle II (maintainable personalization) and Principle IV (design fidelity).

## Entity: DesignTokens

Typed representation of the values in `src/ui-kit/DESIGN.md`. **`DESIGN.md` is the single source of truth**; `src/ui-kit/tokens.generated.ts` is auto-generated from its frontmatter by `src/ui-kit/generate-tokens.mjs` and imported by the Tailwind theme (`tailwind.config.ts`). Do not edit the generated file by hand; re-run the `tokens` npm script after changing DESIGN.md.

| Group | Field | Type | Source (DESIGN.md) | Notes |
|-------|-------|------|--------------------|-------|
| colors | `surface`, `background`, `primary`, `on-primary`, `secondary`, `tertiary`, `error`, ...  | string (hex) | `colors:` map | Full palette mapped 1:1 |
| typography | `headline-xl`, `headline-lg`, `headline-lg-mobile`, `body-md`, `label-bold`, `card-number` | `{ fontFamily, fontSize, fontWeight, lineHeight, letterSpacing? }` | `typography:` map | Base family = Plus Jakarta Sans |
| rounded | `sm`, `DEFAULT`, `md`, `lg`, `xl`, `full` | string (rem/px) | `rounded:` map | Corner radii |
| spacing | `base`, `card-gap`, `section-padding`, `container-max` | string (px) | `spacing:` map | 8px base unit |

**Validation rules**:
- Every color used by components MUST come from this token set (no ad-hoc hex values).
- Font family MUST resolve to Plus Jakarta Sans.
- Generated values MUST match DESIGN.md exactly (the generator guarantees this); any intentional deviation is documented (Principle IV).
- The generated token file MUST NOT be edited manually; changes go into DESIGN.md and are re-generated.

**State transitions**: None (static configuration).

## Entity: WelcomeContent

Spanish, data-driven copy for the welcome screen, stored in `src/content/welcome.ts`.

| Field | Type | Example (Spanish) | Requirement |
|-------|------|-------------------|-------------|
| `title` | string | "Juego de Memoria" | FR-002, FR-003 |
| `welcomeMessage` | string | "¡Hola! ¿List@ para poner a prueba tu memoria?" | FR-002, FR-003 |
| `primaryActionLabel` | string | "Jugar" | FR-004, FR-003 |
| `comingSoonHint` | string | "Muy pronto…" | FR-004 (disabled hint) |

**Validation rules**:
- All strings MUST be non-empty and in Spanish (FR-003).
- `primaryActionLabel` renders on a **disabled** control (FR-004); no navigation target is stored because the action is inert this phase (FR-005).

**State transitions**: None (static content).

## Non-goals (explicitly out of data model this phase)

- No user/profile entities (FR-010).
- No game state, cards, scores, or persistence (future phases).
- No routing/navigation model (out of scope per spec Assumptions).
