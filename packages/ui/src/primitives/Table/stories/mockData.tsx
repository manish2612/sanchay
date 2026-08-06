import React, { useState } from 'react';
import { TextInput, DropdownMenu, DatePicker, Icon } from '../../../index';
import type { ColumnDef } from '@tanstack/react-table';

export type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed" | "Pending" | "Paid" | "Unpaid";
  method: "credit_card" | "paypal" | "bank_transfer" | "Credit Card" | "PayPal" | "Bank Transfer";
  isPhantom?: boolean;
};

export const generateData = (count: number): Invoice[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `INV-${i + 1}`,
    date: new Date(2024, 0, i + 1).toLocaleDateString(),
    amount: `$${(Math.random() * 1000).toFixed(2)}`,
    status: ["paid", "pending", "failed"][Math.floor(Math.random() * 3)] as any,
    method: ["credit_card", "paypal", "bank_transfer"][
      Math.floor(Math.random() * 3)
    ] as any,
  }));
};

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "Invoice",
    size: 100,
  },
  {
    accessorKey: "date",
    header: "Date",
    size: 150,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
  },
  {
    accessorKey: "method",
    header: "Method",
    size: 200,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 100,
    cell: (info: any) => (
      <div className="text-right font-medium">{info.getValue() as string}</div>
    ),
  },
];

export const EditableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
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
    return (
      <span className="px-3 w-full h-full flex items-center text-sm border border-transparent">
        {value as string}
      </span>
    );
  }

  if (column.id === "status" || column.id === "method") {
    const options =
      column.id === "status"
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
      <DropdownMenu items={options} triggerLabel={(value as string) || (column.id === "status" ? "Status" : "Method")}>
        <button className="h-8 w-full flex items-center justify-between px-3 text-sm bg-surface transition-all rounded-md border border-input shadow-sm focus:ring-2 focus:ring-primary focus:outline-none">
          {(value as string) || <span className="text-muted-foreground">Select...</span>}{" "}
          <Icon name="ChevronDown" size={16} />
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
              const month = String(d.getMonth() + 1).padStart(2, "0");
              const day = String(d.getDate()).padStart(2, "0");
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
    <TextInput
      className={`h-8 w-full my-auto bg-surface transition-all ${error ? "ring-2 ring-destructive ring-offset-1 animate-shake" : ""}`}
      inputClassName="text-sm px-3 h-full"
      value={value as string}
      onChange={(e) => { setValue(e.target.value); }}
      onBlur={onBlur}
      placeholder={isPhantom ? "Enter amount..." : ""}
    />
  );
};

export const editableColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "Invoice",
    size: 100,
    cell: (info) => (
      <span className="px-3 w-full h-full flex items-center text-sm text-muted-foreground font-medium border border-transparent">
        {info.getValue() as string}
      </span>
    ),
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
