import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { GroupDetail } from '@/features/Masters/api/groupsApi';

export type MockGroupRecord = GroupDetail & { parent_id?: string | null };

export const mockGroups: MockGroupRecord[] = [
  // Primary (Top-level) Groups
  {
    id: 'grp-capital-acc',
    name: 'Capital Account',
    alias: 'CAP',
    category: 'Liabilities',
    classification: 'Capital',
    display_order: 1,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-current-assets',
    name: 'Current Assets',
    alias: 'CA',
    category: 'Assets',
    classification: 'Assets',
    display_order: 2,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-current-liabilities',
    name: 'Current Liabilities',
    alias: 'CL',
    category: 'Liabilities',
    classification: 'Liabilities',
    display_order: 3,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-fixed-assets',
    name: 'Fixed Assets',
    alias: 'FA',
    category: 'Assets',
    classification: 'Assets',
    display_order: 4,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-investments',
    name: 'Investments',
    alias: 'INV',
    category: 'Assets',
    classification: 'Assets',
    display_order: 5,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-loans-liability',
    name: 'Loans (Liability)',
    alias: 'LOAN-L',
    category: 'Liabilities',
    classification: 'Liabilities',
    display_order: 6,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-sales-accounts',
    name: 'Sales Accounts',
    alias: 'SALES',
    category: 'Income',
    classification: 'Revenue',
    display_order: 7,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-purchase-accounts',
    name: 'Purchase Accounts',
    alias: 'PURCH',
    category: 'Expenses',
    classification: 'Expense',
    display_order: 8,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-direct-incomes',
    name: 'Direct Incomes',
    alias: 'DIR-INC',
    category: 'Income',
    classification: 'Revenue',
    display_order: 9,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-indirect-incomes',
    name: 'Indirect Incomes',
    alias: 'INDIR-INC',
    category: 'Income',
    classification: 'Revenue',
    display_order: 10,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-direct-expenses',
    name: 'Direct Expenses',
    alias: 'DIR-EXP',
    category: 'Expenses',
    classification: 'Expense',
    display_order: 11,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-indirect-expenses',
    name: 'Indirect Expenses',
    alias: 'INDIR-EXP',
    category: 'Expenses',
    classification: 'Expense',
    display_order: 12,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },
  {
    id: 'grp-suspense-acc',
    name: 'Suspense A/c',
    alias: 'SUSP',
    category: 'Liabilities',
    classification: 'Liabilities',
    display_order: 13,
    is_active: true,
    is_predefined: true,
    parent_id: null,
  },

  // Subgroups (Child of Current Assets)
  {
    id: 'grp-bank-accounts',
    name: 'Bank Accounts',
    alias: 'BANK',
    category: 'Assets',
    classification: 'Assets',
    display_order: 14,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-current-assets',
  },
  {
    id: 'grp-cash-in-hand',
    name: 'Cash-in-Hand',
    alias: 'CASH',
    category: 'Assets',
    classification: 'Assets',
    display_order: 15,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-current-assets',
  },
  {
    id: 'grp-deposits-asset',
    name: 'Deposits (Asset)',
    alias: 'DEP',
    category: 'Assets',
    classification: 'Assets',
    display_order: 16,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-current-assets',
  },
  {
    id: 'grp-loans-adv-asset',
    name: 'Loans & Advances (Asset)',
    alias: 'LNA',
    category: 'Assets',
    classification: 'Assets',
    display_order: 17,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-current-assets',
  },
  {
    id: 'grp-stock-in-hand',
    name: 'Stock-in-Hand',
    alias: 'STOCK',
    category: 'Assets',
    classification: 'Assets',
    display_order: 18,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-current-assets',
  },
  {
    id: 'grp-sundry-debtors',
    name: 'Sundry Debtors',
    alias: 'DEBT',
    category: 'Assets',
    classification: 'Assets',
    display_order: 19,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-current-assets',
  },

  // Subgroups (Child of Current Liabilities)
  {
    id: 'grp-duties-taxes',
    name: 'Duties & Taxes',
    alias: 'TAX',
    category: 'Liabilities',
    classification: 'Liabilities',
    display_order: 20,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-current-liabilities',
  },
  {
    id: 'grp-provisions',
    name: 'Provisions',
    alias: 'PROV',
    category: 'Liabilities',
    classification: 'Liabilities',
    display_order: 21,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-current-liabilities',
  },
  {
    id: 'grp-sundry-creditors',
    name: 'Sundry Creditors',
    alias: 'CRED',
    category: 'Liabilities',
    classification: 'Liabilities',
    display_order: 22,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-current-liabilities',
  },

  // Subgroups (Child of Capital Account)
  {
    id: 'grp-reserves-surplus',
    name: 'Reserves & Surplus',
    alias: 'RES',
    category: 'Liabilities',
    classification: 'Capital',
    display_order: 23,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-capital-acc',
  },

  // Subgroups (Child of Loans Liability)
  {
    id: 'grp-bank-od',
    name: 'Bank OD A/c',
    alias: 'OD',
    category: 'Liabilities',
    classification: 'Liabilities',
    display_order: 24,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-loans-liability',
  },
  {
    id: 'grp-secured-loans',
    name: 'Secured Loans',
    alias: 'SEC-LN',
    category: 'Liabilities',
    classification: 'Liabilities',
    display_order: 25,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-loans-liability',
  },
  {
    id: 'grp-unsecured-loans',
    name: 'Unsecured Loans',
    alias: 'UNSEC-LN',
    category: 'Liabilities',
    classification: 'Liabilities',
    display_order: 26,
    is_active: true,
    is_predefined: true,
    parent_id: 'grp-loans-liability',
  },

  // Custom User-Defined Groups
  {
    id: 'grp-north-debtors',
    name: 'North Region Debtors',
    alias: 'NR-DEBT',
    category: 'Assets',
    classification: 'Assets',
    display_order: 27,
    is_active: true,
    is_predefined: false,
    parent_id: 'grp-sundry-debtors',
  },
  {
    id: 'grp-admin-expenses',
    name: 'Office Administrative Expenses',
    alias: 'ADMIN-EXP',
    category: 'Expenses',
    classification: 'Expense',
    display_order: 28,
    is_active: true,
    is_predefined: false,
    parent_id: 'grp-indirect-expenses',
  },
  {
    id: 'grp-marketing-expenses',
    name: 'Marketing & Promotion',
    alias: 'MKTG',
    category: 'Expenses',
    classification: 'Expense',
    display_order: 29,
    is_active: true,
    is_predefined: false,
    parent_id: 'grp-indirect-expenses',
  },
];

