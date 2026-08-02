import { useState } from "react";

export interface VoucherSummary {
  subTotal: number;
  discount: number;
  taxableAmount: number;
  exemptedAmount: number;
  vatAmount: number;
  vatPercent: number;
  roundingOff: number;
  netTotal: number;
  currency: string;
}

export interface VoucherFooterState {
  narration: string;
  setNarration: (value: string) => void;
  isPrintMenuOpen: boolean;
  togglePrintMenu: () => void;
  closePrintMenu: () => void;
  summary: VoucherSummary;
  onSave: () => void;
  onPreview: () => void;
  onPrint: () => void;
  onPrintConfig: () => void;
  onExportPdf: () => void;
  onNew: () => void;
  onBack: () => void;
}

// Static summary — will be replaced with computed values in a future task
const STATIC_SUMMARY: VoucherSummary = {
  subTotal: 2450.0,
  discount: 0.0,
  taxableAmount: 2450.0,
  exemptedAmount: 0.0,
  vatAmount: 318.5,
  vatPercent: 13,
  roundingOff: 0.5,
  netTotal: 2769.0,
  currency: "NPR",
};

export function useVoucherFooter(): VoucherFooterState {
  const [narration, setNarration] = useState("");
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);

  const togglePrintMenu = () => setIsPrintMenuOpen((prev) => !prev);
  const closePrintMenu = () => setIsPrintMenuOpen(false);

  const onSave = () => {
    console.log("Save voucher", { narration });
  };

  const onPreview = () => {
    console.log("Preview voucher");
  };

  const onPrint = () => {
    console.log("Print voucher");
    closePrintMenu();
  };

  const onPrintConfig = () => {
    console.log("Print config");
    closePrintMenu();
  };

  const onExportPdf = () => {
    console.log("Export PDF");
    closePrintMenu();
  };

  const onNew = () => {
    console.log("New voucher");
  };

  const onBack = () => {
    console.log("Navigate back");
  };

  return {
    narration,
    setNarration,
    isPrintMenuOpen,
    togglePrintMenu,
    closePrintMenu,
    summary: STATIC_SUMMARY,
    onSave,
    onPreview,
    onPrint,
    onPrintConfig,
    onExportPdf,
    onNew,
    onBack,
  };
}
