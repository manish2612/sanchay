---
name: form-development
description: Best practices and standard components for developing forms in the ERP UI using @prime/ui.
---

# Form Development Guidelines

This skill provides the project-level standards for developing forms in the application. Always adhere to these rules to maintain consistency, accessibility, and typesafety.

## 1. Naming Conventions & Organization

- **Step Names & Descriptions**: Use clear, concise labels and descriptive verbs for wizard steps. For example: "Company Profile" (Provide the core identity of the company).
- **Constants File**: Never hardcode field names in UI components. Always create a `constants.ts` file alongside your form component to define:
  - Form field name constants (e.g., `export const COMPANY_FORM_FIELDS = { NAME: "name", ... } as const;`).
  - Wizard step configurations (id, title, description, and an array of field names validated in that step).
  - Any fixed options for dropdowns, radios, or AutoSuggest components.

## 2. Validation

- **Zod & React Hook Form**: Always use `zod` for validation. Create a dedicated `schema.ts` file that exports the schema (e.g., `companyFormSchema = z.object({...})`) and the inferred type (e.g., `export type CompanyFormValues = z.infer<typeof companyFormSchema>;`).
- **Resolver Preference**: It is **highly preferred to use `zodResolver`** (`@hookform/resolvers/zod`) to bind the Zod schema with `react-hook-form`'s `useForm`. This keeps UI components clean and strongly typed.

## 3. Component Usage

- **Primitives**: Always use `@prime/ui` Form primitives (`Form.Field`, `Form.Item`, `Form.Label`, `Form.Control`, `Form.Message`) to wrap inputs. This ensures consistent spacing and accessibility.
- **TextInput**: Used for standard text entry.
  - **Requirement**: Every `TextInput` MUST include a `leftSlot` with a correct leading `<Icon>` that represents the nature or functionality of the field (e.g., `<Icon name="Mail" />` for emails, `<Icon name="MapPin" />` for addresses).
- **AutoSuggest**: Used for searchable dropdowns (e.g., Country, State).
  - Use `AutoSuggest.Input`, `AutoSuggest.Content`, `AutoSuggest.List`, `AutoSuggest.Item`.
  - Include icons/flags before the labels in `AutoSuggest.Item` when relevant (e.g., Country flags).
- **DropdownMenu / Select**: Used for fixed, non-searchable option lists (e.g., Registration Type, Timezone).
- **DatePicker**: Used for all date fields (BS/AD).
- **FormWizard**: Used for multi-step forms. Manage state per step and use `useFormWizardContext()` to determine the `currentStep` for conditional rendering.

## 4. UI/UX Best Practices

- **Grouping**: Group logically related inputs side-by-side using CSS Grid to optimize vertical space (e.g., `className="grid grid-cols-1 md:grid-cols-2 gap-4"`).
- **Custom Inputs**: For highly visual choices (like base currency), use styled radio buttons constructed with custom flex containers, bordered cards, and prominent symbols/icons instead of native radio inputs, updating the form state via `field.onChange`.
