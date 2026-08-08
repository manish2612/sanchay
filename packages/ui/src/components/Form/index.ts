'use client';

import { FormRoot } from './FormRoot';
import { FormField } from './FormField';
import { FormItem } from './FormItem';
import { FormLabel } from './FormLabel';
import { FormControl } from './FormControl';
import { FormDescription } from './FormDescription';
import { FormMessage } from './FormMessage';
import { FormSection } from './FormSection';
import { useFormField } from './useFormField';

export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
  Section: FormSection,
});

export { useFormField };
export * from './types';
