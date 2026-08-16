import type { Config } from 'tailwindcss';
import {
  colors,
  borderRadius,
  spacing,
  fontFamily,
  fontSize,
} from './src/ui-kit/tokens.generated';

// Theme values come from DESIGN.md via tokens.generated.ts (single source of truth).
// Regenerate with `npm run tokens` after editing DESIGN.md.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors,
      borderRadius,
      spacing,
      fontFamily: fontFamily as unknown as Record<string, string[]>,
      fontSize: fontSize as unknown as Config['theme'],
    },
  },
  plugins: [],
} satisfies Config;
