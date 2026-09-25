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
  [COMPANY_FORM_FIELDS.REGISTRATION_TYPE]: z.string().optional(),
  [COMPANY_FORM_FIELDS.REGISTRATION_NUMBER]: z.string().optional(),
  [COMPANY_FORM_FIELDS.BOOKS_START_DATE]: z.date().default(() => new Date()),
  [COMPANY_FORM_FIELDS.CURRENCY]: z.string().optional(), // Now derived from country
  [COMPANY_FORM_FIELDS.DECIMAL_COUNT]: z.coerce.number().min(0, "Min 0 allowed").max(4, "Max 4 allowed"),

})
.merge(baseAddressSchema.extend({
  address: z.string().optional(),
  pincode: z.string().optional(),
}))
.merge(baseContactSchema.omit({ contactPerson: true }).extend({
  mobileNumber: z.string().optional(),
}));

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
