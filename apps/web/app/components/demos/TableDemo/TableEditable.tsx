"use client";

import { Table, TextInput, flexRender, ColumnDef, DropdownMenu, DatePicker, Icon } from "@prime/ui";
import * as React from "react";
import { Invoice, generateData } from "./shared";

// Editable Cell component helper
const EditableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);
  const isEditing = table.options.meta?.editingRowIndex === row.index;
  const isPhantom = row.original.isPhantom;

  const error = table.options.meta?.rowErrors?.[row.index] || false;

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    if (table.options.meta?.updateData && !error) {
      table.options.meta.updateData(row.index, column.id, value);
    }
  };

  if (!isEditing) {
    // Read-only text
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
      <DropdownMenu items={options} triggerLabel={value as string || (column.id === 'status' ? 'Status' : 'Method')}>
        <button 
          className="h-8 w-full flex items-center justify-between px-3 text-sm bg-surface transition-all rounded-md border border-input shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
        >
          {value as string || <span className="text-muted-foreground">Select...</span>} <Icon name="ChevronDown" size={16} />
        </button>
      </DropdownMenu>
    );
  }

  if (column.id === "date") {
    return (
      <div className="w-full flex items-center">
        <DatePicker
          date={(() => {
            if (!value) return undefined;
            const strVal = value as string;
            const isoParsed = new Date(`${strVal}T00:00:00`);
            if (!isNaN(isoParsed.getTime())) return isoParsed;
            const parsed = new Date(strVal);
            return isNaN(parsed.getTime()) ? undefined : parsed;
          })()}
          onDateChange={(d) => {
            if (d) {
              const year = d.getFullYear();
              const month = String(d.getMonth() + 1).padStart(2, '0');
              const day = String(d.getDate()).padStart(2, '0');
              const formatted = `${year}-${month}-${day}`;
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
        }}
        onBlur={onBlur}
        placeholder={isPhantom ? "Enter amount..." : ""}
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
  const [data, setData] = React.useState<Invoice[]>(() => [
    { id: "INV-1", date: "", status: "Pending", method: "Credit Card", amount: "", isPhantom: true }
  ]);
  const [rowErrors, setRowErrors] = React.useState<Record<number, boolean>>({});

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

  const onRowCommit = (rowIndex: number, columnId?: string, cellValue?: string) => {
    let row = data[rowIndex];
    
    // If the user pressed enter while actively typing in a field, sync that value immediately!
    if (columnId && cellValue !== undefined) {
      row = { ...row, [columnId]: cellValue };
      updateData(rowIndex, columnId, cellValue);
    }
    
    // Custom Validation: Amount must be numeric
    const numeric = Number(row.amount.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numeric) || row.amount.trim() === "") {
      setRowErrors(prev => ({ ...prev, [rowIndex]: true }));
      setTimeout(() => {
        setRowErrors(prev => ({ ...prev, [rowIndex]: false }));
      }, 500);
      return "STAY"; // Block commit, stay in edit mode
    }

    // Success! If it's a phantom row, convert it and spawn a new one
    if (row.isPhantom) {
      setData(old => {
        const newData = [...old];
        // Ensure the last-second cellValue is merged in the new array too, in case updateData was batched
        const committedRow = columnId && cellValue !== undefined 
          ? { ...newData[rowIndex]!, [columnId]: cellValue, isPhantom: false }
          : { ...newData[rowIndex]!, isPhantom: false };
          
        newData[rowIndex] = committedRow;
        
        // Append new phantom row at the bottom
        newData.push({
          id: `INV-${newData.length + 1}`,
          date: "",
          status: "Pending",
          method: "Credit Card",
          amount: "",
          isPhantom: true
        });
        return newData;
      });
      return "ADVANCE"; // Move focus to the newly spawned phantom row
    }

    return "EXIT"; 
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
            onRowCommit,
            rowErrors,
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
          {(row, isFocused) => {
            const isPhantomActionState = row.original.isPhantom && !isFocused;

            return (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                data-focused={isFocused}
                className={isPhantomActionState ? "bg-primary/5 hover:bg-primary/10 border-t border-dashed border-primary/20 cursor-pointer" : undefined}
              >
                {isPhantomActionState ? (
                  <Table.Cell
                    style={{ width: "100%", flex: "1 1 100%" }}
                    className="py-0 flex items-center justify-center text-primary text-sm font-medium transition-colors"
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Add New Invoice 
                    <span className="ml-2 text-primary/80 font-normal text-xs">(Press Ctrl+N)</span>
                  </Table.Cell>
                ) : (
                  row.getVisibleCells().map((cell) => (
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
                  ))
                )}
              </Table.Row>
            );
          }}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
