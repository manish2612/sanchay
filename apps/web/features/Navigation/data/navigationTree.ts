import { IconName } from '@prime/ui';

export type NavItemConfig = {
  id: string;
  label: string;
  icon?: IconName | (string & {});
  href?: string;
  children?: NavItemConfig[];
};

export const NAVIGATION_TREE: NavItemConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    href: '/dashboard',
  },
  {
    id: 'company-settings',
    label: 'Company Settings',
    icon: 'Briefcase',
    children: [
      { id: 'company-profile', label: 'Company Profile', href: '/settings/profile' },
      { id: 'user-management', label: 'User Management', href: '/settings/users' },
      { id: 'billing', label: 'Billing & Subscriptions', href: '/settings/billing' },
    ],
  },
  {
    id: 'chart-of-accounts',
    label: 'Chart of Accounts',
    icon: 'Landmark',
    children: [
      {
        id: 'accounting-masters',
        label: 'Accounting Masters',
        children: [
          { id: 'ledgers', label: 'Ledgers', href: '/accounts/ledgers' },
          { id: 'groups', label: 'Groups', href: '/accounts/groups' },
          { id: 'cost-centers', label: 'Cost Centers', href: '/accounts/cost-centers' },
        ],
      },
      {
        id: 'inventory-masters',
        label: 'Inventory Masters',
        children: [
          { id: 'stock-items', label: 'Stock Items', href: '/inventory/items' },
          { id: 'stock-groups', label: 'Stock Groups', href: '/inventory/groups' },
          { id: 'warehouses', label: 'Warehouses', href: '/inventory/warehouses' },
        ],
      },
    ],
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: 'ReceiptText',
    children: [
      {
        id: 'sales',
        label: 'Sales (AR)',
        children: [
          { id: 'invoices', label: 'Invoices', href: '/sales/invoices' },
          { id: 'credit-notes', label: 'Credit Notes', href: '/sales/credit-notes' },
          { id: 'receipts', label: 'Receipts', href: '/sales/receipts' },
        ],
      },
      {
        id: 'purchases',
        label: 'Purchases (AP)',
        children: [
          { id: 'bills', label: 'Bills', href: '/purchases/bills' },
          { id: 'debit-notes', label: 'Debit Notes', href: '/purchases/debit-notes' },
          { id: 'payments', label: 'Payments', href: '/purchases/payments' },
        ],
      },
      { id: 'journal-entries', label: 'Journal Entries', href: '/transactions/journals' },
      { id: 'vouchers', label: 'Vouchers', href: '/transactions/vouchers' },
    ],
  },
  {
    id: 'reporting',
    label: 'Reporting',
    icon: 'LineChart',
    children: [
      { id: 'ird-reports', label: 'IRD Reports', href: '/reports/ird' },
      { id: 'balance-sheet', label: 'Balance Sheet', href: '/reports/balance-sheet' },
      { id: 'profit-loss', label: 'Profit & Loss', href: '/reports/profit-loss' },
      { id: 'cash-flow', label: 'Cash Flow Statement', href: '/reports/cash-flow' },
      { id: 'tax-summaries', label: 'Tax Summaries', href: '/reports/tax' },
    ],
  },
  {
    id: 'configuration',
    label: 'Configuration',
    icon: 'Settings',
    children: [
      { id: 'voucher-settings', label: 'Voucher Settings', href: '/config/vouchers' },
      { id: 'statutory-settings', label: 'Statutory Settings', href: '/config/statutory' },
      { id: 'integrations', label: 'Integrations (API/CBMS)', href: '/config/integrations' },
      { id: 'print-templates', label: 'Print Templates', href: '/config/templates' },
    ],
  },
  {
    id: 'help-support',
    label: 'Help & Support',
    icon: 'CircleHelp',
    children: [
      { id: 'documentation', label: 'Documentation', href: '/support/docs' },
      { id: 'contact-support', label: 'Contact Support', href: '/support/contact' },
    ],
  },
];
