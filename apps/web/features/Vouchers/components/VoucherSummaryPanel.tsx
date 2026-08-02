"use client";

import React, { useRef, useState } from "react";
import { Icon } from "@prime/ui";
import { type VoucherFooterState } from "../hooks/useVoucherFooter";
import { useClickOutside } from "../../../hooks/useClickOutside";

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatAmount(value: number): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─── Sub-component: Summary Row ────────────────────────────────────────────

interface SummaryRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function SummaryRow({ label, value, valueClassName }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between px-3.5 py-1 hover:bg-surface-hover transition-colors">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm tabular-nums text-foreground ${valueClassName ?? ""}`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export interface VoucherSummaryPanelProps {
  summary: VoucherFooterState["summary"];
}

export function VoucherSummaryPanel({ summary }: VoucherSummaryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    <aside
      className="bg-surface-variant border border-border rounded-lg flex flex-col flex-shrink-0 shadow-sm relative z-20 w-full"
      aria-label="Financial summary"
      ref={wrapperRef}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-border relative">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold font-heading text-foreground tracking-wide uppercase">
            Summary
          </span>
          {/* Breakdown Chip Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-[10px] font-medium transition-colors px-1.5 py-0.5 rounded flex justify-center items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
              isOpen
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-primary hover:text-primary-hover bg-primary/10 hover:bg-primary/20"
            }`}
            aria-expanded={isOpen}
          >
            <Icon name="Eye" size={16} />
            View Breakdown
          </button>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {summary.currency}
        </span>

        {/* Floating Popover Card (anchored to header) */}
        {isOpen && (
          <div className="absolute bottom-full mb-2 right-0 w-[280px] bg-surface border border-border rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden transform origin-bottom animate-in fade-in zoom-in-95 duration-150">
            <div className="py-1">
              <SummaryRow
                label={`Discount`}
                value={formatAmount(summary.discount)}
              />
              <SummaryRow
                label="Taxable Amount"
                value={formatAmount(summary.taxableAmount)}
              />
              <SummaryRow
                label="Exempted Amount"
                value={formatAmount(summary.exemptedAmount)}
              />
              <SummaryRow
                label={`VAT Amount (${summary.vatPercent}%)`}
                value={formatAmount(summary.vatAmount)}
                valueClassName="text-info font-medium"
              />
              <SummaryRow
                label="Rounding Off"
                value={formatAmount(summary.roundingOff)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Gross Total (Always visible) */}
      <div className="py-1">
        <SummaryRow
          label="Gross Total"
          value={formatAmount(summary.subTotal)}
        />
        <SummaryRow
          label="VAT Amount"
          value={formatAmount(summary.vatAmount)}
        />
      </div>

      {/* Net Total hero bar */}
      <div
        className="flex items-center justify-between px-3.5 py-2 bg-gradient-to-r from-primary to-primary-active mt-auto rounded-b-[7px]"
        aria-label="Net total"
      >
        <span className="text-xs font-bold font-heading text-white/80 tracking-widest uppercase">
          Net Total
        </span>
        <span className="font-heading font-bold text-white tabular-nums tracking-tight">
          <span className="text-xs font-normal text-white/60 mr-1">
            {summary.currency}
          </span>
          <span className="text-xl">{formatAmount(summary.netTotal)}</span>
        </span>
      </div>
    </aside>
  );
}
