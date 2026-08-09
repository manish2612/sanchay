import { FieldPath, FieldValues } from 'react-hook-form';
import { useFormField } from './useFormField';

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export type FormItemContextValue = {
  id: string;
};

export type UseFormFieldReturn = ReturnType<typeof useFormField>;
