import React from 'react';
import { Table, flexRender } from '@prime/ui';
import { editableColumns } from './columns';
import { useVoucherItemTable } from '../../hooks/useVoucherItemTable';
import { VoucherSectionHeader } from '../VoucherSectionHeader';

export function VoucherItemTable() {
  const { data, rowErrors, updateData, onRowCommit } = useVoucherItemTable();

  // Count non-phantom (real data) rows
  const dataRowCount = data.filter((r) => !r.isPhantom).length;

  return (
    <div className="flex-1 flex flex-col min-h-[220px] border-b border-border overflow-hidden">
      {/* Section header */}
      <VoucherSectionHeader
        title="Item Lines"
        count={dataRowCount > 0 ? `${dataRowCount} row${dataRowCount !== 1 ? 's' : ''}` : undefined}
        hint="↑↓ Arrow keys to navigate rows"
      />

      {/* Table */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <Table.Root
          data={data}
          columns={editableColumns}
          className="h-full flex-1 rounded-none border-x-0 border-t-0"
          tableOptions={{
            meta: {
              actions: {
                updateData,
                onRowCommit,
              },
              state: {
                rowErrors,
                isRowEmpty: (row: any) => row.original.item.trim() === '',
              },
              phantomRowConfig: {
                isPhantom: (row: any) => row.original.isPhantom,
                actionText: 'Add New Row',
              },
            },
          }}
        >
          {/* Table Header */}
          <Table.Header className="bg-surface-variant sticky top-0 z-10 border-b border-border h-8">
            {({ table }) => (
              <>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.HeaderRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const isFluid = (header.column.columnDef.meta as any)?.layout?.fluid;
                      return (
                        <Table.Head
                          key={header.id}
                          style={{
                            flex: isFluid ? '1 1 0%' : `0 0 ${header.getSize()}px`,
                            width: isFluid ? '100%' : `${header.getSize()}px`,
                            minWidth: isFluid
                              ? `${header.column.columnDef.minSize || 0}px`
                              : `${header.getSize()}px`,
                            maxWidth: isFluid ? undefined : `${header.getSize()}px`,
                          }}
                          className={`px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis h-8 border-r border-border last:border-r-0 ${(header.column.columnDef.meta as any)?.layout?.headerClassName || ''}`}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Table.Head>
                      );
                    })}
                  </Table.HeaderRow>
                ))}
              </>
            )}
          </Table.Header>

          {/* Table Body */}
          <Table.Body className="bg-background">
            {(row, isFocused) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
                data-focused={isFocused}
                className={`transition-colors border-b border-border last:border-b-0 border-l-3 border-l-transparent group ${
                  row.original.isPhantom
                    ? 'bg-primary/5'
                    : isFocused
                      ? 'bg-primary/[0.06] border-l-primary'
                      : 'hover:bg-surface-variant/40'
                }`}
              >
                {row.getVisibleCells().map((cell) => {
                  const isFluid = (cell.column.columnDef.meta as any)?.layout?.fluid;
                  return (
                    <Table.Cell
                      key={cell.id}
                      style={{
                        flex: isFluid ? '1 1 0%' : `0 0 ${cell.column.getSize()}px`,
                        width: isFluid ? '100%' : `${cell.column.getSize()}px`,
                        minWidth: isFluid
                          ? `${cell.column.columnDef.minSize || 0}px`
                          : `${cell.column.getSize()}px`,
                        maxWidth: isFluid ? undefined : `${cell.column.getSize()}px`,
                      }}
                      className={`py-0 border-r border-border last:border-r-0 ${
                        (cell.column.columnDef.meta as any)?.layout?.cellClassName || ''
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
