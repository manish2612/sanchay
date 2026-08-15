import { z } from 'zod';

export const baseAddressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  address: z.string().min(1, "Address is required"),
  pincode: z.string().min(1, "Pincode is required"),
});

export const baseMasterSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  alias: z.string().max(50, 'Alias must be 50 characters or less').optional(),
  parentId: z.string().optional(),
});

export const baseContactSchema = z.object({
  contactPerson: z.string().min(1, "Contact person is required").optional(),
  email: z.string().email("Invalid email address").or(z.literal("")),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  whatsappNumber: z.string().optional(),
  landlineNo: z.string().optional(),
});

export const taxClassificationSchema = z.object({
  localInterstateSales: z.string().min(1, 'Local/Interstate Sales is required'),
  exportSales: z.string().min(1, 'Export Sales is required'),
  localInterstatePurchase: z.string().min(1, 'Local/Interstate Purchase is required'),
  exportPurchase: z.string().min(1, 'Export Purchase is required'),
});
