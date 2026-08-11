import React from 'react';

export function InventoryBgGraphic() {
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32 text-primary opacity-100" aria-hidden="true">
      <path
        d="M20 40 L60 20 L100 40 L60 60 Z M20 40 V80 L60 100 V60 M100 40 V80 L60 100"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M40 30 L80 50 M20 60 L60 80 M80 30 L40 50"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        strokeDasharray="2 2"
      />
    </svg>
  );
}
