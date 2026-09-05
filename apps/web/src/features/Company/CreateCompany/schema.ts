import { z } from "zod";
import { COMPANY_FORM_FIELDS } from "./constants";
import { baseAddressSchema, baseContactSchema } from "../../../utils/shared-schemas";

export const companyFormSchema = z.object({
  // Step 1
  [COMPANY_FORM_FIELDS.NAME]: z.string().min(1, "Name is required"),
  [COMPANY_FORM_FIELDS.MAILING_NAME]: z.string().min(1, "Mailing name is required"),
  [COMPANY_FORM_FIELDS.TIMEZONE]: z.string().min(1, "Timezone is required"),

  // Address and Contact fields will be merged from shared schemas below.

  // Operations & Compliance (Step 1 continued)
  [COMPANY_FORM_FIELDS.REGISTRATION_TYPE]: z.string().min(1, "Registration type is required"),
  [COMPANY_FORM_FIELDS.REGISTRATION_NUMBER]: z.string().min(1, "Registration number is required"),
  [COMPANY_FORM_FIELDS.FINANCIAL_YEAR_START_DATE]: z.date(),
  [COMPANY_FORM_FIELDS.BOOKS_START_DATE]: z.date(),
  [COMPANY_FORM_FIELDS.CURRENCY]: z.enum(["NPR", "INR", "USD"]),
  [COMPANY_FORM_FIELDS.DECIMAL_COUNT]: z.coerce.number().min(0, "Min 0 allowed").max(12, "Max 12 allowed"),


})
.merge(baseAddressSchema)
.merge(baseContactSchema.omit({ contactPerson: true }));

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