export const getGroupsHandler = http.get(
  '*/api/v1/accounting/groups',
  async () => {
    if (!isMockEnabled('accounting', 'getGroups')) return;
    await delay(300);
    return HttpResponse.json(mockGroups);
  }
);

export const getGroupByIdHandler = http.get(
  '*/api/v1/accounting/groups/:id',
  async ({ params }) => {
    if (!isMockEnabled('accounting', 'getGroups')) return;
    await delay(300);
    const { id } = params;
    const group = mockGroups.find((g) => g.id === id);
    if (group) {
      return HttpResponse.json(group);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const updateGroupHandler = http.put(
  '*/api/v1/accounting/groups/:id',
  async ({ params, request }) => {
    if (!isMockEnabled('accounting', 'getGroups')) return;
    await delay(300);
    const { id } = params;
    const body = (await request.json()) as any;
    const index = mockGroups.findIndex((g) => g.id === id);
    if (index !== -1) {
      mockGroups[index] = {
        ...mockGroups[index],
        name: body.name ?? mockGroups[index].name,
        alias: body.alias !== undefined ? body.alias : mockGroups[index].alias,
        parent_id: body.parent_id !== undefined ? body.parent_id : mockGroups[index].parent_id,
      };
      return HttpResponse.json(mockGroups[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const deleteGroupHandler = http.delete(
  '*/api/v1/accounting/groups/:id',
  async ({ params }) => {
    if (!isMockEnabled('accounting', 'getGroups')) return;
    await delay(300);
    const { id } = params;
    const index = mockGroups.findIndex((g) => g.id === id);
    if (index !== -1) {
      mockGroups.splice(index, 1);
      return HttpResponse.json({ message: 'Operation completed successfully' });
    }
    return new HttpResponse(null, { status: 404 });
  }
);
