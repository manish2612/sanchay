# Troubleshooting & Guidelines: Editable Table Phantom Row Validation & UX Blockers

## Problem Description

In multi-step form wizards (or any form containing an editable table such as `StandardRatesTable`, `MultiUnitTable`, or `GodownAllocationTable`), users are unable to proceed to the next step or submit the form when an editable table is enabled and contains a phantom (placeholder) row.

### Key Symptoms
- Clicking **"Continue"** or **"Submit"** does nothing.
- **No validation errors, red borders, or error messages** are shown on the table or screen.
- Toggling off the table's feature switch (e.g., "Set Standard Rates") immediately allows the user to proceed.
- Inspecting `form.trigger()` or form validation reveals a schema parsing failure on an uncommitted phantom row.

---

## Root Cause Analysis (RCA)

This issue is caused by a disconnect between **Zod schema definitions**, **phantom row default state**, and **table error suppression logic**:

### 1. Schema Parsing Rejection (`null` vs `undefined`)
When a phantom row is initialized (via `append()` or `useFieldArray`), optional fields without user input are typically assigned `null` (e.g. `toDate: null`, `mfgDate: null`, `expiryDate: null`):
```typescript
append({
  fromDate: new Date(),
  toDate: null, // <-- Defaults to null
  mrp: 0,
  netRate: 0,
  minSellingRate: 0,
  isPhantom: true,
});
```

However, the Zod schema was defined as:
```typescript
// ❌ WRONG: Rejects `null`
toDate: z.union([z.date(), z.string()]).optional(),
```

In Zod, `.optional()` accepts `undefined`, but **rejects `null`**. When Zod parses `toDate: null`, it fails at the base object validation level with:
```json
{
  "code": "invalid_union",
  "path": ["standardRates", 1, "toDate"],
  "message": "Invalid input: expected date or string, received null"
}
```

> **Note on `.superRefine()`:** Even if the schema has `if (data.isPhantom) return;` inside a refinement, Zod runs base `.object({...})` validation **before** `.superRefine()`. If a field fails base type checking, the schema is marked invalid before refinements are evaluated.

### 2. Silent Error Suppression in the UI
Editable table hooks intentionally suppress errors on phantom rows to prevent distracting red error rings on placeholder rows:
```typescript
if (Array.isArray(formErrors)) {
  formErrors.forEach((rowErr: any, idx: number) => {
    if (!rowErr) return;
    // Suppresses error indicators on phantom rows
    if ((fields[idx] as any)?.isPhantom) return;
    ...
```

Since the validation failure is on index `1` (the phantom row), the hook filters it out. Consequently:
- `rowErrors` is empty.
- `errorSummary` is `undefined`.
- Form wizard calls `await trigger(stepFields)`, which returns `false`.
- The user is completely blocked with zero feedback.

---

## The App-Wide Solution & Design Standard

To prevent this issue across all editable tables, adopt the following **3-tier standard**:

### Tier 1: Schema Standard (Nullable by Default)
Any editable table field that can be left blank (dates, optional amounts, secondary IDs) **must accept both `null` and `undefined`**:

```typescript
// ✅ CORRECT: Accepts Date, ISO string, null, or undefined
export const standardRateSchema = z
  .object({
    fromDate: z.union([z.date(), z.string()]).nullable().optional(),
    toDate: z.union([z.date(), z.string()]).nullable().optional(),
    mrp: z.coerce.number().min(0, 'MRP must be positive').optional(),
    netRate: z.coerce.number().min(0, 'Net Rate must be positive').optional(),
    minSellingRate: z.coerce.number().min(0, 'Min Selling Rate must be positive').optional(),
    isPhantom: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Phantom row immunity: never evaluate business rules on uncommitted rows
    if (data.isPhantom) {
      return;
    }

    const hasRate =
      (data.minSellingRate !== undefined && data.minSellingRate > 0) ||
      (data.mrp !== undefined && data.mrp > 0) ||
      (data.netRate !== undefined && data.netRate > 0);

    if (!hasRate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Min Selling Rate, MRP, or Net Rate must be specified',
        path: ['minSellingRate'],
      });
    }
  });
```

Apply this rule to all editable tables:
- `GodownAllocationTable`: `mfgDate` and `expiryDate` must be `.nullable().optional()`.
- `MultiUnitTable`: optional unit or conversion fields must be `.nullable().optional()`.

---

### Tier 2: Visual State Separation (Rest State vs. Active Input)
To eliminate visual confusion where phantom rows look identical to committed rows (filled with confusing zeros), configure the `@prime/ui` table `phantomRowConfig`:

```tsx
<Table.Root
  data={fields}
  columns={columns}
  tableOptions={{
    meta: {
      phantomRowConfig: {
        isPhantom: (row: any) => Boolean(row.original?.isPhantom),
        actionText: 'Add New Rate', // Or 'Add New Unit', 'Add New Godown Allocation'
      },
      state: {
        isRowEmpty: (row: any) =>
          !row?.original?.minSellingRate && !row?.original?.mrp && !row?.original?.netRate,
        rowErrors,
      },
      actions: {
        updateData,
        onRowCommit,
        removeRow,
      },
    },
  }}
>
```

#### How it works:
1. **Rest State (Unfocused):** Uncommitted rows render as a clean callout:  
   `+ Add New Rate (Press Ctrl+N)`
2. **Active State (Focused):** When clicked or tabbed into, the row seamlessly morphs into editable cells.
3. **Abandonment:** If unfocused without entering required data, it reverts to the action button without leaving dirty invalid state in the form.

---

### Tier 3: Data Transformation Sanitization
When transforming form values for backend submission (`transformers.ts`), always filter out phantom rows explicitly so that backend payloads only contain verified, committed data:

```typescript
price_rules: data.enableStandardRates
  ? (data.standardRates || [])
      .filter(
        (r) =>
          !r.isPhantom &&
          (Number(r.minSellingRate) > 0 || Number(r.mrp) > 0 || Number(r.netRate) > 0)
      )
      .map((r) => ({
        effective_from: r.fromDate ? new Date(r.fromDate).toISOString() : new Date().toISOString(),
        effective_to: r.toDate ? new Date(r.toDate).toISOString() : null,
        min_selling_rate: Number(r.minSellingRate) || 0,
        mrp: Number(r.mrp) || 0,
        net_rate: Number(r.netRate) || 0,
        standard_rate: 0,
      }))
  : []
```

---

## Checklist for Adding or Modifying Editable Tables

- [ ] Are date/optional fields declared with `.nullable().optional()` in the Zod schema?
- [ ] Does `.superRefine()` check `if (data.isPhantom) return;` at the very beginning?
- [ ] Does `tableOptions.meta.phantomRowConfig` define `isPhantom` and `actionText`?
- [ ] Does `tableOptions.meta.state.isRowEmpty` accurately check if all meaningful data inputs are empty?
- [ ] Does the submission transformer filter out `!row.isPhantom` before sending payloads to the API?
