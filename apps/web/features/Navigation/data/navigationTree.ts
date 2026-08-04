import { IconName } from "@prime/ui";

export type NavItemConfig = {
  id: string;
  label: string;
  icon?: IconName | (string & {});
  href?: string;
  children?: NavItemConfig[];
};

export const NAVIGATION_TREE: NavItemConfig[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
  },
  {
    id: "company",
    label: "Company",
    icon: "Briefcase",
    children: [
      { id: "new-company", label: "New Company", href: "/company/new" },
      { id: "select-company", label: "Select Company", href: "/company/select" },
      { id: "alter-company", label: "Alter Company", href: "/company/alter" },
      { id: "user", label: "User", href: "/company/user" },
      { id: "features", label: "Features", href: "/company/features" },
      { id: "cbms-configuration", label: "CBMS Configuration", href: "/company/cbms-configuration" },
      { id: "tally-configuration", label: "Tally Configuration", href: "/company/tally-configuration" },
    ],
  },
  {
    id: "accounts",
    label: "Accounts",
    icon: "Landmark",
    children: [
      {
        id: "accounts-masters",
        label: "Masters",
        children: [
          { id: "group", label: "Group", href: "/accounts/masters/group" },
          { id: "ledger", label: "Ledger", href: "/accounts/masters/ledger" },
          { id: "voucher-type", label: "Voucher Type", href: "/accounts/masters/voucher-type" },
          { id: "cost-category", label: "Cost Category", href: "/accounts/masters/cost-category" },
          { id: "cost-centre", label: "Cost Centre", href: "/accounts/masters/cost-centre" },
          { id: "tax-group", label: "TaX Group", href: "/accounts/masters/tax-group" },
        ],
      },
      {
        id: "accounts-transactions",
        label: "Transactions",
        children: [
          { id: "receipt", label: "Receipt", href: "/accounts/transactions/receipt" },
          { id: "payment", label: "Payment", href: "/accounts/transactions/payment" },
          { id: "journal", label: "Journal", href: "/accounts/transactions/journal" },
          { id: "contra", label: "Contra", href: "/accounts/transactions/contra" },
        ],
      },
      {
        id: "accounts-reports",
        label: "Reports",
        children: [
          { id: "ledger-statement", label: "Ledger Statement", href: "/accounts/reports/ledger-statement" },
        ],
      },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: "Blocks",
    children: [
      {
        id: "inventory-masters",
        label: "Masters",
        children: [
          { id: "stock-group", label: "Stock Group", href: "/inventory/masters/stock-group" },
          { id: "stock-category", label: "Stock Category", href: "/inventory/masters/stock-category" },
          { id: "unit-of-measure", label: "Unit of Measure", href: "/inventory/masters/unit-of-measure" },
          { id: "stock-item", label: "Stock Item", href: "/inventory/masters/stock-item" },
          { id: "godown", label: "Godown", href: "/inventory/masters/godown" },
        ],
      },
      {
        id: "inventory-transactions",
        label: "Transactions",
        children: [
          { id: "quotation", label: "Quotation", href: "/inventory/transactions/quotation" },
          { id: "sales-order", label: "Sales Order", href: "/inventory/transactions/sales-order" },
          { id: "sales", label: "Sales", href: "/inventory/transactions/sales" },
          { id: "credit-note", label: "Credit Note", href: "/inventory/transactions/credit-note" },
          { id: "purchase-indent", label: "Purchase Indent", href: "/inventory/transactions/purchase-indent" },
          { id: "purchase-order", label: "Purchase Order", href: "/inventory/transactions/purchase-order" },
          { id: "purchase", label: "Purchase", href: "/inventory/transactions/purchase" },
          { id: "debit-note", label: "Debit Note", href: "/inventory/transactions/debit-note" },
          { id: "receipt-note", label: "Receipt Note", href: "/inventory/transactions/receipt-note" },
          { id: "delivery-note", label: "Delivery Note", href: "/inventory/transactions/delivery-note" },
        ],
      },
      {
        id: "inventory-reports",
        label: "Reports",
        children: [
          { id: "stock-summary", label: "Stock Summary", href: "/inventory/reports/stock-summary" },
          { id: "godownwise-stock", label: "Godownwise Stock", href: "/inventory/reports/godownwise-stock" },
          { id: "pending-sales-orders", label: "Pending Sales Orders", href: "/inventory/reports/pending-sales-orders" },
          { id: "bulk-invoice-printing", label: "Bulk Invoice Printing", href: "/inventory/reports/bulk-invoice-printing" },
        ],
      },
    ],
  },
  {
    id: "ird-reports",
    label: "IRD Reports",
    icon: "LineChart",
    children: [
      { id: "vat-register", label: "VAT Register", href: "/ird-reports/vat-register" },
      { id: "materialized-view", label: "Materialized View", href: "/ird-reports/materialized-view" },
      { id: "audit-log", label: "Audit Log", href: "/ird-reports/audit-log" },
      { id: "activity-log", label: "Activity Log", href: "/ird-reports/activity-log" },
      { id: "cancelled-view", label: "Cancelled View", href: "/ird-reports/cancelled-view" },
      { id: "upload-on-cbms", label: "Upload On CBMS", href: "/ird-reports/upload-on-cbms" },
    ],
  },
  {
    id: "utility",
    label: "Utility/Upload/Sync",
    icon: "Wrench",
    children: [],
  },
  {
    id: "help",
    label: "Help",
    icon: "CircleHelp",
    children: [],
  },
];
