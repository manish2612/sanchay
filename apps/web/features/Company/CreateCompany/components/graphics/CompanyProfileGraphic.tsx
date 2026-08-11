import React from "react";

export interface GraphicProps extends React.SVGProps<SVGSVGElement> {
  primaryOffset?: { x: number; y: number };
}

/*
Use the wizard-graphic-generator skill to create a header graphic for apps/web/app/company/new/components/CompanyProfileStep.tsx.

Base/Anchor Canvas: A company building/office illustration.
Primary Foreground Element: A large Pencil icon.
Decorative Floating Elements: A receipt, a money bag, a globe/web, a Rupee symbol, a bank building, and other abstract accounting-related accents.
*/

export const CompanyProfileGraphic = ({
  className,
  primaryOffset = { x: 0, y: 0 },
  ...props
}: GraphicProps) => (
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
      {/* Base Canvas: Company Building / Office */}
      <rect x={40} y={20} width={45} height={40} rx={2} ry={2} />
      {/* Building Windows */}
      <rect x={48} y={28} width={6} height={6} rx={1} />
      <rect x={58} y={28} width={6} height={6} rx={1} />
      <rect x={70} y={28} width={6} height={6} rx={1} />
      <rect x={48} y={40} width={6} height={6} rx={1} />
      <rect x={58} y={40} width={6} height={6} rx={1} />
      <rect x={70} y={40} width={6} height={6} rx={1} />
      {/* Secondary taller building in background */}
      <path d="M 85 35 L 85 14 C 85 12, 87 10, 89 10 L 100 10 C 102 10, 104 12, 104 14 L 104 60" />
      <line x1={90} y1={18} x2={98} y2={18} />
      <line x1={90} y1={26} x2={98} y2={26} />

      {/* Decorative: Globe / Web (Top Left) */}
      <circle cx={22} cy={22} r={10} />
      <ellipse cx={22} cy={22} rx={4} ry={10} />
      <line x1={12} y1={22} x2={32} y2={22} />

      {/* Decorative: Bank Building (Bottom Left) */}
      <polygon points="12,54 26,46 40,54" />
      <rect x={16} y={54} width={4} height={12} />
      <rect x={24} y={54} width={4} height={12} />
      <rect x={32} y={54} width={4} height={12} />
      <line x1={10} y1={66} x2={42} y2={66} />

      {/* Decorative: Receipt (Top Right) */}
      <path d="M 115 10 L 130 10 L 130 35 L 126 31 L 122 35 L 118 31 L 115 35 Z" />
      <line x1={119} y1={16} x2={126} y2={16} />
      <line x1={119} y1={22} x2={124} y2={22} />

      {/* Decorative: Money Bag (Bottom Right) */}
      <path d="M 110 65 C 105 65 105 52 115 52 C 125 52 125 65 120 65 Z" />
      <path d="M 112 52 L 110 48 L 120 48 L 118 52" />

      {/* Decorative: Rupee Symbol (Floating) */}
      <path
        d="M 105 40 L 113 40 M 105 43 L 111 43 M 108 40 L 108 46 L 113 52 M 108 43 C 112 43 112 47 108 47"
        strokeWidth={1.2}
      />

      {/* Abstract floating elements */}
      <circle cx={42} cy={10} r={2} />
      <circle cx={85} cy={65} r={1.5} />
      <path d="M 12 36 Q 16 32 18 38 T 24 34" strokeWidth={1} />
    </g>

    {/* FOREGROUND COLORED ELEMENT: Pencil */}
    <g
      className="text-primary stroke-primary fill-surface"
      strokeWidth={1.5}
      transform={`translate(${primaryOffset.x}, ${primaryOffset.y})`}
    >
      {/* Pencil Body overlapping the center of the base buildings */}
      <path d="M 58 25 L 66 25 L 66 45 L 58 45 Z" />
      {/* Pencil Eraser/Metal Band */}
      <line x1={58} y1={30} x2={66} y2={30} />
      {/* Pencil Tip */}
      <path d="M 58 45 L 66 45 L 62 55 Z" className="fill-surface" />
      {/* Pencil Lead */}
      <path d="M 60.5 51.25 L 63.5 51.25 L 62 55 Z" className="fill-primary" />
    </g>
  </svg>
);
