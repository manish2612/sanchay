export const COMPANY_FORM_FIELDS = {
  // Step 1
  NAME: "name",
  MAILING_NAME: "mailingName",
  TIMEZONE: "timezone",
  
  // Step 2
  COUNTRY: "country",
  STATE: "state",
  ADDRESS: "address",
  PINCODE: "pincode",
  EMAIL: "email",
  MOBILE_NUMBER: "mobileNumber",
  WHATSAPP_NUMBER: "whatsappNumber",
  LANDLINE_NO: "landlineNo",

  // Step 3
  REGISTRATION_TYPE: "registrationType",
  REGISTRATION_NUMBER: "registrationNumber",
  FINANCIAL_YEAR_START_DATE: "financialYearStartDate",
  BOOKS_START_DATE: "booksStartDate",
  CURRENCY: "currency",
} as const;

export const COMPANY_WIZARD_STEPS = [
  {
    id: 1,
    title: "Company Profile",
    description: "Provide the core identity of the company.",
    fields: [
      COMPANY_FORM_FIELDS.NAME,
      COMPANY_FORM_FIELDS.MAILING_NAME,
      COMPANY_FORM_FIELDS.TIMEZONE,
    ],
  },
  {
    id: 2,
    title: "Contact & Location",
    description: "Where is the company located and how to reach out.",
    fields: [
      COMPANY_FORM_FIELDS.COUNTRY,
      COMPANY_FORM_FIELDS.STATE,
      COMPANY_FORM_FIELDS.ADDRESS,
      COMPANY_FORM_FIELDS.PINCODE,
      COMPANY_FORM_FIELDS.EMAIL,
      COMPANY_FORM_FIELDS.MOBILE_NUMBER,
      COMPANY_FORM_FIELDS.WHATSAPP_NUMBER,
      COMPANY_FORM_FIELDS.LANDLINE_NO,
    ],
  },
  {
    id: 3,
    title: "Operations & Compliance",
    description: "Financial year, registration, and default currency settings.",
    fields: [
      COMPANY_FORM_FIELDS.REGISTRATION_TYPE,
      COMPANY_FORM_FIELDS.REGISTRATION_NUMBER,
      COMPANY_FORM_FIELDS.FINANCIAL_YEAR_START_DATE,
      COMPANY_FORM_FIELDS.BOOKS_START_DATE,
      COMPANY_FORM_FIELDS.CURRENCY,
    ],
  },
];

export const CURRENCY_OPTIONS = [
  { label: "Nepalese Rupee", value: "NPR", symbol: "Rs" },
  { label: "Indian Rupee", value: "INR", symbol: "₹" },
  { label: "US Dollar", value: "USD", symbol: "$" },
];

export const REGISTRATION_TYPES = [
  { label: "Private Limited", value: "private_limited" },
  { label: "Public Limited", value: "public_limited" },
  { label: "Sole Proprietorship", value: "sole_proprietorship" },
  { label: "Partnership", value: "partnership" },
  { label: "LLP", value: "llp" },
];
