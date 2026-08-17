import { useCallback, useEffect, useRef, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { VOUCHER_TYPE_FIELDS } from '../../constants';

export const useVoucherNumberingTable = (form: any) => {
  const { fields, append, update, remove, replace } = useFieldArray({
    control: form.control,
    name: VOUCHER_TYPE_FIELDS.VOUCHER_NUMBERING,
  });

  const hasAppendedInitial = useRef(false);
  const [rowErrors, setRowErrors] = useState<Record<number, boolean>>({});

  // Always maintain at least one phantom row
  useEffect(() => {
    if (fields.length === 0 && !hasAppendedInitial.current) {
      hasAppendedInitial.current = true;
      append({
        type: '',
        fromDate: '',
        reset: '',
        prefix: '',
        startingNo: 1,
        suffix: '',
        prefillWidth: undefined,
        isPhantom: true,
      });
    }
  }, [fields.length, append]);

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    const row = fields[rowIndex];
    if (row) {
      update(rowIndex, { ...row, [columnId]: value });
    }
  }, [fields, update]);

  const removeRow = useCallback((rowIndex: number) => {
    // Prevent removing if it's the only row and it's a phantom row
    if (fields.length === 1 && (fields[0] as any).isPhantom) {
      return;
    }
    remove(rowIndex);
  }, [fields, remove]);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string, cellValue?: string) => {
    let row = fields[rowIndex];
    if (!row) return "EXIT";

    if (columnId && cellValue !== undefined) {
      row = { ...row, [columnId]: cellValue };
      updateData(rowIndex, columnId, cellValue);
    }

    const isValid = 
      row.type?.trim() !== "" && 
      row.fromDate != null && row.fromDate !== "" && 
      row.reset?.trim() !== "" && 
      Number(row.startingNo) >= 1;

    if (!isValid) {
      setRowErrors((prev: any) => ({ ...prev, [rowIndex]: true }));
      setTimeout(() => {
        setRowErrors((prev: any) => ({ ...prev, [rowIndex]: false }));
      }, 800);
      return "STAY";
    }

    if ((row as any).isPhantom) {
      const committedRow = { ...row, isPhantom: false };
      
      const newPhantomRow = {
        type: '',
        fromDate: '',
        reset: '',
        prefix: '',
        startingNo: 1,
        suffix: '',
        prefillWidth: undefined,
        isPhantom: true,
      };

      const newFields = [...fields];
      newFields[rowIndex] = committedRow;
      newFields.push(newPhantomRow);

      replace(newFields);
      return "ADVANCE";
    }
    return "EXIT";
  }, [fields, replace, updateData]);

  return {
    fields,
    updateData,
    removeRow,
    onRowCommit,
    rowErrors,
  };
};
