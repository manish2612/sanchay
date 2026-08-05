import { z } from "zod";
import { COMPANY_FORM_FIELDS } from "./constants";

export const companyFormSchema = z.object({
  // Step 1
  [COMPANY_FORM_FIELDS.NAME]: z.string().min(1, "Name is required"),
  [COMPANY_FORM_FIELDS.MAILING_NAME]: z.string().min(1, "Mailing name is required"),
  [COMPANY_FORM_FIELDS.TIMEZONE]: z.string().min(1, "Timezone is required"),

  // Step 2
  [COMPANY_FORM_FIELDS.COUNTRY]: z.string().min(1, "Country is required"),
  [COMPANY_FORM_FIELDS.STATE]: z.string().min(1, "State is required"),
  [COMPANY_FORM_FIELDS.ADDRESS]: z.string().min(1, "Address is required"),
  [COMPANY_FORM_FIELDS.PINCODE]: z.string().min(1, "Pincode is required"),
  [COMPANY_FORM_FIELDS.EMAIL]: z.string().email("Invalid email address").or(z.literal("")),
  [COMPANY_FORM_FIELDS.MOBILE_NUMBER]: z.string().min(1, "Mobile number is required"),
  [COMPANY_FORM_FIELDS.WHATSAPP_NUMBER]: z.string().optional(),
  [COMPANY_FORM_FIELDS.LANDLINE_NO]: z.string().optional(),

  // Step 3
  [COMPANY_FORM_FIELDS.REGISTRATION_TYPE]: z.string().min(1, "Registration type is required"),
  [COMPANY_FORM_FIELDS.REGISTRATION_NUMBER]: z.string().min(1, "Registration number is required"),
  [COMPANY_FORM_FIELDS.FINANCIAL_YEAR_START_DATE]: z.date({
    required_error: "Financial year start date is required",
  }),
  [COMPANY_FORM_FIELDS.BOOKS_START_DATE]: z.date({
    required_error: "Books start date is required",
  }),
  [COMPANY_FORM_FIELDS.CURRENCY]: z.enum(["NPR", "INR", "USD"], {
    required_error: "Currency is required",
  }),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
