import { format } from 'date-fns';
import type { Ledger } from '../types';
import type { LedgerFormValues } from './schema';
import { LEDGER_FORM_FIELDS } from './constants';
import {
  CostCenterAllocationRow,
  createDefaultCostCenterPhantomRow,
} from '@/features/CostCenter/components/CostCenterAllocationTable';
import {
  TaxRateRow,
  createDefaultPhantomRow,
} from '@/components/TaxRatesTable';
import type { CostCenter } from '@/features/CostCenter/api';
import type { TaxGroupResponse } from '@/features/Masters/types/taxGroup';

export interface TransformLedgerContext {
  costCenters?: CostCenter[];
  taxGroups?: TaxGroupResponse[];
}

const safeFormatDate = (dateVal?: string | Date | null): string => {
  if (!dateVal) return '';
  try {
    const d = typeof dateVal === 'string' ? new Date(dateVal) : dateVal;
    if (!isNaN(d.getTime())) {
      return format(d, 'yyyy-MM-dd');
    }
  } catch {
    // fallback
  }
  return typeof dateVal === 'string' ? dateVal.split('T')[0] : '';
};

export const transformLedgerResponseToForm = (
  ledger: Ledger,
  context?: TransformLedgerContext
): LedgerFormValues => {
  const { costCenters = [], taxGroups = [] } = context || {};

  // 1. Cost Center Allocations
  const isCostCenterEnabled = Boolean(
    ledger.is_cost_centre_enabled ?? ledger.is_cost_entre_enabled
  );

  const rawAllocations = ledger.opening_balances || [];
  const validAllocations = rawAllocations.filter(
    (b) => Boolean(b.cost_centre_id) || (typeof b.amount === 'number' && b.amount > 0)
  );

  const costCenterAllocations: CostCenterAllocationRow[] = validAllocations.map(
    (alloc, index) => {
      const matchedCenter = costCenters.find((c) => c.id === alloc.cost_centre_id);
      return {
        id: alloc.id || `alloc-${alloc.cost_centre_id}-${index}`,
        costCenterId: alloc.cost_centre_id,
        costCenter: matchedCenter?.name || '',
        costCategory: matchedCenter?.cost_category_name || '',
        costCategoryId: (matchedCenter as any)?.cost_category_id || '',
        amount: alloc.amount,
        isPhantom: false,
      };
    }
  );
  // Always append a pristine phantom row for new inputs
  costCenterAllocations.push(
    createDefaultCostCenterPhantomRow(`cc-row-${costCenterAllocations.length + 1}`)
  );

  // 2. Tax Rates
  const rawTaxRates = ledger.tax_rates || [];
  const taxRates: TaxRateRow[] = rawTaxRates.map((tr, index) => {
    const rawTg = Array.isArray(tr.tax_group) ? tr.tax_group[0] : (tr.tax_group as any);
    const matchedTg = taxGroups.find(
      (tg) =>
        (rawTg?.taxgroup_code && tg.code.toLowerCase() === rawTg.taxgroup_code.toLowerCase()) ||
        (rawTg?.taxgroup_name && tg.name.toLowerCase() === rawTg.taxgroup_name.toLowerCase()) ||
        (rawTg?.id && tg.id === rawTg.id)
    );

    const rawRateNum = parseFloat(String(tr.tax_rate ?? '0')) || 0;
    // Normalize decimal rate to percentage (e.g. 0.18 -> 18)
    const rateDisplay =
      rawTg?.taxgroup_combined_rate !== undefined
        ? Number(rawTg.taxgroup_combined_rate)
        : rawRateNum > 0 && rawRateNum <= 1
          ? Math.round(rawRateNum * 10000) / 100
          : rawRateNum;

    const applicability = (tr.applicability?.toUpperCase() || 'BOTH') as
      | 'GOODS'
      | 'SERVICES'
      | 'BOTH';

    return {
      id: (tr as any).id || `tax-rate-${index + 1}`,
      effective_from: safeFormatDate(tr.effective_from),
      effective_to: safeFormatDate((tr as any).effective_to),
      tax_group_id: matchedTg?.id || (tr as any).tax_group_id || '',
      excise_tax_group_id: (tr as any).excise_tax_group_id || '',
      applicability,
      tax_rate: rateDisplay,
      isPhantom: false,
    };
  });
  // Always append a pristine phantom row for new inputs
  taxRates.push(createDefaultPhantomRow());

  // 3. Opening Balance & Type
  const openingBalance = ledger.opening_balance
    ? String(ledger.opening_balance)
    : '';
  const openingBalanceType = (ledger.opening_balance_type as 'Dr' | 'Cr') || 'Dr';

  return {
    // Step 1: General Info
    [LEDGER_FORM_FIELDS.NAME]: ledger.name || '',
    [LEDGER_FORM_FIELDS.ALIAS]: ledger.alias || '',
    [LEDGER_FORM_FIELDS.PARENT]: ledger.parent_id || '',
    [LEDGER_FORM_FIELDS.ACCOUNT_CODE]: ledger.code || '',
    [LEDGER_FORM_FIELDS.REGISTRATION_TYPE]:
      ledger.contact?.registration_type || '',
    [LEDGER_FORM_FIELDS.REGISTRATION_NUMBER]:
      ledger.contact?.tax_identifier || '',

    // Step 2: Billing & Credit
    [LEDGER_FORM_FIELDS.IS_BILL_BY_BILL]: Boolean(ledger.is_bill_wise_enabled),
    [LEDGER_FORM_FIELDS.CREDIT_PERIOD]:
      ledger.credit_period_days !== undefined && ledger.credit_period_days !== null
        ? String(ledger.credit_period_days)
        : '',
    [LEDGER_FORM_FIELDS.CREDIT_LIMIT]:
      ledger.credit_limit_amount !== undefined && ledger.credit_limit_amount !== null
        ? String(ledger.credit_limit_amount)
        : '',
    [LEDGER_FORM_FIELDS.BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED]: Boolean(
      ledger.block_sales_on_credit_limit_exceed
    ),
    [LEDGER_FORM_FIELDS.OPENING_BALANCE]: openingBalance,
    [LEDGER_FORM_FIELDS.OPENING_BALANCE_TYPE]: openingBalanceType,
    [LEDGER_FORM_FIELDS.IS_COST_CENTER_ENABLED]: isCostCenterEnabled,
    [LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS]: costCenterAllocations,
    [LEDGER_FORM_FIELDS.TAX_RATES]: taxRates,

    // Step 3: Address
    [LEDGER_FORM_FIELDS.COUNTRY]: ledger.address?.country_id || '',
    [LEDGER_FORM_FIELDS.STATE]: ledger.address?.state_id || '',
    [LEDGER_FORM_FIELDS.ADDRESS]: ledger.address?.address || '',
    [LEDGER_FORM_FIELDS.PINCODE]: ledger.address?.postal_code || '',

    // Step 4: Contact
    [LEDGER_FORM_FIELDS.CONTACT_PERSON]:
      ledger.contact?.contact_person || '',
    [LEDGER_FORM_FIELDS.EMAIL]: ledger.contact?.email || '',
    [LEDGER_FORM_FIELDS.MOBILE_NUMBER]:
      ledger.contact?.mobile_number || '',
    [LEDGER_FORM_FIELDS.WHATSAPP_NUMBER]:
      ledger.contact?.whatsapp_number || '',
    [LEDGER_FORM_FIELDS.LANDLINE_NO]:
      ledger.contact?.telephone_number || '',
  };
};
