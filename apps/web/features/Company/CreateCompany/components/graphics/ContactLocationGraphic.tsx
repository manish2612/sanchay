import React from "react";

export interface GraphicProps extends React.SVGProps<SVGSVGElement> {
  primaryOffset?: { x: number; y: number };
}

/*
Use the wizard-graphic-generator skill to create a header graphic for apps/web/app/company/new/components/ContactLocationStep.tsx
apps/web/app/company/new/components/OperationsComplianceStep.tsx
Base/Anchor Canvas: A company building/office illustration.
Primary Foreground Element: Map Pin Marker
Decorative Floating Elements:  mobile, mail, chat, whatsapp, phone, web icon, digits and other abstract accounting-related accents.
*/

export const ContactLocationGraphic = ({
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
    <g
      className="text-muted-foreground stroke-muted-foreground/30 opacity-30"
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
    >
      {/* Base Canvas: Company Building / Office (Matches Step 1 for cohesion) */}
      <rect x={40} y={20} width={45} height={40} rx={2} ry={2} />
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

      {/* Decorative: Envelope / Mail (Top Left) */}
      <rect x={12} y={15} width={18} height={12} rx={1} />
      <polyline points="12,15 21,22 30,15" />

      {/* Decorative: Mobile Phone (Bottom Left) */}
      <rect x={15} y={45} width={12} height={22} rx={2} />
      <line x1={19} y1={63} x2={23} y2={63} />

      {/* Decorative: Chat Bubble (Top Right) */}
      <path d="M 112 12 L 126 12 C 128 12, 130 14, 130 16 L 130 26 C 130 28, 128 30, 126 30 L 118 30 L 112 36 L 112 30 L 112 30 C 110 30, 108 28, 108 26 L 108 16 C 108 14, 110 12, 112 12 Z" />
      <line x1={113} y1={18} x2={125} y2={18} />
      <line x1={113} y1={24} x2={120} y2={24} />

      {/* Decorative: Phone Handset (Bottom Right) */}
      <path d="M 115 50 C 118 48, 122 48, 125 50 L 128 54 C 123 58, 117 58, 112 54 L 115 50 Z" />
      <path d="M 112 54 C 110 60, 110 65, 112 70 L 118 68 C 117 64, 117 60, 118 56 L 112 54 Z" />

      {/* Decorative: Globe / Web Icon (Floating) */}
      <circle cx={100} cy={65} r={8} />
      <ellipse cx={100} cy={65} rx={3} ry={8} />
      <line x1={92} y1={65} x2={108} y2={65} />

      {/* Abstract floating elements */}
      <circle cx={35} cy={12} r={1.5} />
      <circle cx={92} cy={22} r={1} />
      <path d="M 28 38 Q 32 34, 34 40 T 40 36" strokeWidth={1} />
      <text
        x={115}
        y={40}
        fontSize={6}
        stroke="none"
        fill="currentColor"
        fontWeight="bold"
      >
        @
      </text>
    </g>

    {/* FOREGROUND COLORED ELEMENT: Map Pin */}
    <g
      className="text-primary stroke-primary fill-surface"
      strokeWidth={2}
      transform={`translate(${primaryOffset.x}, ${primaryOffset.y})`}
    >
      {/* Map Pin Body centered over the building (x=62.5) */}
      <path d="M 62.5 52 C 62.5 52, 50 36, 50 28 C 50 18, 75 18, 75 28 C 75 36, 62.5 52, 62.5 52 Z" />

      {/* Inner Cutout (Hole in the map pin) */}
      <circle cx={62.5} cy={28} r={4} className="fill-surface" />
    </g>
  </svg>
);
