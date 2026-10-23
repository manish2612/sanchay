import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UseFormReturn } from 'react-hook-form';
import { selectActiveFinancialYearId } from '@/store/authSlice';
import { useCreateLedgerMutation } from '../../api';
import { LedgerFormValues } from '../schema';
import { CreateLedgerRequest } from '../../types';
import { LEDGER_FORM_FIELDS } from '../constants';
import { useNavigate } from '@tanstack/react-router';
import { getErrorMessage } from '@/utils/errorUtils';

export const useCreateLedger = (form?: UseFormReturn<LedgerFormValues>) => {
  const [createLedger, { isLoading }] = useCreateLedgerMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdItemName, setCreatedItemName] = useState<string>('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const financialYearId = useSelector(selectActiveFinancialYearId);
  const navigate = useNavigate();

  // Auto-clear submission error when user edits any field
  useEffect(() => {
    if (!form) return;
    const subscription = form.watch(() => {
      if (submitError) {
        setSubmitError(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, submitError]);

  const onSubmit = async (data: LedgerFormValues) => {
    // Process tax rates from RHF state
    const rawTaxRates = data[LEDGER_FORM_FIELDS.TAX_RATES] || [];
    const validTaxRates = rawTaxRates.filter(
      (row) => !row.isPhantom && row.effective_from && row.tax_group_id,
    );

    const tax_rates = validTaxRates.map((row) => {
      const rawRate =
        typeof row.tax_rate === 'number'
          ? row.tax_rate
          : parseFloat(String(row.tax_rate || '0')) || 0;
      // Convert entered percentage (e.g. 18) to decimal percentage (0.1800)
      const ratePercentage = rawRate > 1 ? rawRate / 100 : rawRate;
      const effectiveFrom = row.effective_from
        ? new Date(row.effective_from).toISOString()
        : new Date().toISOString();
      const effectiveTo = row.effective_to
        ? new Date(row.effective_to).toISOString()
        : effectiveFrom;

      return {
        applicability: row.applicability || 'BOTH',
        effective_from: effectiveFrom,
        effective_to: effectiveTo,
        excise_tax_group_id: row.excise_tax_group_id || null,
        tax_group_id: row.tax_group_id,
        tax_rate: Number(ratePercentage.toFixed(4)),
      };
    });

    // Transform flat RHF data to nested API Payload
    const payload: CreateLedgerRequest = {
      account_group_id: data[LEDGER_FORM_FIELDS.PARENT] || null,
      address: {
        address: data[LEDGER_FORM_FIELDS.ADDRESS] || null,
        city: '', // Default
        country_id: data[LEDGER_FORM_FIELDS.COUNTRY] || null,
        postal_code: data[LEDGER_FORM_FIELDS.PINCODE] || null,
        state_id: data[LEDGER_FORM_FIELDS.STATE] || null,
      },
      alias: data[LEDGER_FORM_FIELDS.ALIAS] || '',
      bank_detail: {
        account_holder_name: '',
        account_number: '',
        bank_name: '',
        beneficiary_code: '',
        branch_name: '',
        routing_code: '',
        swift_code: '',
      },
      block_sales_on_credit_limit_exceed:
        data[LEDGER_FORM_FIELDS.BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED] || false,
      code: data[LEDGER_FORM_FIELDS.ACCOUNT_CODE] || '',
      contact: {
        cin_number: '', // Default
        contact_person: data[LEDGER_FORM_FIELDS.CONTACT_PERSON] || null,
        description: '', // Default
        email: data[LEDGER_FORM_FIELDS.EMAIL] || null,
        mobile_number: data[LEDGER_FORM_FIELDS.MOBILE_NUMBER] || null,
        registration_type: data[LEDGER_FORM_FIELDS.REGISTRATION_TYPE] || null,
        tax_identifier: data[LEDGER_FORM_FIELDS.REGISTRATION_NUMBER] || null,
        telephone_number: data[LEDGER_FORM_FIELDS.LANDLINE_NO] || null,
        whatsapp_number: data[LEDGER_FORM_FIELDS.WHATSAPP_NUMBER] || null,
      },
      credit_limit_amount: parseFloat(data[LEDGER_FORM_FIELDS.CREDIT_LIMIT] || '0'),
      credit_period_days: parseInt(data[LEDGER_FORM_FIELDS.CREDIT_PERIOD] || '0', 10),
      is_bill_wise_enabled: data[LEDGER_FORM_FIELDS.IS_BILL_BY_BILL] || false,
      is_cost_centre_enabled: data[LEDGER_FORM_FIELDS.IS_COST_CENTER_ENABLED] || false,
      name: data[LEDGER_FORM_FIELDS.NAME],
      opening_balance: parseFloat(data[LEDGER_FORM_FIELDS.OPENING_BALANCE] || '0'),
      opening_balance_type: data[LEDGER_FORM_FIELDS.OPENING_BALANCE_TYPE] || 'Dr',
      opening_balances: data[LEDGER_FORM_FIELDS.IS_COST_CENTER_ENABLED]
        ? (data[LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS] || [])
            .filter((alloc) => !alloc.isPhantom)
            .map((alloc) => ({
              amount: parseFloat(String(alloc.amount) || '0'),
              cost_centre_id: alloc.costCenterId || '',
              financial_year_id: financialYearId || '',
              ledger_id: '',
            }))
        : [],
      tax_rates,
      tax_type_id: null,
    };

    console.log('>>>> create Ledger ', payload);
    try {
      setSubmitError(null);
      const res = await createLedger(payload).unwrap();
      setCreatedItemName(res?.name || data[LEDGER_FORM_FIELDS.NAME] || '');
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to create ledger', error);
      const errMsg = getErrorMessage(error, 'Failed to create ledger. Please try again.');
      setSubmitError(errMsg);
    }
  };

  const resetSuccess = () => {
    setIsSuccess(false);
    setCreatedItemName('');
    form?.reset();
  };
  const clearSubmitError = () => setSubmitError(null);

  return {
    onSubmit,
    isSubmitting: isLoading,
    isSuccess,
    createdItemName,
    resetSuccess,
    navigate,
    submitError,
    clearSubmitError,
  };
};
