import { IconName } from '@prime/ui'; // Or standard lucide icon names

export const CREATION_MODES = {
  SHEET: 'sheet',
  PAGE: 'page',
} as const;

export type MasterConfig = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: string;
  group: 'accounting' | 'inventory';
  isPrimary?: boolean;
  creationMode?: typeof CREATION_MODES[keyof typeof CREATION_MODES];
  createHref?: string;
};

export const MASTERS_CONFIG: MasterConfig[] = [
  // Accounting Masters
  {
    id: 'group',
    label: 'Group',
    description: 'Organize your ledger hierarchy',
    href: '/accounts/masters/group',
    icon: 'Layers',
    group: 'accounting',
    creationMode: CREATION_MODES.SHEET,
    createHref: '/accounts/masters/group/new',
  },
  {
    id: 'ledger',
    label: 'Ledger',
    description: 'Manage customer, supplier & bank accounts',
    href: '/accounts/masters/ledger',
    icon: 'BookOpen',
    group: 'accounting',
    isPrimary: true,
    creationMode: CREATION_MODES.PAGE,
    createHref: '/accounts/masters/ledger/new',
  },
  {
    id: 'voucher-type',
    label: 'Voucher Type',
    description: 'Configure transaction entry types',
    href: '/accounts/masters/voucher-type',
    icon: 'FileText',
    group: 'accounting',
    isPrimary: true,
    creationMode: CREATION_MODES.PAGE,
    createHref: '/accounts/masters/voucher-type/new',
  },
  {
    id: 'cost-category',
    label: 'Cost Category',
    description: 'Classify cost allocation categories',
    href: '/accounts/masters/cost-category',
    icon: 'Tag',
    group: 'accounting',
    creationMode: CREATION_MODES.SHEET,
    createHref: '/accounts/masters/cost-category/new',
  },
  {
    id: 'cost-centre',
    label: 'Cost Centre',
    description: 'Track departmental cost allocation',
    href: '/accounts/masters/cost-centre',
    icon: 'Target',
    group: 'accounting',
    creationMode: CREATION_MODES.SHEET,
    createHref: '/accounts/masters/cost-centre/new',
  },
  {
    id: 'tax-group',
    label: 'Tax Group',
    description: 'Manage tax rate configurations',
    href: '/accounts/masters/tax-group',
    icon: 'Percent',
    group: 'accounting',
    creationMode: CREATION_MODES.SHEET,
    createHref: '/accounts/masters/tax-group/new',
  },
  // Inventory Masters
  {
    id: 'stock-group',
    label: 'Stock Group',
    description: 'Organize your stock hierarchy',
    href: '/inventory/masters/stock-group',
    icon: 'FolderOpen',
    group: 'inventory',
    creationMode: CREATION_MODES.SHEET,
    createHref: '/inventory/masters/stock-group/new',
  },
  {
    id: 'stock-category',
    label: 'Stock Category',
    description: 'Classify items by category',
    href: '/inventory/masters/stock-category',
    icon: 'LayoutGrid',
    group: 'inventory',
    creationMode: CREATION_MODES.SHEET,
    createHref: '/inventory/masters/stock-category/new',
  },
  {
    id: 'unit-of-measure',
    label: 'Unit of Measure',
    description: 'Define measurement units',
    href: '/inventory/masters/unit-of-measure',
    icon: 'Ruler',
    group: 'inventory',
    creationMode: CREATION_MODES.SHEET,
    createHref: '/inventory/masters/unit-of-measure/new',
  },
  {
    id: 'stock-item',
    label: 'Stock Item',
    description: 'Manage your product catalog',
    href: '/inventory/masters/stock-item',
    icon: 'Package',
    group: 'inventory',
    isPrimary: true,
    creationMode: CREATION_MODES.PAGE,
    createHref: '/inventory/masters/stock-item/new',
  },
  {
    id: 'godown',
    label: 'Godown',
    description: 'Configure storage locations',
    href: '/inventory/masters/godown',
    icon: 'Warehouse',
    group: 'inventory',
    creationMode: CREATION_MODES.SHEET,
    createHref: '/inventory/masters/godown/new',
  }
];

export const MASTER_GROUPS = [
  { id: 'accounting', label: 'Accounting Masters' },
  { id: 'inventory', label: 'Inventory Masters' },
] as const;
