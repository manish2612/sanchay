import React from 'react';
import { Package, Receipt, Wallet } from 'lucide-react';

export function LoginGraphic() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="w-full h-auto max-w-[600px] mx-auto drop-shadow-2xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer circle diagonal fade gradient */}
        <linearGradient id="outerFade" x1="80%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255, 0.14)" />
          <stop offset="40%" stopColor="rgba(255,255,255, 0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255, 0)" />
        </linearGradient>

        {/* Gradient for fading the connector lines (used in mask)
            Using a radial gradient centered at the exact junction point (300,300) 
            with a radius matching the icon placement (210) ensures all 3 lines 
            fade perfectly uniformly regardless of their angle. */}
        <radialGradient
          id="lineFadeGradient"
          cx="300"
          cy="300"
          r="210"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#888888" /> {/* Max opacity at the window junction */}
          <stop offset="70%" stopColor="#333333" /> {/* Starts fading out quickly */}
          <stop offset="100%" stopColor="#000000" />{' '}
          {/* Completely transparent exactly at the icons */}
        </radialGradient>

        {/* Mask to apply the fade to the solid connector lines */}
        <mask id="lineMask">
          <rect x="0" y="0" width="600" height="600" fill="url(#lineFadeGradient)" />
        </mask>

        {/* Drop shadow for the mock window */}
        <filter id="windowShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="30" floodColor="rgba(0,0,0,0.15)" />
        </filter>
      </defs>

      {/* Background Concentric Circles */}
      {/* Outer circle with gradient fade */}
      <circle cx="300" cy="300" r="280" fill="url(#outerFade)" />

      {/* Inner circle with subtle white stroke with opacity */}
      <circle
        cx="300"
        cy="300"
        r="210"
        fill="#ffffff"
        fillOpacity={0.03}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
      />

      {/* Connecting Lines */}
      {/* Group uses a mask to fade the lines from left to right smoothly.
          Because the lines are drawn solid white and then masked, there are NO overlapping artifacts. */}
      <g mask="url(#lineMask)">
        <path
          d="
            M 128 180 L 190 180 Q 210 180 210 200 L 210 280 Q 210 300 230 300 L 300 300 
            M 90 300 L 300 300 
            M 128 420 L 190 420 Q 210 420 210 400 L 210 320 Q 210 300 230 300 L 300 300
          "
          stroke="#ffffff"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Icon Nodes (Left Side) perfectly aligned on the r=210 circle */}
      {/* Top Node */}
      <g transform="translate(128, 180)">
        <circle cx="0" cy="0" r="28" fill="#ffffff" />
        <circle cx="0" cy="0" r="38" fill="rgba(255,255,255,0.2)" />
        <foreignObject x="-12" y="-12" width="24" height="24">
          <div className="flex items-center justify-center w-full h-full text-blue-600">
            <Package size={24} />
          </div>
        </foreignObject>
      </g>

      {/* Middle Node */}
      <g transform="translate(90, 300)">
        <circle cx="0" cy="0" r="32" fill="#ffffff" />
        <circle cx="0" cy="0" r="44" fill="rgba(255,255,255,0.2)" />
        <foreignObject x="-16" y="-16" width="32" height="32">
          <div className="flex items-center justify-center w-full h-full text-emerald-600">
            <Receipt size={28} />
          </div>
        </foreignObject>
      </g>

      {/* Bottom Node */}
      <g transform="translate(128, 420)">
        <circle cx="0" cy="0" r="28" fill="#ffffff" />
        <circle cx="0" cy="0" r="38" fill="rgba(255,255,255,0.2)" />
        <foreignObject x="-12" y="-12" width="24" height="24">
          <div className="flex items-center justify-center w-full h-full text-orange-500">
            <Wallet size={24} />
          </div>
        </foreignObject>
      </g>

      {/* Main Mock UI Window (Right Side) */}
      <g transform="translate(300, 140)" filter="url(#windowShadow)">
        {/* Base Window Frame (Light Grey) */}
        <rect width="260" height="320" rx="12" fill="#f4f5f7" />
        {/* White Header Area */}
        <path d="M 0 12 Q 0 0 12 0 L 248 0 Q 260 0 260 12 L 260 40 L 0 40 Z" fill="#ffffff" />
        <line x1="0" y1="40" x2="260" y2="40" stroke="#e5e7eb" strokeWidth="1" />
        {/* Header Dots */}
        <circle cx="20" cy="20" r="4" fill="#FF5F56" />
        <circle cx="34" cy="20" r="4" fill="#FFBD2E" />
        <circle cx="48" cy="20" r="4" fill="#27C93F" />
        {/* Header right side placeholder */}
        <rect x="180" y="16" width="60" height="8" rx="4" fill="#f3f4f6" />
        {/* Top Controls Area */}
        {/* Active tab */}
        <rect x="20" y="55" width="90" height="24" rx="4" fill="#e2e8f0" />
        <rect x="40" y="65" width="50" height="4" rx="2" fill="#94a3b8" />
        {/* Inactive tab */}
        <rect x="130" y="65" width="60" height="4" rx="2" fill="#cbd5e1" />
        {/* List Items / Cards */}
        {/* Card 1 */}
        <rect
          x="20"
          y="95"
          width="220"
          height="60"
          rx="6"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <circle cx="45" cy="125" r="16" fill="#e5e7eb" /> {/* User avatar placeholder */}
        <rect x="75" y="115" width="100" height="6" rx="3" fill="#9ca3af" />
        <rect x="75" y="130" width="60" height="4" rx="2" fill="#d1d5db" />
        {/* Card 2 */}
        <rect
          x="20"
          y="165"
          width="220"
          height="60"
          rx="6"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <circle cx="45" cy="195" r="16" fill="#e5e7eb" />
        <rect x="75" y="185" width="70" height="6" rx="3" fill="#9ca3af" />
        <rect x="75" y="200" width="80" height="4" rx="2" fill="#d1d5db" />
        {/* Card 3 */}
        <rect
          x="20"
          y="235"
          width="220"
          height="60"
          rx="6"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <circle cx="45" cy="265" r="16" fill="#e5e7eb" />
        <rect x="75" y="255" width="90" height="6" rx="3" fill="#9ca3af" />
        <rect x="75" y="270" width="50" height="4" rx="2" fill="#d1d5db" />
      </g>
    </svg>
  );
}
