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
- **Wrapper className:** `h-8 w-full my-auto bg-surface transition-all px-2`
- **Input className:** `text-sm px-0 h-full` (Add `text-right` for numbers)
- *Note on AutoSuggest:* Ensure it overrides min-heights: `!min-h-8 !py-0`

## 4. Meta Configuration (`table.options.meta`)
All interactivity logic for cells must be passed via the `tableOptions.meta` object at the `<Table.Root>` level.

**Use Cases for Meta:**
- `updateData: (rowIndex, columnId, value) => void`: Called by inputs `onBlur` or `onChange` to update `react-hook-form` state.
- `onRowCommit: (rowIndex, columnId, value) => "ADVANCE" | "EXIT"`: Called when a cell finishes editing. Responsible for converting a phantom row to a real row if valid.
- `removeRow: (rowIndex) => void`: Passed to `ActionCell` to delete rows.
- `rowErrors`: Passes validation errors from `form.formState.errors.arrayName`.
- `phantomRowConfig`: Provides metadata (`isPhantom` checker, `actionText` string) so the table knows which row is the phantom placeholder.

## 5. Handling Errors in Cells
When extracting `rowErrors` from `meta`, you must specifically check `column.id` to prevent **all** inputs in the row from lighting up red if only one field is invalid.

**Correct Error Resolution Pattern (e.g., in `NumericCell`):**
```tsx
const meta = table.options.meta || {} as any;
const rowError = meta?.rowErrors?.[row.index];
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
