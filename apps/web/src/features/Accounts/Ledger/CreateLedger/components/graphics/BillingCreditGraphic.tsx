import React from "react";

export interface GraphicProps extends React.SVGProps<SVGSVGElement> {
  primaryOffset?: { x: number; y: number };
}

/*
Header Graphic for Ledger Billing & Credit Step

Base/Anchor Canvas: A company building/office illustration.
Primary Foreground Element: Receipt.
Decorative Floating Elements: ledger book, bank, wallet, plus (+), minus (-), dollar ($), money bag
*/

export const BillingCreditGraphic = ({
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

      {/* Decorative: Ledger Book (Top Left) */}
      <rect x={18} y={20} width={12} height={16} rx={1} ry={1} />
      <line x1={21} y1={20} x2={21} y2={36} strokeWidth={1} />
      <line x1={24} y1={24} x2={27} y2={24} strokeWidth={1} />
      <line x1={24} y1={27} x2={27} y2={27} strokeWidth={1} />

      {/* Decorative: Plus (+ Floating Mid Left) */}
      <line x1={32} y1={12} x2={32} y2={18} />
      <line x1={29} y1={15} x2={35} y2={15} />

      {/* Decorative: Bank Building (Bottom Left) */}
      <polygon points="12,54 26,46 40,54" />
      <rect x={16} y={54} width={4} height={12} />
      <rect x={24} y={54} width={4} height={12} />
      <rect x={32} y={54} width={4} height={12} />
      <line x1={10} y1={66} x2={42} y2={66} />

      {/* Decorative: Wallet (Top Right) */}
      <rect x={112} y={16} width={18} height={12} rx={2} ry={2} />
      <path d="M 122 20 L 130 20 L 130 24 L 122 24 Z" />
      <circle cx={126} cy={22} r={1} fill="currentColor" />

      {/* Decorative: Dollar Symbol ($ Floating Mid Right) */}
      <path d="M 103 38 C 101 38 100 40 102 41 C 104 42 105 44 103 45 C 101 45 101 45 101 45" strokeWidth={1.2} />
      <line x1={102.5} y1={36} x2={102.5} y2={47} strokeWidth={1.2} />

      {/* Decorative: Minus (- Floating Mid Right) */}
      <line x1={95} y1={15} x2={101} y2={15} />

      {/* Decorative: Money Bag (Bottom Right) */}
      <path d="M 110 65 C 105 65 105 52 115 52 C 125 52 125 65 120 65 Z" />
      <path d="M 112 52 L 110 48 L 120 48 L 118 52" />

      {/* Abstract dots */}
      <circle cx={42} cy={10} r={2} />
      <circle cx={85} cy={65} r={1.5} />
    </g>

    {/* FOREGROUND COLORED ELEMENT: Receipt */}
    <g
      className="text-primary stroke-primary fill-surface"
      strokeWidth={1.5}
      transform={`translate(${primaryOffset.x}, ${primaryOffset.y})`}
    >
      {/* Receipt Outline (Zig-zag top and bottom) */}
      <path
        d="M 53 28 L 55 30 L 57 28 L 59 30 L 61 28 L 63 30 L 65 28 L 67 30 L 69 28 L 71 30 L 71 52 L 69 50 L 67 52 L 65 50 L 63 52 L 61 50 L 59 52 L 57 50 L 55 52 L 53 50 Z"
        fill="var(--surface)"
      />
      
      {/* Receipt Lines */}
      <line x1={57} y1={35} x2={67} y2={35} strokeWidth={1.5} />
      <line x1={57} y1={39} x2={64} y2={39} strokeWidth={1.5} />
      <line x1={57} y1={43} x2={67} y2={43} strokeWidth={1.5} />
      
      {/* A tiny stamp/circle on the receipt for detail */}
      <circle cx={65} cy={47} r={1.5} className="fill-primary" />
    </g>
  </svg>
);
