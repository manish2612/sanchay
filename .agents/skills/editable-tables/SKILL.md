---
name: editable-tables
description: Rules and guidelines for implementing editable tables and data grids in the ERP UI using @prime/ui Table primitives. Trigger this skill whenever you are creating or modifying a table that allows user input, uses a phantom row, or relies on table meta configurations.
---

# Editable Tables Guide

Implementing editable tables with `@prime/ui` requires strict adherence to specific patterns to avoid recurring UI/UX and functional bugs.

## 1. Component Architecture & Rendering
The `@prime/ui` `Table.Root` requires `Table.Header` and `Table.Body` to receive render prop functions. Passing standard JSX children will crash the app with `TypeError: children is not a function`.

**Correct Render Pattern:**
```tsx
<Table.Root data={fields} columns={columns} tableOptions={{ meta: { ... } }}>
  <Table.Header className="bg-surface-variant sticky top-0 z-10 border-b border-border h-8">
    {({ table }) => (
      <>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.HeaderRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Head
                key={header.id}
                style={{ width: header.getSize(), flex: `${header.getSize()} 0 auto` }}
                className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground h-8 border-r border-border last:border-r-0"
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </Table.Head>
            ))}
          </Table.HeaderRow>
        ))}
      </>
    )}
  </Table.Header>
  <Table.Body className="bg-background">
    {(row, isFocused) => (
      <Table.Row
        key={row.id}
        data-state={row.getIsSelected() ? 'selected' : undefined}
        data-focused={isFocused}
        className={`transition-colors border-b border-border last:border-b-0 border-l-3 border-l-transparent group ${
          row.original.isPhantom
            ? 'bg-primary/5' // Phantom row styling
            : isFocused
              ? 'bg-primary/[0.06] border-l-primary'
              : 'hover:bg-surface-variant/40'
        }`}
      >
        {row.getVisibleCells().map((cell) => (
          <Table.Cell
            key={cell.id}
            style={{ width: cell.column.getSize(), flex: `${cell.column.getSize()} 0 auto` }}
            className="px-2 py-1 border-r border-border last:border-r-0"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Table.Cell>
        ))}
      </Table.Row>
    )}
  </Table.Body>
</Table.Root>
```

## 2. Header and Cell Alignment
- You **must** define exact `size` properties on every column definition in `columns.ts`.
- You **must** apply `style={{ width: ...getSize(), flex: ... }}` to both `<Table.Head>` and `<Table.Cell>` (as shown above) to ensure column widths perfectly align.
- Numeric columns should align their text to the right using `text-right` in the input classes.
- **Action Column Width**: The Action column (`ActionCell`) must have at least `size: 80` (never `50`) if it renders multi-button states (e.g., Commit `Check` + Discard `RotateCcw` + Error Alert) to prevent button clipping and wrapping.

## 3. Cell Inputs & Whitespace
Inputs within cells must consume the entire cell area cleanly without weird whitespace gaps or breaking borders.

