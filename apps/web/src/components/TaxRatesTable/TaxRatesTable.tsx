import React, { useMemo } from 'react';
import { Table } from '@prime/ui';
import { flexRender, type Cell, type Row } from '@tanstack/react-table';
import { FieldValues } from 'react-hook-form';
import { useTaxRatesTable } from './useTaxRatesTable';
import { getColumns } from './columns';
import { APPLICABILITY_OPTIONS } from './constants';
import type { TaxRateRow, TaxRatesTableProps } from './types';
import { TableErrorSummary } from '@/components/EditableTable';

export const TaxRatesTable = <TFormValues extends FieldValues = FieldValues>({
  form,
  name = 'taxRates',
  className = '',
}: TaxRatesTableProps<TFormValues>) => {
  const columns = useMemo(() => getColumns(), []);

  const {
    fields,
    taxGroups,
    updateData,
    removeRow,
    resetRow,
    onRowCommit,
    isRowEmpty,
    rowErrors,
    errorsList,
    tableRootError,
  } = useTaxRatesTable(form, name);

  const taxGroupOptions = useMemo(() => {
    return taxGroups.map((tg) => ({
      label: tg.name ? `${tg.name} (${tg.combined_rate}%)` : tg.name,
      value: tg.id,
    }));
  }, [taxGroups]);

  const exciseTaxGroupOptions = useMemo(() => {
    return [{ label: 'None', value: '' }, ...taxGroupOptions];
  }, [taxGroupOptions]);

  return (
    <div
      className={`rounded-md border border-border/60 bg-surface overflow-hidden flex flex-col ${className}`}
    >
      <Table.Root
        data={fields as unknown as TaxRateRow[]}
        columns={columns}
        rowHeight={38}
        className="w-full rounded-none border-0"
        tableOptions={{
          meta: {
            state: {
              rowErrors,
              isRowEmpty,
            },
            options: {
              tax_group_id: taxGroupOptions,
              excise_tax_group_id: exciseTaxGroupOptions,
              applicability: APPLICABILITY_OPTIONS,
            },
            phantomRowConfig: {
              isPhantom: (row: { original?: TaxRateRow }) => Boolean(row.original?.isPhantom),
              actionText: 'Add New Tax Rate',
            },
            actions: {
              updateData,
              onRowCommit,
              removeRow,
              resetRow,
            },
            removeRow,
            resetRow,
          },
        }}
      >
        <Table.Header className="bg-surface-variant sticky top-0 z-10 border-b border-border h-8 shrink-0">
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
                      className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground h-8 border-r border-border/60 last:border-r-0 select-none"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
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

        <Table.Body className="bg-background">
          {(row: Row<TaxRateRow>, isFocused: boolean) => {
            const isPhantom = Boolean(row.original?.isPhantom);
            const hasRowError = Boolean(
              rowErrors[row.index] &&
                Object.keys(rowErrors[row.index]).length > 0
            );

            return (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
                data-focused={isFocused}
                data-error={hasRowError ? 'true' : undefined}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Escape') {
                    resetRow(row.index);
                  }
                }}
                className={`transition-colors border-b border-border/60 last:border-b-0 border-l-3 group ${
                  hasRowError
                    ? 'border-l-danger bg-danger/[0.04]'
                    : isPhantom
                      ? 'border-l-transparent bg-primary/5'
                      : isFocused
                        ? 'bg-primary/[0.06] border-l-primary'
                        : 'border-l-transparent hover:bg-surface-variant/40'
                }`}
              >
                {row.getVisibleCells().map((cell: Cell<TaxRateRow, unknown>) => (
                  <Table.Cell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      flex: `${cell.column.getSize()} 0 auto`,
                    }}
                    className="px-2 py-1 border-r border-border/60 last:border-r-0 overflow-hidden flex items-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            );
          }}
        </Table.Body>
      </Table.Root>

      <TableErrorSummary
        errorsList={errorsList}
        tableRootError={tableRootError}
        onResetRow={resetRow}
      />
    </div>
  );
};
