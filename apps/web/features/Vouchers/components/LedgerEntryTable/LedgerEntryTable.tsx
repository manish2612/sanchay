import React from "react";
import { Table, flexRender } from "@prime/ui";
import { ledgerColumns } from "./columns";
import { useLedgerEntryTable } from "../../hooks/useLedgerEntryTable";

export function LedgerEntryTable() {
  const { data, rowErrors, updateData, onRowCommit } = useLedgerEntryTable();

  return (
    <div className="flex-1 border-t border-border bg-surface overflow-hidden flex flex-col max-h-[200px]">
      <Table.Root
        data={data}
        columns={ledgerColumns}
        className="h-full flex-1 rounded-none border-x-0 border-b-0"
        tableOptions={{
          meta: {
            updateData,
            onRowCommit,
            rowErrors,
            phantomRowConfig: {
              isPhantom: (row) => row.original.isPhantom,
              actionText: "Add New Entry",
            },
            isRowEmpty: (row: any) => row.original.name.trim() === "",
          },
        }}
      >
        <Table.Body className="bg-background">
          {(row, isFocused) => (
            <Table.Row
              key={row.id}
              data-state={row.getIsSelected() ? "selected" : undefined}
              data-focused={isFocused}
              className={`hover:bg-surface-variant/30 transition-colors border-b border-border group ${
                row.original.isPhantom ? "bg-primary/5" : ""
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                    flex: `${cell.column.getSize()} 0 auto`,
                  }}
                  className={`py-0 border-r border-border last:border-r-0 ${
                    (cell.column.columnDef.meta as any)?.cellClassName || ""
                  }`}
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
