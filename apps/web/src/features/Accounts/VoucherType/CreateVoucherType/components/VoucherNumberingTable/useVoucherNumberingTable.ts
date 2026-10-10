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
        numbering_type: '',
        effective_from: '',
        reset_on: '',
        prefix: '',
        starting_number: 1,
        suffix: '',
        prefill_padding: undefined,
        isPhantom: true,
      });
    }
  }, [fields.length, append]);

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    // Instead of using the stale fields array, we directly use form.setValue
    // This instantly updates the underlying RHF state and triggers re-validation,
    // avoiding race conditions when users type fast.
    form.setValue(`${VOUCHER_TYPE_FIELDS.VOUCHER_NUMBERING}.${rowIndex}.${columnId}`, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [form]);

  const removeRow = useCallback((rowIndex: number) => {
    // Prevent removing if it's the only row and it's a phantom row
    if (fields.length === 1 && (fields[0] as any).isPhantom) {
      return;
    }
    remove(rowIndex);
  }, [fields, remove]);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string, cellValue?: string) => {
    // Fetch the absolute latest row data straight from RHF to bypass any React state render delays
    let row = form.getValues(`${VOUCHER_TYPE_FIELDS.VOUCHER_NUMBERING}.${rowIndex}`);
    if (!row) return "EXIT";

    if (columnId && cellValue !== undefined) {
      row = { ...row, [columnId]: cellValue };
      updateData(rowIndex, columnId, cellValue);
    }

    const isValid = 
      row.numbering_type?.trim() !== "" && 
      row.effective_from != null && row.effective_from !== "" && 
      row.reset_on?.trim() !== "" && 
      Number(row.starting_number) >= 1;

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
        numbering_type: '',
        effective_from: '',
        reset_on: '',
        prefix: '',
        starting_number: 1,
        suffix: '',
        prefill_padding: undefined,
        isPhantom: true,
      };

      // We read the absolute latest array state from RHF before pushing the phantom row
      const currentFields = form.getValues(VOUCHER_TYPE_FIELDS.VOUCHER_NUMBERING) || [];
      const newFields = [...currentFields];
      newFields[rowIndex] = committedRow;
      newFields.push(newPhantomRow);

      replace(newFields);
      return "ADVANCE";
    }
    return "EXIT";
  }, [form, replace, updateData]);

  return {
    fields,
    updateData,
    removeRow,
    onRowCommit,
    rowErrors,
  };
};
