import React from 'react';

export const LoginHeaderGraphic = ({
  className,
  primaryOffset = { x: 0, y: 0 },
  ...props
}: { primaryOffset?: { x: number; y: number } } & React.SVGProps<SVGSVGElement>) => (
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
      className="text-muted-foreground stroke-muted-foreground/30 opacity-40"
      stroke="currentColor"
      strokeWidth={1.2}
      fill="none"
    >
      {/* Base Canvas: Mid size desktop Monitor */}
      <rect x={35} y={15} width={70} height={42} rx={3} />
      <line x1={35} y1={51} x2={105} y2={51} />
      <rect x={66} y={57} width={8} height={8} />
      <path d="M 55 65 L 85 65" strokeWidth={2} strokeLinecap="round" />

      {/* Decorative Floating Elements */}

      {/* Web / Globe */}
      <g transform="translate(18, 20)">
        <circle cx={0} cy={0} r={6} />
        <ellipse cx={0} cy={0} rx={2.5} ry={6} />
        <line x1={-6} y1={0} x2={6} y2={0} />
      </g>

      {/* Mobile */}
      <g transform="translate(118, 48)">
        <rect x={-4} y={-8} width={8} height={14} rx={1.5} />
        <line x1={-1.5} y1={4} x2={1.5} y2={4} />
      </g>

      {/* Email */}
      <g transform="translate(115, 18)">
        <rect x={-6} y={-4} width={12} height={8} rx={1} />
        <polyline points="-6,-4 0,1 6,-4" />
      </g>

      {/* Fingerprint (Decorative) */}
      <g transform="translate(25, 45)">
        <path d="M -3 -3 C -1 -5, 1 -5, 3 -3" />
        <path d="M -4 0 C -2 -3, 2 -3, 4 0" />
        <path d="M -3 3 C -1 1, 1 1, 3 3" />
      </g>

      {/* Phone */}
      <g transform="translate(105, 35) scale(0.8)">
        <path d="M -3 -4 C -5 -2 -5 2 -3 4 C -1 6 3 6 5 4 L 7 2 L 4 -1 L 2 1 L -1 -2 L 1 -4 Z" />
      </g>

      {/* Ribbon */}
      <g transform="translate(35, 10)">
        <circle cx={0} cy={0} r={2.5} />
        <path d="M -1.5 2.5 L -3 8 L 0 6 L 3 8 L 1.5 2.5" />
      </g>

      {/* Abstract accents */}
      <circle cx={12} cy={60} r={1.5} className="fill-muted-foreground/30" />
      <circle cx={125} cy={10} r={1} />
      <circle cx={128} cy={65} r={2} />
      <line x1={20} y1={70} x2={24} y2={70} />
      <line x1={22} y1={68} x2={22} y2={72} />
    </g>

    {/* PRIMARY FOREGROUND ELEMENTS */}
    {/* Centered with optional offset */}
    <g
      transform={`translate(${70 + primaryOffset.x}, ${36 + primaryOffset.y})`}
      className="stroke-primary fill-background"
      strokeWidth={1.8}
    >
      {/* 1. ID Card (Active) */}
      <g>
        <rect x={-14} y={-18} width={28} height={36} rx={3} />
        <circle cx={0} cy={-6} r={5} />
        <path d="M -7 -1 A 7 7 0 0 1 7 -1" />
        <line x1={-8} y1={6} x2={8} y2={6} strokeWidth={1.5} />
        <line x1={-8} y1={11} x2={4} y2={11} strokeWidth={1.5} />
        <path d="M -3 -18 L -3 -21 C -3 -23, 3 -23, 3 -21 L 3 -18" />
      </g>

      {/* 
      // 2. Key with round head (Uncomment to use)
      <g>
        <circle cx={-8} cy={0} r={6} />
        <circle cx={-8} cy={0} r={2} />
        <line x1={-2} y1={0} x2={14} y2={0} />
        <path d="M 8 0 L 8 4 L 11 4 L 11 0" />
        <path d="M 14 0 L 14 4" />
      </g>
      */}

      {/* 
      // 3. Shield (Uncomment to use)
      <g>
        <path d="M -12 -12 L 12 -12 L 12 -2 C 12 8, 0 16, 0 16 C 0 16, -12 8, -12 -2 Z" />
        <path d="M -5 2 L -1 6 L 6 -3" />
      </g>
      */}

      {/* 
      // 4. Fingerprint (Uncomment to use)
      <g>
        <path d="M -8 6 V 0 C -8 -5, -4 -9, 0 -9 C 4 -9, 8 -5, 8 0 V 6" />
        <path d="M -4 4 V 0 C -4 -2.5, -2 -4, 0 -4 C 2 -4, 4 -2.5, 4 0 V 4" />
        <path d="M 0 0 V 2" />
        <path d="M -12 2 V 0 C -12 -7, -6 -13, 0 -13 C 6 -13, 12 -7, 12 0 V 2" />
      </g>
      */}
    </g>
  </svg>
);
