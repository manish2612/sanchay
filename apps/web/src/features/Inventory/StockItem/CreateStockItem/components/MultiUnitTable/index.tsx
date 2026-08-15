import React from 'react';
import { Form, Switch, Table } from '@prime/ui';
import { flexRender } from '@tanstack/react-table';
import { STOCK_ITEM_FORM_FIELDS } from '../../constants';
import { useMultiUnitTable } from './useMultiUnitTable';
import { columns } from './columns';

export const MultiUnitTable = ({ form }: { form: any }) => {
  const { enableMultiUnit, fields, updateData, removeRow, onRowCommit } = useMultiUnitTable(form);

  return (
    <div className="space-y-4">
      <Form.Field
        control={form.control}
        name={STOCK_ITEM_FORM_FIELDS.ENABLE_MULTI_UNIT}
        render={({ field }) => (
          <Form.Item className="flex items-center gap-3 space-y-0 p-4 border border-border rounded-lg">
            <Form.Control>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </Form.Control>
            <div className="space-y-1 leading-none">
              <Form.Label>Multi Unit Conversions</Form.Label>
              <p className="text-sm text-muted-fg">
                Enable alternative units of measurement for this item.
              </p>
            </div>
          </Form.Item>
        )}
      />

      {enableMultiUnit && (
        <div className="border border-border rounded-lg overflow-hidden bg-surface-50 flex flex-col">
          <Table.Root
            data={fields}
            columns={columns}
            className="h-full flex-1 rounded-none border-x-0 border-t-0"
            tableOptions={{
              meta: {
                updateData,
                removeRow,
                onRowCommit,
                rowErrors: {},
                isRowEmpty: (row: any) => !row.original.unit,
                phantomRowConfig: {
                  isPhantom: (row: any) => (row.original as any).isPhantom,
                  actionText: 'Add New Unit',
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
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Table.Head>
                      ))}
                    </Table.HeaderRow>
                  ))}
                </>
              )}
            </Table.Header>
            <Table.Body className="bg-background">
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
      )}
    </div>
  );
};
