"use client";

import { Table, ColumnDef, flexRender } from "@sanchay/ui";
import * as React from "react";

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  method: "credit_card" | "paypal" | "bank_transfer";
};

// Generate 1000 rows
const data: Invoice[] = Array.from({ length: 1000 }).map((_, i) => ({
  id: `INV-${i + 1}`,
  date: new Date(2024, 0, i + 1).toLocaleDateString(),
  amount: `$${(Math.random() * 1000).toFixed(2)}`,
  status: ["paid", "pending", "failed"][Math.floor(Math.random() * 3)] as any,
  method: ["credit_card", "paypal", "bank_transfer"][
    Math.floor(Math.random() * 3)
  ] as any,
}));

const columns: ColumnDef<Invoice>[] = [
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
    cell: (info) => (
      <div className="text-right font-medium">{info.getValue() as string}</div>
    ),
  },
];

export function TableDemo() {
  return (
    <div className="w-full p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Virtual Table Demo (Composition Pattern)
      </h2>
      <div className="h-[500px]">
        <Table.Root data={data} columns={columns} className="h-full">
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

          <Table.StatusPosition position="top" />

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
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>

          <Table.StatusPosition position="bottom" />

          <Table.Footer>
            <div className="px-4 py-2">
              Footer Content (Total: {data.length} invoices)
            </div>
          </Table.Footer>
        </Table.Root>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Use Up/Down Arrow keys to navigate. Now fully Composable!
      </p>
    </div>
  );
}
