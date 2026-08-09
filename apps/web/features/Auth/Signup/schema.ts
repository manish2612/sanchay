import * as z from 'zod';

export const signupSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  phone: z.string().min(1, { message: 'Phone number is required' }).regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Service',
  }),
});

export type SignupValues = z.infer<typeof signupSchema>;
