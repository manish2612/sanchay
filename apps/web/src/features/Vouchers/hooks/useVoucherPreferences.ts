import { useState } from "react";

export type ApplyTaxOption = "Item Level" | "Invoice Level" | "No Tax";
export type ApplyModeOption = "Item Mode" | "Account Mode";

export function useVoucherPreferences() {
  const [applyTax, setApplyTax] = useState<ApplyTaxOption>("Item Level");
  const [applyMode, setApplyMode] = useState<ApplyModeOption>("Item Mode");
  
  const [enableNegativeStock, setEnableNegativeStock] = useState(false);
  const [enableTracking, setEnableTracking] = useState(false);
  const [enableDispatchDetails, setEnableDispatchDetails] = useState(false);
  const [enableExportDetails, setEnableExportDetails] = useState(false);
  const [enableBuyerConsigneeDetails, setEnableBuyerConsigneeDetails] = useState(false);
  const [enableItemDescription, setEnableItemDescription] = useState(false);
  const [enableLedgerDescription, setEnableLedgerDescription] = useState(false);

  return {
    applyTax,
    setApplyTax,
    applyMode,
    setApplyMode,
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
