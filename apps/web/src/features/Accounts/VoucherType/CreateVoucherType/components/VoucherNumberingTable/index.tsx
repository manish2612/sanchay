import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Table } from '@prime/ui';
import { flexRender } from '@tanstack/react-table';
import { useVoucherNumberingTable } from './useVoucherNumberingTable';
import { columns } from './columns';
import { VoucherTypeFormValues } from './types';

export const VoucherNumberingTable = ({ form }: { form: any }) => {
  const { fields, updateData, removeRow, onRowCommit, rowErrors } = useVoucherNumberingTable(form);
  const formErrors = form.formState.errors.voucherNumbering || {};
  const mergedErrors = { ...(formErrors as any), ...rowErrors };

  return (
    <div className="space-y-4">
      <div className="border border-border rounded-lg overflow-hidden bg-surface-50 flex flex-col">
        <Table.Root
          data={fields}
          columns={columns}
          className="rounded-none border-x-0 border-t-0"
          tableOptions={{
            meta: {
              removeRow,
              actions: {
                updateData,
                onRowCommit,
              },
              state: {
                rowErrors: mergedErrors,
                isRowEmpty: (row: any) => {
                  const data = row.original;
                  return !data.type && !data.fromDate && !data.reset && !data.prefix && !data.suffix && !data.prefillWidth && data.startingNo === 1;
                },
              },
              phantomRowConfig: {
                isPhantom: (row: any) => (row.original as any).isPhantom,
                actionText: 'Add New Numbering Config',
              },
            },
          }}
        >
          <Table.Header className="bg-surface-variant sticky top-0 z-10 border-b border-border h-8">
            {({ table }) => (
              <>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.HeaderRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Table.Head
                        key={header.id}
                        style={{ width: header.getSize(), flex: `${header.getSize()} 0 auto` }}
                        className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground h-8 border-r border-border last:border-r-0"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </Table.Head>
                    ))}
                  </Table.HeaderRow>
                ))}
              </>
            )}
          </Table.Header>
          <Table.Body className="bg-background min-h-[224px]">
            {(row, isFocused) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
                data-focused={isFocused}
                className={`transition-colors border-b border-border last:border-b-0 border-l-3 border-l-transparent group ${
                  (row.original as any).isPhantom
                    ? 'bg-primary/5'
                    : isFocused
                      ? 'bg-primary/[0.06] border-l-primary'
                      : 'hover:bg-surface-variant/40'
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      flex: `${cell.column.getSize()} 0 auto`,
                    }}
                    className="px-2 py-1 border-r border-border last:border-r-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};
