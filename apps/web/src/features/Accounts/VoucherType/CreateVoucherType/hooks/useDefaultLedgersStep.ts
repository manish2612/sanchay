import { useMemo } from 'react';
import { useLedgerOptions } from '@/features/Accounts/Ledger/hooks/useLedgerOptions';
import type { Ledger } from '@/features/Accounts/Ledger/types';
import { LEDGER_SUB_CATEGORIES } from '../constants';

export const isCashLedger = (ledger: Ledger): boolean =>
  ledger.sub_category?.toUpperCase() === LEDGER_SUB_CATEGORIES.CASH;

export const isBankLedger = (ledger: Ledger): boolean =>
  ledger.sub_category?.toUpperCase() === LEDGER_SUB_CATEGORIES.BANK;

export const isSalesPurchaseLedger = (ledger: Ledger): boolean => {
  const sub = ledger.sub_category?.toUpperCase();
  return sub === LEDGER_SUB_CATEGORIES.SALES || sub === LEDGER_SUB_CATEGORIES.PURCHASE;
};

export const isExportImportLedger = (ledger: Ledger): boolean => {
  const sub = ledger.sub_category?.toUpperCase();
  return sub === LEDGER_SUB_CATEGORIES.SALES || sub === LEDGER_SUB_CATEGORIES.PURCHASE;
};

export const isDiscountLedger = (ledger: Ledger): boolean => {
  const sub = ledger.sub_category?.toUpperCase();
  return (
    sub === LEDGER_SUB_CATEGORIES.INDIRECT_INCOME ||
    sub === LEDGER_SUB_CATEGORIES.INDIRECT_EXPENSE ||
    sub === LEDGER_SUB_CATEGORIES.DIRECT_INCOME ||
    sub === LEDGER_SUB_CATEGORIES.DIRECT_EXPENSE
  );
};

export const isRoundingOffLedger = (ledger: Ledger): boolean => {
  const sub = ledger.sub_category?.toUpperCase();
  return (
    sub === LEDGER_SUB_CATEGORIES.INDIRECT_INCOME ||
    sub === LEDGER_SUB_CATEGORIES.INDIRECT_EXPENSE ||
    sub === LEDGER_SUB_CATEGORIES.DIRECT_INCOME ||
    sub === LEDGER_SUB_CATEGORIES.DIRECT_EXPENSE
  );
};

export function useDefaultLedgersStep() {
  const { rawLedgers, isLoading, error, refetch } = useLedgerOptions();

  const cashOptions = useMemo(
    () =>
      rawLedgers
        .filter(isCashLedger)
        .map((ledger) => ({ label: ledger.name, value: ledger.id })),
    [rawLedgers]
  );

  const bankOptions = useMemo(
    () =>
      rawLedgers
        .filter(isBankLedger)
        .map((ledger) => ({ label: ledger.name, value: ledger.id })),
    [rawLedgers]
  );

  const salesPurchaseOptions = useMemo(
    () =>
      rawLedgers
        .filter(isSalesPurchaseLedger)
        .map((ledger) => ({ label: ledger.name, value: ledger.id })),
    [rawLedgers]
  );

  const exportImportOptions = useMemo(
    () =>
      rawLedgers
        .filter(isExportImportLedger)
        .map((ledger) => ({ label: ledger.name, value: ledger.id })),
    [rawLedgers]
  );

  const discountOptions = useMemo(
    () =>
      rawLedgers
        .filter(isDiscountLedger)
        .map((ledger) => ({ label: ledger.name, value: ledger.id })),
    [rawLedgers]
  );

  const roundingOffOptions = useMemo(
    () =>
      rawLedgers
        .filter(isRoundingOffLedger)
        .map((ledger) => ({ label: ledger.name, value: ledger.id })),
    [rawLedgers]
  );

  return {
    isLoading,
    error,
    refetch,
    rawLedgers,
    cashOptions,
    bankOptions,
    salesPurchaseOptions,
    exportImportOptions,
    discountOptions,
    roundingOffOptions,
  };
}
