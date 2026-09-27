"use client";

import React from "react";
import { Button, Icon, Form, SplitButton } from "@prime/ui";
import { type VoucherFooterState } from "../hooks/useVoucherFooter";
import { LedgerEntryTable } from "./LedgerEntryTable/LedgerEntryTable";
import { VoucherSummaryPanel } from "./VoucherSummaryPanel";
import { useFormContext } from "react-hook-form";
import { VOUCHER_FIELDS } from "../constants/voucherFields";
import { useVoucherPayloadGenerator } from "../hooks/useVoucherPayloadGenerator";
import { VoucherFormValues } from "../schema/voucherSchema";

// ─── Main Component ─────────────────────────────────────────────────────────

export interface VoucherFooterProps extends VoucherFooterState {
  hideLedgerEntryTable?: boolean;
}

export function VoucherFooter({
  summary,
  onPreview,
  onPrint,
  onPrintConfig,
  onExportPdf,
  hideLedgerEntryTable,
}: VoucherFooterProps) {
  const { control, handleSubmit } = useFormContext<VoucherFormValues>();
  const { generatePayload } = useVoucherPayloadGenerator();

  return (
    <footer
      className={`bg-surface border-t border-border px-5 py-3 grid ${hideLedgerEntryTable ? 'grid-cols-[1fr_auto]' : 'grid-cols-[450px_1fr_350px]'} gap-5 items-stretch flex-shrink-0`}
      aria-label="Voucher actions and totals"
    >
      {/* Left: Narration */}
      <div id="narrationActions" className="flex flex-col gap-2.5">
        <Form.Field
          control={control}
          name={VOUCHER_FIELDS.NARRATION}
          render={({ field }) => (
            <Form.Item className="flex-1 flex flex-col h-full">
              <Form.Label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground select-none mb-2">
                Narration / Notes
              </Form.Label>
              <Form.Control>
                <div className="border border-input rounded-md bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all flex-1 flex h-full">
                  <textarea
                    {...field}
                    id="voucher-narration"
                    placeholder="Enter additional notes, remarks, or narration for this voucher…"
                    className="w-full resize-none bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none flex-1 min-h-[80px]"
                  />
                </div>
              </Form.Control>
            </Form.Item>
          )}
        />
      </div>

      {/* Middle: Ledger Table */}
      {!hideLedgerEntryTable && (
        <div className="flex flex-col border border-border rounded-lg overflow-hidden bg-surface-variant shadow-sm min-w-0 relative min-h-[160px]">
          <div className="absolute inset-0 flex flex-col">
            <LedgerEntryTable applyMode="Item Mode" />
          </div>
        </div>
      )}

      {/* Right: Summary panel & Actions */}
      <div className="flex flex-col gap-3 justify-end h-full">
        {!hideLedgerEntryTable && <VoucherSummaryPanel summary={summary} />}

        {/* Action Buttons Row */}
        <div className="flex items-center justify-end gap-1.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            className="gap-1.5"
            aria-label="Preview voucher"
            type="button"
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
            type="button"
            onClick={handleSubmit((data) => {
              const apiPayload = generatePayload(data);
              console.log("Final API Payload:", apiPayload);
            })}
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
