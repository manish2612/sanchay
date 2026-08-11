import { z } from "zod";

export const baseAddressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  address: z.string().min(1, "Address is required"),
  pincode: z.string().min(1, "Pincode is required"),
});

export const baseContactSchema = z.object({
  contactPerson: z.string().min(1, "Contact person is required").optional(),
  email: z.string().email("Invalid email address").or(z.literal("")),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  whatsappNumber: z.string().optional(),
  landlineNo: z.string().optional(),
});
