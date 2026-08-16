// AUTO-GENERATED from DESIGN.md by src/ui-kit/generate-tokens.mjs.
// Do NOT edit by hand. Change DESIGN.md and run `npm run tokens`.

export const colors = {
  "surface": "#f8f9ff",
  "surface-dim": "#cbdbf5",
  "surface-bright": "#f8f9ff",
  "surface-container-lowest": "#ffffff",
  "surface-container-low": "#eff4ff",
  "surface-container": "#e5eeff",
  "surface-container-high": "#dce9ff",
  "surface-container-highest": "#d3e4fe",
  "on-surface": "#0b1c30",
  "on-surface-variant": "#3c4a46",
  "inverse-surface": "#213145",
  "inverse-on-surface": "#eaf1ff",
  "outline": "#6b7a76",
  "outline-variant": "#bacac5",
  "surface-tint": "#006b5f",
  "primary": "#006b5f",
  "on-primary": "#ffffff",
  "primary-container": "#2dd4bf",
  "on-primary-container": "#00574d",
  "inverse-primary": "#3cddc7",
  "secondary": "#735c00",
  "on-secondary": "#ffffff",
  "secondary-container": "#fed01b",
  "on-secondary-container": "#6f5900",
  "tertiary": "#842bd2",
  "on-tertiary": "#ffffff",
  "tertiary-container": "#d7acff",
  "on-tertiary-container": "#7003bf",
  "error": "#ba1a1a",
  "on-error": "#ffffff",
  "error-container": "#ffdad6",
  "on-error-container": "#93000a",
  "primary-fixed": "#62fae3",
  "primary-fixed-dim": "#3cddc7",
  "on-primary-fixed": "#00201c",
  "on-primary-fixed-variant": "#005047",
  "secondary-fixed": "#ffe083",
  "secondary-fixed-dim": "#eec200",
  "on-secondary-fixed": "#231b00",
  "on-secondary-fixed-variant": "#574500",
  "tertiary-fixed": "#f0dbff",
  "tertiary-fixed-dim": "#ddb7ff",
  "on-tertiary-fixed": "#2c0051",
  "on-tertiary-fixed-variant": "#6900b3",
  "background": "#f8f9ff",
  "on-background": "#0b1c30",
  "surface-variant": "#d3e4fe"
} as const;

export const borderRadius = {
  "sm": "0.25rem",
  "DEFAULT": "0.5rem",
  "md": "0.75rem",
  "lg": "1rem",
  "xl": "1.5rem",
  "full": "9999px"
} as const;

export const spacing = {
  "base": "8px",
  "card-gap": "16px",
  "section-padding": "32px",
  "container-max": "1200px"
} as const;

export const fontFamily = {
  "sans": [
    "Plus Jakarta Sans",
    "ui-sans-serif",
    "system-ui",
    "sans-serif"
  ]
} as const;

export const fontSize = {
  "headline-xl": [
    "48px",
    {
      "lineHeight": "56px",
      "letterSpacing": "-0.02em",
      "fontWeight": "800"
    }
  ],
  "headline-lg": [
    "32px",
    {
      "lineHeight": "40px",
      "fontWeight": "700"
    }
  ],
  "headline-lg-mobile": [
    "28px",
    {
      "lineHeight": "36px",
      "fontWeight": "700"
    }
  ],
  "body-md": [
    "18px",
    {
      "lineHeight": "28px",
      "fontWeight": "500"
    }
  ],
  "label-bold": [
    "14px",
    {
      "lineHeight": "20px",
      "letterSpacing": "0.05em",
      "fontWeight": "700"
    }
  ],
  "card-number": [
    "24px",
    {
      "lineHeight": "24px",
      "fontWeight": "800"
    }
  ]
} as const;

export const tokens = { colors, borderRadius, spacing, fontFamily, fontSize } as const;

export type Tokens = typeof tokens;
