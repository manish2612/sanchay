"use client";

import { Table, TextInput, flexRender, ColumnDef, DropdownMenu, DatePicker, Icon } from "@sanchay/ui";
import * as React from "react";
import { Invoice, generateData } from "./shared";

// Editable Cell component helper
const EditableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);
  const isEditing = table.options.meta?.editingRowIndex === row.index;

  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    if (table.options.meta?.updateData && !error) {
      table.options.meta.updateData(row.index, column.id, value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      // Basic mock validation for the Amount column
      if (column.id === "amount") {
        const val = value as string;
        // Strip non-numeric characters (except . and -)
        const numeric = Number(val.replace(/[^0-9.-]+/g, ""));
        if (isNaN(numeric) || val.trim() === "") {
          e.stopPropagation(); // Prevent Table.Root from exiting edit mode
          setError(true);
          setTimeout(() => setError(false), 500); // Clear error state after animation finishes
          return;
        }
      }
      setError(false);
    }
  };

  if (!isEditing) {
    // Read-only text - match the padding and height of the input to avoid layout jumping
    return (
      <span className="px-3 w-full h-full flex items-center text-sm border border-transparent">
        {value as string}
      </span>
    );
  }

  // Edit mode input based on column
  if (column.id === "status" || column.id === "method") {
    const options = column.id === "status" 
      ? [
          { id: "Pending", label: "Pending", onSelect: () => { setValue("Pending"); table.options.meta?.updateData?.(row.index, column.id, "Pending"); } },
          { id: "Paid", label: "Paid", onSelect: () => { setValue("Paid"); table.options.meta?.updateData?.(row.index, column.id, "Paid"); } },
          { id: "Unpaid", label: "Unpaid", onSelect: () => { setValue("Unpaid"); table.options.meta?.updateData?.(row.index, column.id, "Unpaid"); } },
        ]
      : [
          { id: "Credit Card", label: "Credit Card", onSelect: () => { setValue("Credit Card"); table.options.meta?.updateData?.(row.index, column.id, "Credit Card"); } },
          { id: "PayPal", label: "PayPal", onSelect: () => { setValue("PayPal"); table.options.meta?.updateData?.(row.index, column.id, "PayPal"); } },
          { id: "Bank Transfer", label: "Bank Transfer", onSelect: () => { setValue("Bank Transfer"); table.options.meta?.updateData?.(row.index, column.id, "Bank Transfer"); } },
        ];

    return (
      <DropdownMenu items={options} triggerLabel={value as string}>
        <button 
          onKeyDown={handleKeyDown}
          className="h-8 w-full flex items-center justify-between px-3 text-sm bg-surface transition-all rounded-md border border-input shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
        >
          {value as string} <Icon name="expand_more" size={16} />
        </button>
      </DropdownMenu>
    );
  }

  if (column.id === "date") {
    return (
      <div className="w-full flex items-center" onKeyDown={handleKeyDown}>
        <DatePicker
          date={value ? new Date(value as string) : undefined}
          onDateChange={(d) => {
            if (d) {
              const formatted = d.toISOString().split('T')[0];
              setValue(formatted);
              table.options.meta?.updateData?.(row.index, column.id, formatted);
            }
          }}
          className="h-8 py-0 px-3 text-sm bg-surface transition-all rounded-md border border-input shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>
    );
  }

  return (
    <TextInput.Root 
      className={`h-8 w-full my-auto bg-surface transition-all ${
        error ? "ring-2 ring-destructive ring-offset-1 animate-shake" : ""
      }`}
    >
      <TextInput.Input
        value={value as string}
        onChange={(e) => {
          setValue(e.target.value);
          if (error) setError(false); // Clear error on typing
        }}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        className="text-sm px-3 h-full"
      />
    </TextInput.Root>
  );
};

export const editableColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "Invoice",
    size: 100,
    // Typically ID is not editable
    cell: (info) => <span className="px-3 w-full h-full flex items-center text-sm text-muted-foreground font-medium border border-transparent">{info.getValue() as string}</span>,
  },
  {
    accessorKey: "date",
    header: "Date",
    size: 150,
    cell: EditableCell,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
    cell: EditableCell,
  },
  {
    accessorKey: "method",
    header: "Method",
    size: 200,
    cell: EditableCell,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 100,
    cell: EditableCell,
  },
];

export function TableEditable() {
  const [data, setData] = React.useState(() => generateData(10));

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex]!,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <div className="border border-[#222222] rounded-md h-[400px]">
      <Table.Root
        data={data}
        columns={editableColumns}
        className="h-full"
        tableOptions={{
          meta: {
            updateData,
          },
        }}
      >
        <Table.Header>
          {({ table }) => (
            <>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.HeaderRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.Head
                      key={header.id}
                      style={{
                        width: header.getSize(),
                        flex: `${header.getSize()} 0 auto`,
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Table.Head>
                  ))}
                </Table.HeaderRow>
              ))}
            </>
          )}
        </Table.Header>

        <Table.Body>
          {(row, isFocused) => (
            <Table.Row
              key={row.id}
              data-state={row.getIsSelected() ? "selected" : undefined}
              data-focused={isFocused}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                    flex: `${cell.column.getSize()} 0 auto`,
                  }}
                  className="py-0" // Remove vertical padding to perfectly fit the 44px virtual row height, but keep horizontal padding
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
