"use client";

import { Table, flexRender } from "@sanchay/ui";
import * as React from "react";
import { columns, generateData } from "./shared";

export function TableNoChrome6() {
  const data = React.useMemo(() => generateData(6), []);

  return (
    <div className="border rounded-md h-[500px]">
      <Table.Root data={data} columns={columns} className="h-full">
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
      </Table.Root>
    </div>
  );
}
