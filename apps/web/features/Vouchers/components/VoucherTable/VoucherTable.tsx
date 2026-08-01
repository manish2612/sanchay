import React from "react";
import { Table, flexRender } from "@prime/ui";
import { editableColumns } from "./columns";
import { useVoucherTable } from "../../hooks/useVoucherTable";

export function VoucherTable() {
  const { data, rowErrors, updateData, onRowCommit } = useVoucherTable();

  return (
    <div className="flex-1 border-t border-border bg-surface overflow-hidden flex flex-col min-h-[300px]">
      <Table.Root
        data={data}
        columns={editableColumns}
        className="h-full flex-1"
        tableOptions={{
          meta: {
            updateData,
            onRowCommit,
            rowErrors,
            phantomRowConfig: {
              isPhantom: (row) => row.original.isPhantom,
              actionText: "Add New Row",
            },
          },
        }}
      >
        <Table.Header className="bg-surface-variant/50 sticky top-0 z-10 shadow-sm border-b border-border">
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
                      className="px-2 py-2 text-xs font-semibold text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis"
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

        {/* The Body uses the remaining space. We ensure there's enough height for ~7 rows. */}
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
