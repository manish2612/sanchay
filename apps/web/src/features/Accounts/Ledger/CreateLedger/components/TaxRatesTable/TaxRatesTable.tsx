import React, { useMemo } from 'react';
import { Table } from '@prime/ui';
import { flexRender } from '@tanstack/react-table';
import { UseFormReturn } from 'react-hook-form';
import { useTaxRatesTable } from './useTaxRatesTable';
import { getColumns } from './columns';
import { APPLICABILITY_OPTIONS } from '../../constants';
import type { LedgerFormValues } from '../../schema';
import { LEDGER_FORM_FIELDS } from '../../constants';

interface TaxRatesTableProps {
  form: UseFormReturn<LedgerFormValues>;
}

export const TaxRatesTable: React.FC<TaxRatesTableProps> = ({ form }) => {
  const columns = useMemo(() => getColumns(), []);

  const {
    fields,
    taxGroups,
    updateData,
    removeRow,
    onRowCommit,
    isRowEmpty,
    localRowErrors,
  } = useTaxRatesTable(form);

  const taxGroupOptions = useMemo(() => {
    return taxGroups.map((tg) => ({
      label: tg.name ? `${tg.name} (${tg.combined_rate}%)` : tg.name,
      value: tg.id,
    }));
  }, [taxGroups]);

  const exciseTaxGroupOptions = useMemo(() => {
    return [{ label: 'None', value: '' }, ...taxGroupOptions];
  }, [taxGroupOptions]);

  const rowErrors = useMemo(() => {
    const errs: Record<number, any> = { ...localRowErrors };
    const rhfErrors = form.formState.errors?.[LEDGER_FORM_FIELDS.TAX_RATES as keyof LedgerFormValues];
    if (Array.isArray(rhfErrors)) {
      rhfErrors.forEach((err, idx) => {
        const row = fields[idx] as any;
        if (row?.isPhantom) return;
        if (err) {
          errs[idx] = {
            ...(typeof errs[idx] === 'object' ? errs[idx] : {}),
            ...err,
          };
        }
      });
    }
    return errs;
  }, [form.formState.errors, fields, localRowErrors]);

  return (
    <div className="rounded-md border border-border/60 bg-surface overflow-hidden">
      <Table.Root
        data={fields as any}
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
              isPhantom: (row: any) => Boolean(row.original?.isPhantom),
              actionText: 'Add New Tax Rate',
            },
            actions: {
              updateData,
              onRowCommit,
              removeRow,
            },
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
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </Table.Head>
                  ))}
                </Table.HeaderRow>
              ))}
            </>
          )}
        </Table.Header>

        <Table.Body className="bg-background">
          {(row: any, isFocused: boolean) => (
            <Table.Row
              key={row.id}
              data-state={row.getIsSelected() ? 'selected' : undefined}
              data-focused={isFocused}
              className={`transition-colors border-b border-border/60 last:border-b-0 border-l-3 group ${
                row.original?.isPhantom
                  ? 'bg-primary/5'
                  : isFocused
                    ? 'bg-primary/[0.06] border-l-primary'
                    : 'hover:bg-surface-variant/40'
              }`}
            >
              {row.getVisibleCells().map((cell: any) => (
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
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
