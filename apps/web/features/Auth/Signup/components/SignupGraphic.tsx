import React from 'react';
import { Users, Box, BookOpen, LineChart, TrendingUp, Building2, CreditCard } from 'lucide-react';

export function SignupGraphic() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="w-full h-auto max-w-[600px] mx-auto drop-shadow-2xl"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="windowShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="12" stdDeviation="24" floodColor="rgba(0,0,0,0.3)" />
        </filter>
        <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="rgba(0,0,0,0.3)" />
        </filter>
      </defs>

      {/* --- LAYER 1: Background Textures --- */}

      {/* Top-Left: Shapes (Diamonds, Squares, Circle) */}
      <g transform="translate(40, 40)" opacity="0.3">
        {/* Square */}
        <rect x="0" y="20" width="40" height="40" fill="rgba(255,255,255,0.08)" />
        {/* Diamond */}
        <rect
          x="40"
          y="0"
          width="36"
          height="36"
          fill="rgba(255,255,255,0.1)"
          transform="rotate(45 58 18)"
        />
        {/* Circle with stroke, no fill */}
        <circle
          cx="80"
          cy="70"
          r="24"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
      </g>

      {/* Top-Right: Dashed Strips */}
      <g
        transform="translate(500, 40)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="4"
        strokeDasharray="8 8"
      >
        <line x1="0" y1="0" x2="0" y2="80" />
        <line x1="20" y1="0" x2="20" y2="120" />
        <line x1="40" y1="20" x2="40" y2="100" />
      </g>

      {/* Bottom-Left: 4x4 Dot Matrix */}
      <g transform="translate(40, 500)" fill="rgba(255,255,255,0.15)">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle key={`dot-${row}-${col}`} cx={col * 16} cy={row * 16} r="3" />
          )),
        )}
      </g>

      {/* --- LAYER 2: Main App Window --- */}
      {/* Positioned centered, slightly offset. Width: 340, Height: 460 */}
      <g filter="url(#windowShadow)">
        <rect x="130" y="70" width="340" height="460" rx="16" fill="#ffffff" />
        <foreignObject x="130" y="70" width="340" height="460">
          <div className="w-full h-full p-6 flex flex-col bg-white rounded-[16px] text-slate-900 overflow-hidden font-sans">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Company Overview</h3>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug px-4">
                Please enter user information that you want to access and enter an amount.
              </p>
            </div>

            {/* Section 1: Quick Modules */}
            <div className="mb-6">
              <div className="text-[10px] font-semibold text-slate-900 mb-3 ml-1">ERP Modules</div>
              <div className="flex justify-between items-start px-2">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">
                    <Users size={18} />
                  </div>
                  <span className="text-[9px] text-slate-600 font-medium">HR</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">
                    <Box size={18} />
                  </div>
                  <span className="text-[9px] text-slate-600 font-medium text-center">
                    Inventory
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-100 flex items-center justify-center text-blue-600 bg-blue-50/50">
                    <BookOpen size={18} />
                  </div>
                  <span className="text-[9px] text-blue-600 font-medium">Ledger</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700">
                    <LineChart size={18} />
                  </div>
                  <span className="text-[9px] text-slate-600 font-medium">Sales</span>
                </div>
              </div>
            </div>

            {/* Section 2: Data Cards */}
            <div className="flex-1 flex flex-col gap-3 relative">
              <div className="text-[10px] font-semibold text-slate-900 ml-1 mb-1 flex justify-between items-center">
                <span>Financial Summary</span>
                <span className="text-slate-400 font-normal cursor-pointer hover:text-slate-600">
                  View All
                </span>
              </div>

              {/* Card 1: Primary Theme Card */}
              <div className="bg-primary text-primary-foreground rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between h-28">
                {/* Subtle background circles for decoration */}
                <div className="absolute -right-4 -bottom-8 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute right-12 -top-6 w-16 h-16 rounded-full bg-white/5" />

                <div className="flex justify-between items-start relative z-10">
                  <div className="text-[11px] font-medium opacity-90">Total Revenue</div>
                  <LineChart size={16} className="opacity-80" />
                </div>
                <div className="relative z-10">
                  <div className="text-2xl font-bold tracking-tight">$124,098.00</div>
                  <div className="text-[9px] font-medium opacity-80 mt-1 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" /> Active
                    Quarter
                  </div>
                </div>
              </div>

              {/* Grid for Cards 2, 3, 4 */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                {/* Card 2: Secondary White Card (Pending Expenses) */}
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-medium text-slate-500">Pending Expenses</span>
                    <CreditCard size={12} className="text-slate-400" />
                  </div>
                  <div className="text-sm font-bold text-slate-800">$34,245.00</div>
                </div>

                {/* Card 3: Quaternary White Card (Active Users) */}
                <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-medium text-slate-500">Active Users</span>
                    <Users size={12} className="text-slate-400" />
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    1,204 <span className="text-[9px] text-slate-400 font-normal">Online</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Tertiary White Card (Quick Entry) */}
              <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm mt-1 flex items-center justify-between">
                <div className="text-[10px] text-slate-500 ml-1">Quick Transfer</div>
                <div className="bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-800 px-2 py-1 flex items-center gap-2">
                  $1,240 <span className="text-[10px]">🇺🇸</span>
                </div>
              </div>
            </div>
          </div>
        </foreignObject>
      </g>

      {/* --- LAYERS 3 & 4: Overlapping Floating Cards --- */}

      {/* Top-Right Overlap: Total Stock Value */}
      <g filter="url(#cardShadow)">
        <rect x="360" y="100" width="180" height="75" rx="8" fill="#ffffff" />
        <foreignObject x="360" y="100" width="180" height="70">
          <div className="w-full h-full bg-white rounded-lg p-3 flex flex-col justify-center font-sans">
            <div className="flex justify-between items-center mb-1 mt-1">
              <span className="text-[9px] font-medium text-slate-500">Total Stock Value</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-blue-600">$56,476.00</span>
              <span className="text-[9px] font-medium text-slate-500">USD</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] font-semibold text-green-600 flex items-center gap-0.5">
                <TrendingUp size={10} /> +2.05%
              </span>
              <span className="text-[8px] text-slate-400">February 05, 2026</span>
            </div>
          </div>
        </foreignObject>
      </g>

      {/* Bottom-Left Overlap: Recent Payment Received */}
      <g filter="url(#cardShadow)">
        <rect x="60" y="380" width="220" height="56" rx="28" fill="#ffffff" />
        <foreignObject x="60" y="380" width="220" height="56">
          <div className="w-full h-full bg-white rounded-full px-2 flex items-center gap-3 font-sans">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-600">
              <Building2 size={18} />
            </div>
            <div className="flex-1 flex flex-col justify-center whitespace-nowrap overflow-hidden">
              <div className="text-[11px] font-bold text-slate-800">Acme Corp</div>
              <div className="text-[9px] text-slate-500">Payment received</div>
            </div>
            <div className="text-[11px] font-bold text-green-600 pr-4 shrink-0">+$10,500</div>
          </div>
        </foreignObject>
      </g>
    </svg>
  );
}
