import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveCompanyId } from '@/store/authSlice';
import { useCreateVoucherMutation } from '../api';
import { useVoucherPayloadGenerator } from './useVoucherPayloadGenerator';
import { VoucherFormValues } from '../schema/voucherSchema';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { ToastAction } from '@prime/ui';

export type ToastMessageState = {
  title: string;
  desc: string;
  variant: 'success' | 'destructive';
  action?: React.ReactNode;
} | null;

export function useVoucherSubmit() {
  const [createVoucher, { isLoading }] = useCreateVoucherMutation();
  const activeCompanyId = useSelector(selectActiveCompanyId);
  const { generatePayload } = useVoucherPayloadGenerator();
  const [toastMessage, setToastMessage] = useState<ToastMessageState>(null);

  const { reset } = useFormContext<VoucherFormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: VoucherFormValues, intent: 'new' | 'close') => {
    try {
      const apiPayload = generatePayload(data);
      console.log('Final API Payload:', apiPayload);

      const response = await createVoucher({
        payload: apiPayload,
        companyId: activeCompanyId,
      }).unwrap();

      console.log('Voucher saved successfully:', response);

      if (intent === 'close') {
        setToastMessage({
          title: 'Success',
          desc: 'Voucher saved successfully.',
          variant: 'success',
        });
        // Navigate to list view
        navigate({ to: '/transactions/vouchers' });
      } else {
        // Smart Reset for Save & New
        reset({
          ...data,
          voucherNo: '',
          referenceNo: '',
          partyAccount: '',
          narration: '',
          ledgerEntries: [
            {
              id: 'row-1',
              name: '',
              amount: '',
              debitAmount: '',
              creditAmount: '',
              vatAmt: '',
              isPhantom: true,
            } as any,
          ],
        });

        const createdVoucherId = response?.id || response?.data?.id;

        setToastMessage({
          title: 'Success',
          desc: 'Voucher saved successfully.',
          variant: 'success',
          action: createdVoucherId ? (
            <ToastAction altText="View Voucher" onClick={() => navigate({ to: `/masters` })}>
              View Voucher
            </ToastAction>
          ) : undefined,
        });
      }
    } catch (error) {
      console.error('Failed to save voucher:', error);
      const errMsg = (error as any)?.data?.message || 'Failed to save voucher. Please try again.';
      setToastMessage({ title: 'Error', desc: errMsg, variant: 'destructive' });
    }
  };

  return { onSubmit, isSubmitting: isLoading, toastMessage, setToastMessage };
}
