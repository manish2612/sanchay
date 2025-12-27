"use client";

import { Table, flexRender } from "@sanchay/ui";
import * as React from "react";
import { columns, generateData } from "./shared";

export function TableFull5() {
  const data = React.useMemo(() => generateData(5), []);

  return (
    <div className="border rounded-md h-[500px]">
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
  );
}
