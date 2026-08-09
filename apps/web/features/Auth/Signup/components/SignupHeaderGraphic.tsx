import React from 'react';

export const SignupHeaderGraphic = ({
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
      transform={`translate(${70 + primaryOffset.x}, ${34 + primaryOffset.y})`}
      className="stroke-primary fill-background"
      strokeWidth={1.8}
    >
      {/* 1. Rocket (Active) */}
      <g transform="translate(0, -3)">
        {/* Flame */}
        <path d="M -3 12 C -6 18 -1 22 0 24 C 1 22 6 18 3 12" className="stroke-primary/60" />
        <path d="M 0 12 L 0 17" className="stroke-primary/60" />
        
        {/* Left Fin */}
        <path d="M -6.5 1 Q -14 1 -14 11 Q -9 10 -5 9" />
        {/* Right Fin */}
        <path d="M 6.5 1 Q 14 1 14 11 Q 9 10 5 9" />
        
        {/* Nozzle */}
        <path d="M -3 10 L -4 12 L 4 12 L 3 10" />
        
        {/* Main Body */}
        <path d="M 0 -16 C 8 -8 8 2 5 10 L -5 10 C -8 2 -8 -8 0 -16 Z" />
        
        {/* Cone separator */}
        <path d="M -5 -6 Q 0 -4.5 5 -6" />
        
        {/* Window */}
        <circle cx="0" cy="1" r="3" />
      </g>

      {/* 
      // 2. User with Plus (Uncomment to use)
      <g>
        <circle cx="-3" cy="-6" r="5" />
        <path d="M -12 10 C -12 4 -8 2 -3 2 C -1 2 1 3 2.5 4.5" />
        <line x1="8" y1="-2" x2="8" y2="8" />
        <line x1="3" y1="3" x2="13" y2="3" />
      </g>
      */}

      {/* 
      // 3. Company (Uncomment to use)
      <g>
        <path d="M -10 12 L -10 -8 L 0 -12 L 10 -8 L 10 12" />
        <line x1="-14" y1="12" x2="14" y2="12" />
        <line x1="-5" y1="-2" x2="-5" y2="2" />
        <line x1="-5" y1="5" x2="-5" y2="9" />
        <line x1="5" y1="-2" x2="5" y2="2" />
        <line x1="5" y1="5" x2="5" y2="9" />
      </g>
      */}

      {/* 
      // 4. Wand with Sparkle (Uncomment to use)
      <g>
        <path d="M 8 10 L -6 -4 A 2.828 2.828 0 1 1 -2 -8 L 12 6" />
        <path d="M -2 -8 L -6 -4" />
        <path d="M -16 -12 L -11 -10 L -16 -8 L -14 -14 Z" className="fill-primary" />
        <path d="M -4 -18 L -2 -14 L -6 -14 Z" className="fill-primary" />
        <path d="M -18 0 L -14 -2 L -14 2 Z" className="fill-primary" />
      </g>
      */}
    </g>
  </svg>
);
