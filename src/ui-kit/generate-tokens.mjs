// Generates src/ui-kit/tokens.generated.ts from the YAML frontmatter of DESIGN.md.
// DESIGN.md is the SINGLE SOURCE OF TRUTH. Do not edit tokens.generated.ts by hand.
// Run with: npm run tokens
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const designPath = path.join(__dirname, 'DESIGN.md');
const outPath = path.join(__dirname, 'tokens.generated.ts');

const raw = fs.readFileSync(designPath, 'utf8');
const { data } = matter(raw);

const colors = data.colors ?? {};
const rounded = data.rounded ?? {};
const spacingRaw = data.spacing ?? {};
const typography = data.typography ?? {};

// Corner radii -> Tailwind borderRadius
const borderRadius = { ...rounded };

// Semantic spacing tokens -> Tailwind spacing (available as p-base, gap-card-gap, etc.)
const spacing = {};
for (const [k, v] of Object.entries(spacingRaw)) spacing[k] = String(v);

// Base font family (DESIGN.md uses Plus Jakarta Sans exclusively)
const primaryFamily =
  typography['body-md']?.fontFamily ||
  Object.values(typography).find((t) => t?.fontFamily)?.fontFamily ||
  'Plus Jakarta Sans';
const fontFamily = {
  sans: [primaryFamily, 'ui-sans-serif', 'system-ui', 'sans-serif'],
};

// Typography scale -> Tailwind fontSize with per-step lineHeight/letterSpacing/fontWeight
const fontSize = {};
for (const [name, t] of Object.entries(typography)) {
  if (!t?.fontSize) continue;
  const opts = {};
  if (t.lineHeight != null) opts.lineHeight = String(t.lineHeight);
  if (t.letterSpacing != null) opts.letterSpacing = String(t.letterSpacing);
  if (t.fontWeight != null) opts.fontWeight = String(t.fontWeight);
  fontSize[name] = [String(t.fontSize), opts];
}

const banner =
  '// AUTO-GENERATED from DESIGN.md by src/ui-kit/generate-tokens.mjs.\n' +
  '// Do NOT edit by hand. Change DESIGN.md and run `npm run tokens`.\n';

const j = (v) => JSON.stringify(v, null, 2);

const body =
  banner +
  '\n' +
  `export const colors = ${j(colors)} as const;\n\n` +
  `export const borderRadius = ${j(borderRadius)} as const;\n\n` +
  `export const spacing = ${j(spacing)} as const;\n\n` +
  `export const fontFamily = ${j(fontFamily)} as const;\n\n` +
  `export const fontSize = ${j(fontSize)} as const;\n\n` +
  'export const tokens = { colors, borderRadius, spacing, fontFamily, fontSize } as const;\n\n' +
  'export type Tokens = typeof tokens;\n';

fs.writeFileSync(outPath, body, 'utf8');
console.log('Generated ' + path.relative(process.cwd(), outPath));
