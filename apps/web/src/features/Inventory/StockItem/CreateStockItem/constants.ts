export const STOCK_ITEM_FORM_FIELDS = {
  NAME: 'name',
  PARENT_ID: 'parentId',
  CATEGORY_ID: 'categoryId',
  UNIT: 'unit',
  HSN_SAC: 'hsnSac',
  LOCAL_SALES_TAX: 'localInterstateSales',
  EXPORT_SALES_TAX: 'exportSales',
  LOCAL_PURCHASE_TAX: 'localInterstatePurchase',
  EXPORT_PURCHASE_TAX: 'exportPurchase',
  ENABLE_MULTI_UNIT: 'enableMultiUnit',
  MULTI_UNITS: 'multiUnits',
  ENABLE_STANDARD_RATES: 'enableStandardRates',
  STANDARD_RATES: 'standardRates',
  OPENING_QUANTITY: 'openingQuantity',
  OPENING_RATE: 'openingRate',
  OPENING_AMOUNT: 'openingAmount',
  ENABLE_GODOWN_ALLOCATION: 'enableGodownAllocation',
  GODOWN_ALLOCATIONS: 'godownAllocations',
} as const;

export const STOCK_ITEM_WIZARD_STEPS = [
  {
    id: 1,
    title: 'General Info',
    description: 'Basic details and category',
    fields: [
      STOCK_ITEM_FORM_FIELDS.NAME,
      STOCK_ITEM_FORM_FIELDS.PARENT_ID,
      STOCK_ITEM_FORM_FIELDS.CATEGORY_ID,
      STOCK_ITEM_FORM_FIELDS.UNIT,
      STOCK_ITEM_FORM_FIELDS.HSN_SAC,
    ],
  },
  {
    id: 2,
    title: 'Statutory & Taxation',
    description: 'Tax classifications',
    fields: [
      STOCK_ITEM_FORM_FIELDS.LOCAL_SALES_TAX,
      STOCK_ITEM_FORM_FIELDS.EXPORT_SALES_TAX,
      STOCK_ITEM_FORM_FIELDS.LOCAL_PURCHASE_TAX,
      STOCK_ITEM_FORM_FIELDS.EXPORT_PURCHASE_TAX,
    ],
  },
  {
    id: 3,
    title: 'Advanced Details',
    description: 'Multi-unit and standard rates',
    fields: [
      STOCK_ITEM_FORM_FIELDS.ENABLE_MULTI_UNIT,
      STOCK_ITEM_FORM_FIELDS.MULTI_UNITS,
      STOCK_ITEM_FORM_FIELDS.ENABLE_STANDARD_RATES,
      STOCK_ITEM_FORM_FIELDS.STANDARD_RATES,
    ],
  },
  {
    id: 4,
    title: 'Opening Balance',
    description: 'Initial stock details',
    fields: [
      STOCK_ITEM_FORM_FIELDS.OPENING_QUANTITY,
      STOCK_ITEM_FORM_FIELDS.OPENING_RATE,
      STOCK_ITEM_FORM_FIELDS.OPENING_AMOUNT,
      STOCK_ITEM_FORM_FIELDS.ENABLE_GODOWN_ALLOCATION,
      STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS,
    ],
  },
];
