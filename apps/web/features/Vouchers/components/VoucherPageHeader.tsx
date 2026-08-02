"use client";

import React from "react";
import { Icon } from "@prime/ui";

interface VoucherPageHeaderProps {
  voucherMode?: string;
  entryMode?: string;
}

export function VoucherPageHeader({
  voucherMode = "Creation Mode",
  entryMode = "Item Mode",
}: VoucherPageHeaderProps) {
  return (
    <header className="h-[52px] flex-shrink-0 bg-surface border-b border-border flex items-center px-5 gap-3">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium" aria-label="Breadcrumb">
        <span className="hover:text-foreground transition-colors cursor-pointer">Transactions</span>
        <Icon name="ChevronRight" size={12} className="opacity-40" />
        <span className="hover:text-foreground transition-colors cursor-pointer">Vouchers</span>
      </nav>

      {/* Divider */}
      <span className="text-border text-sm select-none">|</span>

      {/* Page Title */}
      <h1 className="font-heading text-base font-semibold text-foreground tracking-tight">
        Voucher Entry
      </h1>

      {/* Creation Mode Badge */}
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/25 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        {voucherMode}
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right-side chips */}
      <div className="flex items-center gap-2">
        {/* Entry Mode chip */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-info/10 text-info border border-info/25 select-none">
          <Icon name="Grid2x2" size={10} />
          {entryMode}
        </span>

        {/* Keyboard shortcut hint */}
        <button
          aria-label="Keyboard shortcuts"
          title="Keyboard shortcuts"
          className="flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-variant transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <Icon name="Keyboard" size={14} />
        </button>
      </div>
    </header>
  );
}
