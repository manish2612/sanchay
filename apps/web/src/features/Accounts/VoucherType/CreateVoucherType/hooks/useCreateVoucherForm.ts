import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useLeavePrompt } from '@/hooks/useLeavePrompt';
import { useCreateVoucherSubmit, UseCreateVoucherSubmitOptions } from './useCreateVoucherSubmit';
import { voucherTypeSchema, type VoucherTypeFormValues } from '../schema';
import { VOUCHER_TYPE_FIELDS } from '../constants';
import { useGetVoucherTypeByIdQuery, useGetVoucherTypesQuery } from '../../api';
import { transformVoucherTypeResponseToForm } from '../transformers';

export interface UseCreateVoucherFormOptions extends UseCreateVoucherSubmitOptions {}

export const useCreateVoucherForm = (options: UseCreateVoucherFormOptions = {}) => {
  const { id, mode } = options;
  const isEditMode = mode === 'edit' && Boolean(id);
  const navigate = useNavigate();

  // Queries for edit mode hydration
  const {
    data: voucherTypeData,
    isLoading: isLoadingVoucherType,
    isError: isVoucherTypeError,
  } = useGetVoucherTypeByIdQuery(id!, { skip: !id || !isEditMode });

  const { data: voucherTypes = [] } = useGetVoucherTypesQuery();

  const form = useForm<VoucherTypeFormValues>({
    mode: 'onChange',
    resolver: zodResolver(voucherTypeSchema) as any,
    defaultValues: {
      [VOUCHER_TYPE_FIELDS.NAME]: '',
      [VOUCHER_TYPE_FIELDS.PARENT]: '',
      [VOUCHER_TYPE_FIELDS.DEFAULT_VIEWING_MODE]: '',
      [VOUCHER_TYPE_FIELDS.SET_AS_DEFAULT]: false,
      [VOUCHER_TYPE_FIELDS.DECLARATION]: '',
      [VOUCHER_TYPE_FIELDS.APPLY_TAX]: '',
      [VOUCHER_TYPE_FIELDS.VOUCHER_NUMBERING]: [],
      [VOUCHER_TYPE_FIELDS.CASH_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.BANK_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.SALES_PURCHASE_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.EXPORT_IMPORT_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.DISCOUNT_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.ROUNDING_OFF_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.EXCISE_DUTY_APPLICABLE]: false,
      [VOUCHER_TYPE_FIELDS.DISCOUNT_AT_BILL_LEVEL]: false,
      [VOUCHER_TYPE_FIELDS.DISCOUNT_AT_ITEM_LEVEL]: false,
      [VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_ITEM]: false,
      [VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_LEDGER]: false,
      [VOUCHER_TYPE_FIELDS.USE_FOR_POS]: false,
      [VOUCHER_TYPE_FIELDS.PRINT_CONFIGURABLE]: false,
      [VOUCHER_TYPE_FIELDS.PRINT_AFTER_SAVE]: false,
      [VOUCHER_TYPE_FIELDS.NEW_MODE_AFTER_SAVE]: false,
      [VOUCHER_TYPE_FIELDS.COL_FREE_QTY]: false,
      [VOUCHER_TYPE_FIELDS.COL_ALT_QTY]: false,
      [VOUCHER_TYPE_FIELDS.COL_RATE]: false,
      [VOUCHER_TYPE_FIELDS.COL_NET_RATE]: false,
      [VOUCHER_TYPE_FIELDS.COL_GROSS_AMOUNT]: false,
    },
  });

  // Hydrate form in edit mode when voucher type data arrives
  useEffect(() => {
    if (voucherTypeData && isEditMode) {
      const formValues = transformVoucherTypeResponseToForm(voucherTypeData, voucherTypes);
      form.reset(formValues);
    }
  }, [voucherTypeData, isEditMode, form, voucherTypes]);

  const { LeavePromptDialog } = useLeavePrompt({
    form,
    disabled: form.formState.isSubmitSuccessful,
  });

  const { onSubmit, isSuccess, error, reset, createdItemName } = useCreateVoucherSubmit({
    id,
    mode,
  });

  const handleCreateAnother = () => {
    form.reset();
    reset();
  };

  // Clear error automatically when user starts making changes again
  useEffect(() => {
    const subscription = form.watch(() => {
      if (error) {
        reset();
      }
    });
    return () => subscription.unsubscribe();
  }, [form, error, reset]);

  return {
    form,
    navigate,
    LeavePromptDialog,
    onSubmit,
    isSuccess,
    createdItemName,
    error,
    reset: handleCreateAnother,
    isEditMode,
    isLoadingVoucherType,
    isVoucherTypeError,
    voucherTypeData,
  };
};