**TextInput/AutoSuggest styling inside cells:**
- Use the primitive's native `variant="error"` or `error={true}` rather than manually appending `ring-danger` to `className`.
- **Wrapper className:** `h-8 w-full my-auto bg-transparent border-0 focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-0 transition-all px-2`
  *(CRITICAL: Do NOT use `bg-surface border focus-within:ring-offset-2` as it will cause an ugly thick white border/offset clash against the table row's hover/focus background)*
- **Input className:** `text-sm px-0 h-full` (Add `text-right` for numbers)
- *Note on AutoSuggest:* Ensure it overrides min-heights: `!min-h-8 !py-0`

## 4. Meta Configuration (`table.options.meta`)
All interactivity logic for cells must be passed via the `tableOptions.meta` object at the `<Table.Root>` level. The structure MUST be namespaced correctly so the internal keyboard navigation engine (`useTableNavigation`) can process commits and exits correctly.

**Correct Meta Structure:**
```tsx
meta: {
  actions: {
    updateData: (rowIndex, columnId, value) => void,
    onRowCommit: (rowIndex, columnId, value) => "ADVANCE" | "EXIT" | "STAY",
    removeRow: (rowIndex) => void,
    resetRow: (rowIndex) => void, // For discarding draft edits back to pristine
  },
  state: {
    rowErrors: {},
    isRowEmpty: (row: any) => boolean, // CRITICAL: Determines if Tab on the last field exits the grid natively
  },
  phantomRowConfig: {
    isPhantom: (row: any) => boolean,
    actionText: string,
  },
  removeRow: (rowIndex) => void, // For ActionCell
  resetRow: (rowIndex) => void,  // For ActionCell discard
}
```

## 5. Handling Errors in Cells
When extracting `rowErrors` from `meta`, you must specifically check `column.id` to prevent **all** inputs in the row from lighting up red if only one field is invalid.

**Correct Error Resolution Pattern (e.g., in `NumericCell`):**
```tsx
const meta = table.options.meta || {} as any;
// Always check meta.state.rowErrors for the namespaced errors
const rowError = meta?.state?.rowErrors?.[row.index] || meta?.rowErrors?.[row.index];

// Specifically check for column.id, then fallback to root message if needed
const error = typeof rowError === 'object' && rowError !== null ? rowError[column.id] : rowError;

return (
  <TextInput 
    variant={error ? "error" : "default"} // Passes to @prime/ui native variant
    // ...other props
  />
);
```

## 6. Dynamic Phantom Rows
- Do NOT use HTML `max` attribute to strictly prevent keystrokes for validation (e.g., locking users out of modifying numbers out-of-order). Instead, let them type freely, use a real-time validation synthesis check in the main component, and pass the error dynamically to `meta.rowErrors`.
- The Phantom row (`isPhantom: true`) should automatically be appended by a `useEffect` whenever there is valid room for a new entry, and removed if the limit is reached.

## 7. Row Committing & Keyboard Navigation (RCA & Guidelines)

**DO NOT MANUALLY CALL `onRowCommit` ON INPUT CHANGE OR BLUR.**

**The Problem:** Manually triggering `onRowCommit` from `onChange`, `onSelect`, or `onBlur` inside `TextCell`, `NumericCell`, or custom `SelectCell`s causes the table to commit prematurely on the first keystroke or selection. This flips the phantom row to `isPhantom: false` instantly, spawning a new phantom row below it while the user is still filling out the rest of the current row, completely breaking keyboard navigation and rendering an incomplete committed row.

**The Solution (RCA Guideline):**
1. **Rely on Primitive Navigation:** The `@prime/ui` `Table.Root` primitive already has a robust internal keyboard engine (`useTableNavigation`). It automatically catches `Enter` and `Tab` (on the last cell) and invokes `meta.actions.onRowCommit`. Your custom cells should ONLY call `updateData` to sync state, and should NEVER manually invoke `onRowCommit`.
2. **Implement Validation:** Your `onRowCommit` function MUST validate the row before returning `"ADVANCE"`. If required fields are missing or invalid, return `"STAY"` to refuse the commit and keep the row as `isPhantom: true`.
3. **Provide `isRowEmpty`:** Always provide `meta.state.isRowEmpty` with a function that checks if all relevant data fields are empty. If the user hits `Tab` on the last column of a completely empty phantom row, the grid checks `isRowEmpty` to gracefully exit focus natively instead of attempting an endless chain of commits.

## 8. RHF Mutation Race Conditions (update vs replace)

When managing table data via `react-hook-form`'s `useFieldArray` hook, **DO NOT call multiple array mutation methods (like `update()` and `append()`) synchronously in the same render tick.**

**The Pattern:** 
When an editable table commits a row, you often need to do two things simultaneously:
1. Update the current row (e.g., change `isPhantom: true` to `false`).
2. Append a new empty phantom row at the bottom.

If you execute these back-to-back:
```tsx
// ❌ WRONG: Causes a Race Condition in RHF
update(rowIndex, committedRow);
append(newPhantomRow);
```
`react-hook-form`'s batching engine can choke because the second mutation operates on stale internal state before the first one flushes. This results in missing rows, dropped updates, or broken focus.

**The Solution:**
Always perform multiple structural changes locally on a cloned array, and push them to RHF in a single, atomic O(1) mutation using **`replace()`**.

```tsx
// ✅ CORRECT: Atomic Batching
const newFields = [...fields];
newFields[rowIndex] = committedRow; // 1. Locally update the existing row
newFields.push(newPhantomRow);      // 2. Locally append the new row

replace(newFields);                 // 3. Fire a single atomic mutation
```

## 9. Keyboard Navigation & Modal Architecture Rules

When implementing custom editable tables (especially those utilizing `@prime/ui`'s `useTableNavigation` or rendering alongside Headless UI Dialogs/Sheets), strictly adhere to the following rules to prevent silent focus crashes and race conditions:

**Rule 1: Prevent React Async Stale State on Rapid Commits**
React's asynchronous state batching (`useState` or RHF `useFieldArray`) cannot keep up with a user rapidly typing an amount and instantly hitting `Enter`. If `onRowCommit` relies solely on the React state array, it will evaluate the *old* (empty) value, reject the commit, and break the user's flow.
* **Fix**: Your table cells must pass the raw DOM string `(e.target.value)` up through the commit chain. `onRowCommit(rowIndex, columnId, cellValue)` must forcefully merge `cellValue` into the row payload *before* validating it, bypassing React's render delay entirely.

**Rule 2: Dialog Escape Hatches & Friendly Fire**
Table navigation scripts intentionally swallow the `Enter` and `Arrow` keys when the active cursor is inside a `[role="dialog"]` (e.g., a DatePicker cell popup) to prevent accidentally advancing the background table. 
* **Fix**: If your *entire table* is rendered inside a Dialog (like a slide-out Sheet or Modal), the escape hatch will trigger on the table itself and mute all keyboard shortcuts. Ensure the table navigation script checks if the Dialog *wraps* the table (`dialog.contains(rootRef.current)`) versus being a portaled child popup. 

**Rule 3: Non-Blocking vs Blocking Modals for Data Entry**
If pressing `Enter` on a row spawns a data-entry Sheet/Modal *and* advances the background table to a new row, you must ensure the Sheet is fully blocking (`modal={true}`).
* **Fix**: If you use `modal={false}` (non-blocking), the background table's programmatic focus jump (`focusNewRowInput`) will be interpreted by the Sheet as an "outside interaction" (clicking/focusing away), causing the Sheet to instantly auto-close before it even renders. Always use `modal={true}` to trap focus and force the user to complete the allocation before focus is cleanly returned to the background grid.

## 10. Pristine/Dirty Phantom Validation & The Triple Escape Reset Mechanism

### The Problem & Anti-Pattern:
In editable tables with dynamic phantom rows (`isPhantom: true`), if your Zod validation simply skips phantom rows (`if (row.isPhantom) return true;`), a critical vulnerability arises:
1. A user enters or changes values in a phantom row (making it dirty).
2. They do NOT press `Enter` to commit, leaving `isPhantom: true`.
3. If they click "Next" on a wizard step or submit the form:
   - Zod allows it to pass because `isPhantom: true`.
   - Submit handlers filter out phantom rows (`filter(r => !r.isPhantom)`), silently discarding the user's data!
   - Conversely, if you blindly validate all phantom rows, an untouched blank row will block the form and trap the user if there is no escape hatch to reset it.

### The Solution:
1. **Explicit Pristine Detection (`isRowEmpty`)**:
   Implement a strict `isRowEmpty` predicate checking all editable business fields:
   ```ts
   export const isRowEmpty = (row: any): boolean => {
     const data = row?.original || row;
     if (!data) return true;
     return (
       !data.tax_group_id &&
       !data.effective_from &&
       (!data.rate || data.rate === 0 || data.rate === '' || data.rate === '0.00')
     );
   };
   ```

2. **Clean Phantom Initializer**:
   `createDefaultPhantomRow()` must initialize mandatory input fields to empty strings (e.g., `effective_from: ''`, `tax_group_id: ''`), NEVER pre-filling today's date or active values, so brand-new rows are unequivocally pristine.

3. **Zod `superRefine` Uncommitted Guard**:
   In your row schema, enforce that touched phantom rows CANNOT pass validation until committed:
   ```ts
   .superRefine((row, ctx) => {
     // 1. Pristine untouched phantom rows are completely valid and ignored
     if (row.isPhantom && isRowEmpty(row)) {
       return;
     }

     // 2. Dirty/uncommitted phantom row guard: MUST block progression
     if (row.isPhantom) {
       ctx.addIssue({
         code: z.ZodIssueCode.custom,
         message: "Row has uncommitted changes. Press Enter or click Check to commit, or discard this row.",
         path: ["primary_field_name"],
       });
     }

     // 3. Mandatory field validations for touched or committed rows
     if (!row.mandatory_field) {
       ctx.addIssue({
         code: z.ZodIssueCode.custom,
         message: "Field is required",
         path: ["mandatory_field"],
       });
     }
   })
   ```

4. **The Triple Escape Reset Mechanism**:
   Provide 3 ways for users to make a dirty row pristine again without form deadlocks:
   - **ActionCell Dual Buttons (`Check` + `RotateCcw`)**: When a phantom row is dirty (`isPhantom && !isRowEmpty`), `ActionCell` shows:
     - `Check`: Commits the row via mouse click (`onRowCommit(row.index)`).
     - `RotateCcw`: Discards draft changes (`resetRow(row.index)`).
     - *Ensure Action column width is at least `size: 80` in `columns.ts`.*
   - **Keyboard Escape**: Listen for `Escape` on row `onKeyDown` to call `resetRow(row.index)`.
   - **Auto-Revert**: In `updateData`, if the user clears all inputs back to empty (`isRowEmpty(updatedRow)`), immediately clear RHF errors for that row index.

5. **`onRowCommit` Contract**:
   When committing, default sensible fields (like today's date if missing), atomically replace fields, append a fresh phantom row, and explicitly flush RHF and local errors:
   ```ts
   // In onRowCommit:
   if (row.isPhantom) {
     const rowsToReplace = [...currentRows];
     rowsToReplace[rowIndex] = { ...row, isPhantom: false };
     rowsToReplace.push(createDefaultPhantomRow());
     replace(rowsToReplace);

     form.clearErrors(`${FIELD_NAME}.${rowIndex}`);
     form.clearErrors(FIELD_NAME);
     clearRowErrors(rowIndex);
     return 'ADVANCE';
   }
   ```

---

## 11. Decoupled Multi-Row Error Association (`useTableRowErrors` & `<TableErrorSummary />`)

### The Problem:
Legacy table implementations frequently extract only the first error of the first invalid row (`Row 1: ...`), leaving subsequent rows invisible until the first is resolved. Furthermore, stale errors linger after user edits because RHF does not automatically clear array field errors on individual keystrokes.

### The Solution:
Use the reusable table error primitives located in `@/components/EditableTable`:

1. **`useTableRowErrors` Hook**:
   Synchronizes RHF errors with TanStack Table meta, tracks real-time stale-error suppression on cell edits, and generates an itemized list of row errors.

   ```tsx
   import { useTableRowErrors, TableErrorSummary } from '@/components/EditableTable';

   export const useMyTable = (form: UseFormReturn<FormValues>) => {
     const {
       rowErrors,
       errorsList,
       hasErrors,
       totalErrorCount,
       tableRootError,
       clearRowErrors,
     } = useTableRowErrors(form, FORM_FIELDS.ITEMS, {
       fields,
       isRowEmpty,
       isPhantom: (row) => Boolean(row?.isPhantom),
       columnLabels: {
         item_id: 'Item',
         quantity: 'Quantity',
         rate: 'Rate',
       },
     });

     // ...
   };
   ```

2. **`<TableErrorSummary />` Component**:
   Renders an accessible (`role="alert"`), compact banner directly below `<Table.Root>`. It displays `Row N` badges, localized column error descriptions, and an optional 1-click **Discard** button to instantly revert invalid rows.

   ```tsx
   <div className="rounded-md border border-border/60 bg-surface overflow-hidden flex flex-col">
     <Table.Root
       data={fields}
       columns={columns}
       tableOptions={{
         meta: {
           state: { rowErrors, isRowEmpty },
           actions: { updateData, onRowCommit, removeRow, resetRow },
           removeRow,
           resetRow,
         },
       }}
     >
       {/* Table Header and Body */}
     </Table.Root>

     <TableErrorSummary
       errorsList={errorsList}
       tableRootError={tableRootError}
       onResetRow={resetRow}
     />
   </div>
   ```
