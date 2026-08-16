# UI Contract: Welcome Screen

This is the UI contract for the application's single screen in this phase. It defines the observable behavior and structure that the implementation and tests must satisfy. It is technology-agnostic at the behavior level; component names below are the intended implementation.

## Route / Entry

- The application entry (`/`) renders the **Welcome Screen** as the sole view.
- No navigation to other screens exists this phase.

## Rendered Structure (observable)

The Welcome Screen MUST render, all simultaneously visible on first paint:

1. **Game title** — text from `WelcomeContent.title`. Styled with a headline token; heavy weight per DESIGN.md.
2. **Welcome message** — text from `WelcomeContent.welcomeMessage`. Body token, ≥18px.
3. **Primary action ("Jugar")** — a button labeled `WelcomeContent.primaryActionLabel`.
4. **Coming-soon hint** — text/affordance from `WelcomeContent.comingSoonHint`, associated with the primary action.
5. (Optional) **Decorative icon(s)** from the icon library (lucide-react) to reinforce the playful identity.

## Behavior Contract

| ID | Given | When | Then |
|----|-------|------|------|
| WC-1 | App loaded at `/` | The page renders | Title, welcome message, and primary action are all visible (maps FR-001, FR-002, SC-001) |
| WC-2 | Welcome screen visible | User inspects the primary action | The action is present but **disabled** (`disabled` / `aria-disabled="true"`) and conveys "coming soon" (FR-004) |
| WC-3 | Disabled primary action | User clicks/taps it repeatedly | No navigation occurs, no error is thrown, screen state is unchanged (FR-005, SC-006) |
| WC-4 | Any supported viewport (mobile/tablet/desktop) | Screen renders | Content stays centered, legible, no overflow/clipping (FR-008, SC-002) |
| WC-5 | User has `prefers-reduced-motion: reduce` | Screen renders | Decorative animations are disabled/reduced (Edge case: reduced motion) |
| WC-6 | Rendered UI | Inspect styling | Colors, typography, radii come from DESIGN.md tokens (FR-006, SC-004) |

## Accessibility Contract

- Primary action MUST expose its disabled state to assistive tech (`disabled` attribute; `aria-disabled` acceptable if a non-native control is used).
- Interactive target size MUST be comfortable for children (≥44px touch target; card/button minimums per DESIGN.md) (FR-009).
- Color contrast MUST meet legibility using the DESIGN.md palette (text on background).
- All user-facing text is in Spanish (FR-003).

## Component Interface (intended implementation)

`WelcomeScreen` — no props; reads copy from `content/welcome.ts`.

`ui-kit/components/Button` — props:
- `label: string`
- `disabled?: boolean` (default `false`)
- `onClick?: () => void` (ignored when `disabled`)
- `variant?: 'primary'` (primary = Teal per DESIGN.md, with press/offset shadow behavior)

`ui-kit/components/Icon` — thin wrapper over lucide-react:
- `name` (lucide icon component) and standard size/color props bound to tokens.

## Test Contract (Vitest + RTL)

Tests in `src/screens/__tests__/WelcomeScreen.test.tsx` MUST verify at least:
- WC-1: title, message, and "Jugar" action are in the document.
- WC-2: the "Jugar" action is disabled.
- WC-3: clicking the disabled action does not throw and triggers no handler/navigation.
