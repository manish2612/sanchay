---
name: wizard-graphic-generator
description: Generates consistent, theme-aware inline SVG React components for Form Wizard headers based on minimal keywords.
---

# Wizard Graphic Generator Guidelines

When the user asks you to generate a graphic header for a form or wizard, you must create a React SVG component that strictly follows this specific illustration style and theming strategy.

## 1. Illustration Style & Composition
- **Line Art Only**: The graphic must be constructed using strokes (`fill="none"`, `stroke-width="1.5"` or `2`). Do not use heavy filled shapes unless specifically needed for tiny accents (like the tip of a pencil).
- **Base / Anchor Canvas**: Automatically generate a subtle, grey base shape to anchor the illustration (e.g., a monitor, a clipboard, a browser window, a folder, or a document) in the background layer, unless the user explicitly specifies an alternative.
- **Primary Foreground Element**: The main subject (derived from the primary functionality keyword) MUST be perfectly centered over the Base Canvas and scaled proportionally so it fits nicely inside/overlapping the base without overpowering it (roughly 1/3 the width of the base). This element will be colored with the primary theme color.
- **Decorative Floating Elements**: Surround the composition with 3-5 subtle abstract elements (e.g., sparkles, dots, floating geometric shapes, squiggles, rulers). If the user doesn't provide enough secondary keywords, invent relevant abstract accents.

## 2. Theme Token Integration (Crucial)
The SVG must automatically adapt to the app's theme using Tailwind CSS utility classes. **Do not use raw CSS variables like `stroke="var(--primary)"` because they may be raw HSL values that the browser cannot parse directly.** Instead, strictly apply Tailwind classes:

- **Background Grey Elements**: Wrap all abstract/decorative background shapes in a group tag:
  `<g className="text-muted-foreground stroke-muted-foreground/30 opacity-30" stroke="currentColor" strokeWidth={1.5} fill="none">`
- **Foreground Colored Elements**: Wrap the main/primary subject in a group tag:
  `<g className="stroke-primary fill-background" strokeWidth={2}>`
- For filled colored accents inside the foreground element, you must use standard Tailwind classes like `className="fill-primary"`.

## 3. Component Structure & Organization
- **File Organization**: Graphics are feature-specific UI elements. When generating a graphic for a form wizard step, ALWAYS save it in a `graphics/` or `icons/` subdirectory within that feature's `components/` folder. For example, if the step is at `apps/web/app/company/new/components/CompanyProfileStep.tsx`, save the graphic at `apps/web/app/company/new/components/graphics/CompanyProfileGraphic.tsx`.
- **Props**: Export a functional React component that accepts an optional `primaryOffset?: { x: number, y: number }` prop. Apply this offset as a `transform="translate(x, y)"` to the Primary Foreground `<g>` element so the consumer can fine-tune its position.
- Use `viewBox="0 0 140 80"` to provide enough horizontal canvas space for the floating elements.
- Accept standard SVG props (like `className`) so the parent can scale it if necessary.

### Example Template
\`\`\`tsx
import React from "react";

export const ExampleGraphic = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 140 80" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    {...props}
  >
    {/* BACKGROUND GREY ELEMENTS */}
    <g stroke="currentColor" strokeWidth={1.5} opacity={0.3} color="var(--fg)">
      {/* Decorative floating elements */}
      <rect x={110} y={24} width={12} height={32} rx={2} ry={2}/>
      <line x1={110} y1={30} x2={114} y2={30}/>
      <circle cx={28} cy={18} r={3}/>
      <path d="M 18 36 Q 24 28 28 38 T 34 32" strokeWidth={1.2}/>
    </g>

    {/* FOREGROUND COLORED ELEMENT */}
    <g stroke="var(--primary)" strokeWidth={2} fill="var(--surface)">
      {/* Document */}
      <rect x={54} y={8} width={32} height={42} rx={2} ry={2}/>
      {/* Pencil overlaid on right side */}
      <path d="M 76 28 L 92 12 A 2.828 2.828 0 1 1 96 16 L 80 32 Z" fill="var(--bg)"/>
      <path d="M 76 28 L 72 36 L 80 32" fill="var(--primary)"/>
    </g>
  </svg>
);
\`\`\`
