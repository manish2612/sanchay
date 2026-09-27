import { useState } from "react";
import { useParams } from "@tanstack/react-router";

export type ApplyTaxOption = "Item Level" | "Invoice Level" | "No Tax";
export type ApplyModeOption = "Item Mode" | "Account Mode" | "Account Invoice";

export function useVoucherPreferences() {
  const [applyTax, setApplyTax] = useState<ApplyTaxOption>("Item Level");
  const [internalApplyMode, setApplyMode] = useState<ApplyModeOption>("Item Mode");
  
  const [enableNegativeStock, setEnableNegativeStock] = useState(false);
  const [enableTracking, setEnableTracking] = useState(false);
  const [enableDispatchDetails, setEnableDispatchDetails] = useState(false);
  const [enableExportDetails, setEnableExportDetails] = useState(false);
  const [enableBuyerConsigneeDetails, setEnableBuyerConsigneeDetails] = useState(false);
  const [enableItemDescription, setEnableItemDescription] = useState(false);
  const [enableLedgerDescription, setEnableLedgerDescription] = useState(false);

  // Extract module from URL to determine if we are in Accounting mode
  const { module } = useParams({ strict: false });
  const isAccountingMode = module === "accounts";

  // In accounting mode, Item Mode is not applicable. Default to Account Mode if Item Mode is selected.
  // We now support both "Account Mode" and "Account Invoice".
  let applyMode = internalApplyMode;
  if (isAccountingMode && applyMode === "Item Mode") {
    applyMode = "Account Mode";
  }
  
  // Expose isAccountingMode to UI so it can conditionally render the SegmentedControl options
  const isApplyModeReadonly = isAccountingMode;

  return {
    applyTax,
    setApplyTax,
    applyMode,
    setApplyMode,
    isApplyModeReadonly,
    enableNegativeStock,
    setEnableNegativeStock,
    enableTracking,
    setEnableTracking,
    enableDispatchDetails,
    setEnableDispatchDetails,
    enableExportDetails,
    setEnableExportDetails,
    enableBuyerConsigneeDetails,
    setEnableBuyerConsigneeDetails,
    enableItemDescription,
    setEnableItemDescription,
    enableLedgerDescription,
    setEnableLedgerDescription,
  };
}
