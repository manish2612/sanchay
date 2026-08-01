import { ColumnDef } from "@prime/ui";
import * as React from "react";

export type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed" | "Pending" | "Paid" | "Unpaid";
  method: "credit_card" | "paypal" | "bank_transfer" | "Credit Card" | "PayPal" | "Bank Transfer";
  isPhantom?: boolean;
};

// Helper to generate data
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
