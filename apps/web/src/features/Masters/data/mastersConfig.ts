import { IconName } from '@prime/ui'; // Or standard lucide icon names

export type MasterConfig = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: string;
  group: 'accounting' | 'inventory';
  isPrimary?: boolean;
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
  },
  {
    id: 'ledger',
    label: 'Ledger',
    description: 'Manage customer, supplier & bank accounts',
    href: '/accounts/masters/ledger',
    icon: 'BookOpen',
    group: 'accounting',
    isPrimary: true,
  },
  {
    id: 'voucher-type',
    label: 'Voucher Type',
    description: 'Configure transaction entry types',
    href: '/accounts/masters/voucher-type',
    icon: 'FileText',
    group: 'accounting',
    isPrimary: true,
  },
  {
    id: 'cost-category',
    label: 'Cost Category',
    description: 'Classify cost allocation categories',
    href: '/accounts/masters/cost-category',
    icon: 'Tag',
    group: 'accounting',
  },
  {
    id: 'cost-centre',
    label: 'Cost Centre',
    description: 'Track departmental cost allocation',
    href: '/accounts/masters/cost-centre',
    icon: 'Target',
    group: 'accounting',
  },
  {
    id: 'tax-group',
    label: 'Tax Group',
    description: 'Manage tax rate configurations',
    href: '/accounts/masters/tax-group',
    icon: 'Percent',
    group: 'accounting',
  },
  // Inventory Masters
  {
    id: 'stock-group',
    label: 'Stock Group',
    description: 'Organize your stock hierarchy',
    href: '/inventory/masters/stock-group',
    icon: 'FolderOpen',
    group: 'inventory',
  },
  {
    id: 'stock-category',
    label: 'Stock Category',
    description: 'Classify items by category',
    href: '/inventory/masters/stock-category',
    icon: 'LayoutGrid',
    group: 'inventory',
  },
  {
    id: 'unit-of-measure',
    label: 'Unit of Measure',
    description: 'Define measurement units',
    href: '/inventory/masters/unit-of-measure',
    icon: 'Ruler',
    group: 'inventory',
  },
  {
    id: 'stock-item',
    label: 'Stock Item',
    description: 'Manage your product catalog',
    href: '/inventory/masters/stock-item',
    icon: 'Package',
    group: 'inventory',
    isPrimary: true,
  },
  {
    id: 'godown',
    label: 'Godown',
    description: 'Configure storage locations',
    href: '/inventory/masters/godown',
    icon: 'Warehouse',
    group: 'inventory',
  }
];

export const MASTER_GROUPS = [
  { id: 'accounting', label: 'Accounting Masters' },
  { id: 'inventory', label: 'Inventory Masters' },
] as const;
