---
name: Vibrant Memory
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3c4a46'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6b7a76'
  outline-variant: '#bacac5'
  surface-tint: '#006b5f'
  primary: '#006b5f'
  on-primary: '#ffffff'
  primary-container: '#2dd4bf'
  on-primary-container: '#00574d'
  inverse-primary: '#3cddc7'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed01b'
  on-secondary-container: '#6f5900'
  tertiary: '#842bd2'
  on-tertiary: '#ffffff'
  tertiary-container: '#d7acff'
  on-tertiary-container: '#7003bf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#62fae3'
  primary-fixed-dim: '#3cddc7'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#ffe083'
  secondary-fixed-dim: '#eec200'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#f0dbff'
  tertiary-fixed-dim: '#ddb7ff'
  on-tertiary-fixed: '#2c0051'
  on-tertiary-fixed-variant: '#6900b3'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
  card-number:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  card-gap: 16px
  section-padding: 32px
  container-max: 1200px
---

## Brand & Style
The design system is centered on a "Sophisticated Play" narrative, specifically tailored for 10-year-olds who have outgrown "toddler" aesthetics but still crave tactile, energetic, and rewarding interfaces. The personality is inclusive, gender-neutral, and high-energy, avoiding overly bright primary colors in favor of a modern, curated palette.

The visual style blends **Minimalism** with **Tactile** elements. We utilize generous whitespace to maintain focus on memory tasks, while using "squishy" physical metaphors—soft shadows and subtle inner glows—to make digital cards and buttons feel like physical objects. The goal is to evoke a sense of curiosity, achievement, and rhythmic flow.

## Colors
The palette is a vibrant four-color system designed to be energetic yet balanced.
- **Primary (Teal):** Used for main actions, success states, and progress indicators.
- **Secondary (Sunny Yellow):** Used for highlights, stars, and "unlocked" notifications.
- **Tertiary (Soft Purple):** Used for secondary interactions and background accents to provide depth.
- **Quaternary (Coral):** Reserved for urgent feedback, energy meters, or distinct card categories.
- **Neutral (Slate):** Used for legible text and subtle borders, ensuring the vibrant colors remain the focus.

The background should remain a very soft, off-white (e.g., `#F8FAFC`) to allow the colored components to pop without causing eye strain during extended play.

## Typography
This design system uses **Plus Jakarta Sans** exclusively to maintain a cohesive, friendly, and contemporary look. The typeface’s open apertures and soft curves provide high legibility for young readers while feeling modern.

Headlines use a heavy weight (Bold/ExtraBold) with slight negative letter spacing to create a "sticker-like" impactful feel. Body text is kept at a comfortable 18px minimum to ensure ease of reading during fast-paced gameplay. All labels and buttons use uppercase or bold weights to stand out against vibrant background colors.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a focus on center-aligned game boards. 
- **Desktop:** A 12-column grid with 24px gutters. The game board typically occupies the central 8 columns.
- **Tablet:** An 8-column grid with 16px gutters.
- **Mobile:** A 4-column grid with 16px gutters. 

Spacing is based on an 8px base unit. Card grids should use a responsive "auto-fit" approach, ensuring cards remain large enough for easy tapping (minimum 80px on mobile). Padding within containers is generous (32px+) to prevent the UI from feeling cluttered or overwhelming.

## Elevation & Depth
Depth is communicated through **Ambient Shadows** and **Tonal Layering**. 
- **Resting State:** Components like game cards use a soft, multi-layered shadow with a subtle tint of the primary color to feel lifted.
- **Pressed State:** Elements shift downward (Y-axis) and shadows shrink, simulating a physical button press.
- **Locked Content:** Use a low-contrast "sunken" effect (inner shadow) and 40% opacity to indicate the content is currently part of the "background" of the experience.
- **Success States:** Feedback modals use a "High-Gloss" approach with a subtle white inner-stroke (1px) at the top to simulate light hitting a plastic surface.

## Shapes
The shape language is consistently **Rounded** (0.5rem base). This provides a safe, friendly feel without the "infantile" appearance of fully circular (pill) buttons. 
- **Standard Cards:** 1rem (rounded-lg) for a chunky, collectible feel.
- **Action Buttons:** 0.5rem (base) to maintain a sense of precision.
- **Modals & Overlays:** 1.5rem (rounded-xl) to frame the content softly against the game board.

## Components
- **Game Cards:** Cards feature a neutral "back" with a geometric pattern and a vibrant "front" when flipped. Successful matches trigger a subtle "pulse" animation.
- **Buttons:** Primary buttons use the Teal color with a 4px bottom-offset shadow that disappears on click (the "push" effect). 
- **Locked States:** Items appear in grayscale or 40% opacity with a small "Padlock" icon in the center. Use a dashed border to indicate a "slot" that needs to be filled.
- **Unlocked Feedback:** When an item is unlocked, use the Secondary (Yellow) color and a "Star Burst" particle effect.
- **Progress Bars:** Use a thick, rounded track in a light neutral, with a Primary (Teal) fill that features a subtle diagonal stripe pattern for texture.
- **Chips/Badges:** Small, high-contrast pills used for level counters (e.g., "Level 05") or timers.
- **Success Modals:** Large, center-screen overlays with bold headlines and celebratory "Play Again" primary buttons.