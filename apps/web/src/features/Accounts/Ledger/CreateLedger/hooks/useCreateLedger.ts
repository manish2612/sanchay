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
    // Transform flat RHF data to nested API Payload
    const payload: CreateLedgerRequest = {
      account_group_id: data[LEDGER_FORM_FIELDS.PARENT] || "",
      address: {
        address: data[LEDGER_FORM_FIELDS.ADDRESS] || "",
        city: "", // Default
        country_id: data[LEDGER_FORM_FIELDS.COUNTRY] || "",
        postal_code: data[LEDGER_FORM_FIELDS.PINCODE] || "",
        state_id: data[LEDGER_FORM_FIELDS.STATE] || ""
      },
      alias: data[LEDGER_FORM_FIELDS.ALIAS] || "",
      block_sales_on_credit_limit_exceed: data[LEDGER_FORM_FIELDS.BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED] || false,
      code: data[LEDGER_FORM_FIELDS.ACCOUNT_CODE] || "",
      contact: {
        cin_number: "", // Default
        contact_person: data[LEDGER_FORM_FIELDS.CONTACT_PERSON] || "",
        description: "", // Default
        email: data[LEDGER_FORM_FIELDS.EMAIL] || "",
        mobile_number: data[LEDGER_FORM_FIELDS.MOBILE_NUMBER] || "",
        registration_type: data[LEDGER_FORM_FIELDS.REGISTRATION_TYPE] || "",
        tax_identifier: data[LEDGER_FORM_FIELDS.REGISTRATION_NUMBER] || "",
        telephone_number: data[LEDGER_FORM_FIELDS.LANDLINE_NO] || "",
        whatsapp_number: data[LEDGER_FORM_FIELDS.WHATSAPP_NUMBER] || ""
      },
      credit_limit_amount: parseFloat(data[LEDGER_FORM_FIELDS.CREDIT_LIMIT] || "0"),
      credit_period_days: parseInt(data[LEDGER_FORM_FIELDS.CREDIT_PERIOD] || "0", 10),
      is_bill_wise_enabled: data[LEDGER_FORM_FIELDS.IS_BILL_BY_BILL] || false,
      is_cost_centre_enabled: data[LEDGER_FORM_FIELDS.IS_COST_CENTER_ENABLED] || false,
      name: data[LEDGER_FORM_FIELDS.NAME],
      opening_balance: parseFloat(data[LEDGER_FORM_FIELDS.OPENING_BALANCE] || "0"),
      opening_balance_type: data[LEDGER_FORM_FIELDS.OPENING_BALANCE_TYPE] || "",
      opening_balances: data[LEDGER_FORM_FIELDS.IS_COST_CENTER_ENABLED]
        ? (data[LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS] || []).map(alloc => ({
            amount: parseFloat(String(alloc.amount) || "0"),
            cost_centre_id: alloc.costCenterId || "",
            financial_year_id: financialYearId, 
            ledger_id: ""
          }))
        : [],
      tax_rates: [], // Default
      tax_type_id: null, // Default
    };

    try {
      setSubmitError(null);
      await createLedger(payload).unwrap();
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to create ledger", error);
      const errMsg = getErrorMessage(error, "Failed to create ledger. Please try again.");
      setSubmitError(errMsg);
    }
  };

  const resetSuccess = () => setIsSuccess(false);
  const clearSubmitError = () => setSubmitError(null);

  return {
    onSubmit,
    isSubmitting: isLoading,
    isSuccess,
    resetSuccess,
    navigate,
    submitError,
    clearSubmitError,
  };
};
