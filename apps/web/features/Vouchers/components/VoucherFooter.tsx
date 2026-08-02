"use client";

import React from "react";
import { Button, Icon } from "@prime/ui";
import { SplitButton } from "@prime/ui";
import { type VoucherFooterState } from "../hooks/useVoucherFooter";
import { LedgerEntryTable } from "./LedgerEntryTable/LedgerEntryTable";
import { VoucherSummaryPanel } from "./VoucherSummaryPanel";

// ─── Main Component ─────────────────────────────────────────────────────────

export function VoucherFooter({
  narration,
  setNarration,
  summary,
  onSave,
  onPreview,
  onPrint,
  onPrintConfig,
  onExportPdf,
}: VoucherFooterState) {
  return (
    <footer
      className="bg-surface border-t border-border px-5 py-3 grid grid-cols-[450px_1fr_350px] gap-5 items-stretch flex-shrink-0"
      aria-label="Voucher actions and totals"
    >
      {/* Left: Narration */}
      <div id="narrationActions" className="flex flex-col gap-2.5">
        <label
          htmlFor="voucher-narration"
          className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground select-none"
        >
          Narration / Notes
        </label>
        <div className="border border-input rounded-md bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all flex-1 flex">
          <textarea
            id="voucher-narration"
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
            placeholder="Enter additional notes, remarks, or narration for this voucher…"
            className="w-full resize-none bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none flex-1"
          />
        </div>
      </div>

      {/* Middle: Ledger Table */}
      <div className="flex flex-col border border-border rounded-lg overflow-hidden bg-surface-variant shadow-sm min-w-0">
        <LedgerEntryTable />
      </div>

      {/* Right: Summary panel & Actions */}
      <div className="flex flex-col gap-3">
        <VoucherSummaryPanel summary={summary} />

        {/* Action Buttons Row */}
        <div className="flex items-center justify-end gap-1.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            className="gap-1.5"
            aria-label="Preview voucher"
          >
            <Icon name="Eye" size={13} />
            Preview
          </Button>

          <SplitButton
            primaryLabel="Print"
            primaryIcon="Printer"
            primaryAction={onPrint}
            items={[
              {
                id: "print-default",
                label: "Print (Default)",
                icon: "Printer",
                onSelect: onPrint,
              },
              {
                id: "print-config",
                label: "Print Config…",
                icon: "FileText",
                onSelect: onPrintConfig,
              },
              {
                id: "export-pdf",
                label: "Export PDF",
                icon: "Download",
                onSelect: onExportPdf,
              },
            ]}
          />

          {/* Primary Save Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            className="gap-1.5 px-4 ml-2"
            aria-label="Save voucher"
          >
            <Icon name="Save" size={13} />
            Save
          </Button>
        </div>
      </div>
    </footer>
  );
}
