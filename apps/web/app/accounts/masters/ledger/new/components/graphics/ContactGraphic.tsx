import React from "react";

export interface GraphicProps extends React.SVGProps<SVGSVGElement> {
  primaryOffset?: { x: number; y: number };
}

/*
Header Graphic for Ledger Contact Step

Base/Anchor Canvas: A company building/office illustration.
Primary Foreground Element: iPhone/Smartphone.
Decorative Floating Elements: whatsapp bubble, telephone, internet (globe), user, ribbon, dot, triangle, diamond
*/

export const ContactGraphic = ({
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

      {/* Decorative: WhatsApp Chat Bubble (Mid Left) */}
      <path d="M 17 38 C 13 38 10 35 10 31 C 10 27 14 24 20 24 C 26 24 30 27 30 31 C 30 35 26 38 21 38 L 15 41 L 17 38 Z" />
      <circle cx={17} cy={31} r={0.5} fill="currentColor" />
      <circle cx={20} cy={31} r={0.5} fill="currentColor" />
      <circle cx={23} cy={31} r={0.5} fill="currentColor" />

      {/* Decorative: Ribbon (Top Left) */}
      <path d="M 14 10 L 22 10 L 22 18 L 18 15 L 14 18 Z" />

      {/* Decorative: Telephone (Bottom Left) */}
      <path d="M 18 60 C 18 56 22 54 28 54 C 34 54 38 56 38 60 L 38 66 L 18 66 Z" />
      <path d="M 22 54 C 22 48 34 48 34 54" />
      <circle cx={22} cy={54} r={2} fill="currentColor" />
      <circle cx={34} cy={54} r={2} fill="currentColor" />

      {/* Decorative: Internet / Globe (Top Right) */}
      <circle cx={120} cy={22} r={8} />
      <ellipse cx={120} cy={22} rx={3} ry={8} />
      <line x1={112} y1={22} x2={128} y2={22} />

      {/* Decorative: User (Bottom Right) */}
      <circle cx={120} cy={54} r={4} />
      <path d="M 112 66 C 112 60 116 58 120 58 C 124 58 128 60 128 66" />

      {/* Decorative: Triangle (Top Right Floating) */}
      <polygon points="100,12 104,18 96,18" />

      {/* Decorative: Diamond (Mid Left Floating) */}
      <polygon points="32,46 35,43 38,46 35,49" />

      {/* Decorative: Dot / Floating Accents */}
      <circle cx={88} cy={16} r={1.5} fill="currentColor" />
      <circle cx={105} cy={44} r={1} fill="currentColor" />
    </g>

    {/* FOREGROUND COLORED ELEMENT: Minimal Smartphone */}
    <g
      className="text-primary stroke-primary fill-surface"
      strokeWidth={1.5}
      transform={`translate(${primaryOffset.x}, ${primaryOffset.y})`}
    >
      {/* Phone Body */}
      <rect x={54} y={24} width={16} height={32} rx={2.5} ry={2.5} fill="var(--surface)" />
      
      {/* Phone Screen */}
      <rect x={56} y={28} width={12} height={24} rx={1} ry={1} />
      
      {/* Top Speaker */}
      <line x1={60} y1={26} x2={64} y2={26} strokeWidth={1} />
      
      {/* Bottom Home Button */}
      <circle cx={62} cy={54} r={0.75} />
    </g>
  </svg>
);
