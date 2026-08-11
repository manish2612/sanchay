import React from "react";

export interface GraphicProps extends React.SVGProps<SVGSVGElement> {
  primaryOffset?: { x: number; y: number };
}

/*
Header Graphic for Ledger General Information Step

Base/Anchor Canvas: A company building/office illustration.
Primary Foreground Element: Open book.
Decorative Floating Elements: A receipt, a money bag, a Rupee symbol, bank, wallet, plus (+), minus (-)
*/

export const GeneralInfoGraphic = ({
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

      {/* Decorative: Wallet (Top Left) */}
      <rect x={14} y={16} width={20} height={14} rx={2} ry={2} />
      <path d="M 26 20 L 34 20 L 34 26 L 26 26 Z" />
      <circle cx={30} cy={23} r={1} fill="currentColor" />

      {/* Decorative: Plus (+ Floating Left) */}
      <line x1={22} y1={36} x2={22} y2={42} />
      <line x1={19} y1={39} x2={25} y2={39} />

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

      {/* Decorative: Rupee Symbol (Floating Mid Right) */}
      <path
        d="M 104 38 L 110 38 M 104 41 L 109 41 M 106 38 L 106 43 L 110 49 M 106 41 C 110 41 110 44 106 44"
        strokeWidth={1.2}
      />

      {/* Decorative: Minus (- Floating Mid Right) */}
      <line x1={95} y1={48} x2={101} y2={48} />

      {/* Decorative: Money Bag (Bottom Right) */}
      <path d="M 110 65 C 105 65 105 52 115 52 C 125 52 125 65 120 65 Z" />
      <path d="M 112 52 L 110 48 L 120 48 L 118 52" />

      {/* Abstract dots */}
      <circle cx={42} cy={10} r={2} />
      <circle cx={85} cy={65} r={1.5} />
    </g>

    {/* FOREGROUND COLORED ELEMENT: Closed Ledger Book */}
    <g
      className="text-primary stroke-primary fill-surface"
      strokeWidth={1.5}
      transform={`translate(${primaryOffset.x}, ${primaryOffset.y})`}
    >
      {/* Book Cover */}
      <rect x={54} y={30} width={16} height={22} rx={2} ry={2} fill="var(--surface)" />
      
      {/* Spine / Binding Area */}
      <path d="M 54 32 L 58 32 L 58 50 L 54 50 Z" className="fill-primary" />
      <line x1={58} y1={30} x2={58} y2={52} strokeWidth={1} />
      
      {/* Binding Stitches */}
      <line x1={56} y1={34} x2={56} y2={34} strokeWidth={2} strokeLinecap="round" className="stroke-surface text-surface" />
      <line x1={56} y1={41} x2={56} y2={41} strokeWidth={2} strokeLinecap="round" className="stroke-surface text-surface" />
      <line x1={56} y1={48} x2={56} y2={48} strokeWidth={2} strokeLinecap="round" className="stroke-surface text-surface" />

      {/* Label/Badge on Cover */}
      <rect x={61} y={36} width={6} height={8} rx={1} ry={1} className="stroke-primary" />
      
      {/* Text Lines on Label */}
      <line x1={62.5} y1={39} x2={65.5} y2={39} strokeWidth={1} />
      <line x1={62.5} y1={41} x2={65.5} y2={41} strokeWidth={1} />
    </g>
  </svg>
);
