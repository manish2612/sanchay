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
