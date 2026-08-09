export const LEDGER_FORM_FIELDS = {
  // Step 1: General Info
  NAME: "name",
  ALIAS: "alias",
  UNDER: "under",
  ACCOUNT_CODE: "accountCode",
  REGISTRATION_TYPE: "registrationType",
  REGISTRATION_NUMBER: "registrationNumber",

  // Step 2: Billing & Credit
  IS_BILL_BY_BILL: "isBillByBill",
  CREDIT_PERIOD: "creditPeriod",
  CREDIT_LIMIT: "creditLimit",
  BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED: "blockSalesBillOnCreditLimitExceeded",
  OPENING_BALANCE: "openingBalance",
  OPENING_BALANCE_TYPE: "openingBalanceType",

  // Step 3: Address
  COUNTRY: "country",
  STATE: "state",
  ADDRESS: "address",
  PINCODE: "pincode",

  // Step 4: Contact
  CONTACT_PERSON: "contactPerson",
  EMAIL: "email",
  MOBILE_NUMBER: "mobileNumber",
  WHATSAPP_NUMBER: "whatsappNumber",
  LANDLINE_NO: "landlineNo",
} as const;

export const LEDGER_WIZARD_STEPS = [
  {
    id: 1,
    title: "General Information",
    description: "Basic details about the ledger account.",
    fields: [
      LEDGER_FORM_FIELDS.NAME,
      LEDGER_FORM_FIELDS.ALIAS,
      LEDGER_FORM_FIELDS.UNDER,
      LEDGER_FORM_FIELDS.ACCOUNT_CODE,
      LEDGER_FORM_FIELDS.REGISTRATION_TYPE,
      LEDGER_FORM_FIELDS.REGISTRATION_NUMBER,
    ],
  },
  {
    id: 2,
    title: "Billing & Credit",
    description: "Credit limits, periods, and opening balances.",
    fields: [
      LEDGER_FORM_FIELDS.IS_BILL_BY_BILL,
      LEDGER_FORM_FIELDS.CREDIT_PERIOD,
      LEDGER_FORM_FIELDS.CREDIT_LIMIT,
      LEDGER_FORM_FIELDS.BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED,
      LEDGER_FORM_FIELDS.OPENING_BALANCE,
      LEDGER_FORM_FIELDS.OPENING_BALANCE_TYPE,
    ],
  },
  {
    id: 3,
    title: "Address",
    description: "Location details for the ledger.",
    fields: [
      LEDGER_FORM_FIELDS.COUNTRY,
      LEDGER_FORM_FIELDS.STATE,
      LEDGER_FORM_FIELDS.ADDRESS,
      LEDGER_FORM_FIELDS.PINCODE,
    ],
  },
  {
    id: 4,
    title: "Contact",
    description: "Communication details for the ledger.",
    fields: [
      LEDGER_FORM_FIELDS.CONTACT_PERSON,
      LEDGER_FORM_FIELDS.EMAIL,
      LEDGER_FORM_FIELDS.MOBILE_NUMBER,
      LEDGER_FORM_FIELDS.WHATSAPP_NUMBER,
      LEDGER_FORM_FIELDS.LANDLINE_NO,
    ],
  },
];

export const UNDER_OPTIONS = [
  { label: "Sundry Debtors", value: "sundry_debtors" },
  { label: "Sundry Creditors", value: "sundry_creditors" },
  { label: "Bank Accounts", value: "bank_accounts" },
  { label: "Cash-in-hand", value: "cash_in_hand" },
];

export const REGISTRATION_TYPES = [
  { label: "Private Limited", value: "private_limited" },
  { label: "Public Limited", value: "public_limited" },
  { label: "Sole Proprietorship", value: "sole_proprietorship" },
  { label: "Partnership", value: "partnership" },
  { label: "LLP", value: "llp" },
];
