import { useState, useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { type VoucherRow } from "../components/VoucherItemTable/columns";
import { VOUCHER_FIELDS } from "../constants/voucherFields";
import { VoucherFormValues } from "../schema/voucherSchema";

const generateEmptyRow = (id: string): VoucherRow => ({
  id,
  item: "",
  qty: "",
  freeQty: "",
  altQty: "",
  netRate: "",
  rate: "",
  per: "",
  discPer: "",
  discAmt: "",
  amount: "",
  vatAmt: "",
  isPhantom: true,
});

export function useVoucherItemTable() {
  const { control } = useFormContext<VoucherFormValues>();

  const { fields, append, update } = useFieldArray({
    control,
    name: VOUCHER_FIELDS.ITEM_ENTRIES,
  });

  const [rowErrors, setRowErrors] = useState<Record<number, boolean>>({});
  const [activeDetailsRowIndex, setActiveDetailsRowIndex] = useState<number | null>(null);

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    update(rowIndex, { ...fields[rowIndex]!, [columnId]: value });
  }, [update, fields]);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string, cellValue?: string) => {
    let row = fields[rowIndex];
    if (!row) return "STAY";

    if (columnId && cellValue !== undefined) {
      row = { ...row, [columnId]: cellValue };
      update(rowIndex, row);
    }

    const qty = parseFloat((row as any).qty?.replace(/[^0-9.-]+/g, "") || "");
    const isValid = (row as any).item?.trim() !== "" && !isNaN(qty) && qty > 0;

    if (!isValid) {
      setRowErrors((prev) => ({ ...prev, [rowIndex]: true }));
      setTimeout(() => setRowErrors((prev) => ({ ...prev, [rowIndex]: false })), 800);
      return "STAY";
    }

    if ((row as any).isPhantom) {
      update(rowIndex, { ...row, isPhantom: false });
      append(generateEmptyRow(`row-${fields.length + 1}`));
      return "ADVANCE";
    }
    
    return "EXIT";
  }, [fields, update, append]);

  return {
    data: fields as VoucherRow[],
    rowErrors,
    updateData,
    onRowCommit,
    activeDetailsRowIndex,
    setActiveDetailsRowIndex,
  };
}
