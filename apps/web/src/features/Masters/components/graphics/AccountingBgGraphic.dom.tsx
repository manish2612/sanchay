import React from 'react';

export function AccountingBgGraphic() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-32 h-32 text-primary opacity-100"
      aria-hidden="true"
    >
      <path
        d="M20 30 H80 V90 H20 Z M30 45 H70 M30 60 H70 M30 75 H50"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
      />
      <circle cx="95" cy="40" r="15" stroke="currentColor" strokeWidth={1} fill="none" />
      <path
        d="M85 85 V70 H90 V85 Z M95 85 V60 H100 V85 Z M105 85 V50 H110 V85 Z"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
      />
    </svg>
  );
}
