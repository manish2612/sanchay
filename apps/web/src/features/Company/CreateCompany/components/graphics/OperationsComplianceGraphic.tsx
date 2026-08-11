import React from "react";

export interface GraphicProps extends React.SVGProps<SVGSVGElement> {
  primaryOffset?: { x: number; y: number };
}

/*
Use the wizard-graphic-generator skill to create a header graphic for apps/web/app/company/new/components/OperationsComplianceStep.tsx and use it in page.tsx

Base/Anchor Canvas: A company building/office illustration.
Primary Foreground Element: Setting icon of Gear
Decorative Floating Elements:  123, reciept, calendar, Rupee, dollar, world*/

export const OperationsComplianceGraphic = ({
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
      {/* Base Canvas: Company Building / Office (Matches previous steps) */}
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

      {/* Decorative: Calendar (Top Left) */}
      <rect x={15} y={12} width={16} height={18} rx={2} />
      <line x1={15} y1={18} x2={31} y2={18} />
      <line x1={19} y1={10} x2={19} y2={14} />
      <line x1={27} y1={10} x2={27} y2={14} />
      <rect x={19} y={22} width={2} height={2} />
      <rect x={23} y={22} width={2} height={2} />
      <rect x={27} y={22} width={2} height={2} />

      {/* Decorative: Globe / World (Bottom Left) */}
      <circle cx={20} cy={55} r={9} />
      <ellipse cx={20} cy={55} rx={3.5} ry={9} />
      <line x1={11} y1={55} x2={29} y2={55} />

      {/* Decorative: Receipt (Top Right) */}
      <path d="M 112 10 L 126 10 L 126 32 L 122 28 L 119 32 L 115 28 L 112 32 Z" />
      <line x1={116} y1={16} x2={122} y2={16} />
      <line x1={116} y1={22} x2={120} y2={22} />

      {/* Decorative: Floating Text '123' */}
      <text
        x={112}
        y={50}
        fontSize={8}
        stroke="none"
        fill="currentColor"
        fontWeight="bold"
      >
        123
      </text>

      {/* Decorative: Rupee Symbol (Floating) */}
      <path
        d="M 32 34 L 38 34 M 32 37 L 37 37 M 34 34 L 34 39 L 38 44 M 34 37 C 37 37 37 41 34 41"
        strokeWidth={1}
      />

      {/* Decorative: Dollar Symbol (Floating) */}
      <path
        d="M 98 44 C 95 44 95 48 98 48 C 101 48 101 52 98 52 M 98 42 L 98 54"
        strokeWidth={1.2}
      />

      {/* Abstract floating elements */}
      <circle cx={35} cy={10} r={1.5} />
      <circle cx={90} cy={28} r={1} />
      <path d="M 102 60 Q 106 56, 108 62 T 114 58" strokeWidth={1} />
    </g>

    {/* FOREGROUND COLORED ELEMENT: Settings Gear */}
    <g
      className="text-primary stroke-primary fill-surface"
      strokeWidth={2}
      transform={`translate(${primaryOffset.x}, ${primaryOffset.y})`}
    >
      {/* Gear Body centered over the building (x=62.5, y=40). Scale by 1.16 */}
      <g transform="translate(48.5, 26) scale(1.16)">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        {/* Inner Cutout (Hole in the gear) */}
        <circle cx="12" cy="12" r="3" className="fill-background" />
      </g>
    </g>
  </svg>
);
