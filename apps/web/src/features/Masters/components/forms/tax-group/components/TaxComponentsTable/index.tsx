import React, { useMemo, useCallback } from 'react';
import { Table } from '@prime/ui';
import { flexRender } from '@tanstack/react-table';
import { UseFormReturn } from 'react-hook-form';
import { useTaxComponentsTable } from './useTaxComponentsTable';
import { getColumns } from './columns';
import { SCOPE_OPTIONS, COMPUTE_METHOD_OPTIONS } from '../../constants';
import type { TaxGroupFormValues } from '../../types';
import { useGetLedgersQuery } from '@/features/Accounts/Ledger/api';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';

interface TaxComponentsTableProps {
  form: UseFormReturn<TaxGroupFormValues>;
}

export const TaxComponentsTable: React.FC<TaxComponentsTableProps> = ({ form }) => {
  const { openMasterSheet } = useGlobalMasterSheet();
  const { data: ledgers = [] } = useGetLedgersQuery();

  const onCreateLedger = useCallback(() => {
    openMasterSheet('ledger');
  }, [openMasterSheet]);

  const taxLedgerOptions = useMemo(() => {
    const dtLedgers = ledgers.filter((l) => l.sub_category?.toUpperCase() === 'D&T');
    const source = dtLedgers.length > 0 ? dtLedgers : ledgers.filter((l) => /tax|vat|duty/i.test(l.name));
    return source.map((ledger) => ({
      label: ledger.name,
      value: ledger.id,
    }));
  }, [ledgers]);

  const columns = useMemo(() => getColumns(onCreateLedger), [onCreateLedger]);

  const {
    fields,
    updateData,
    removeRow,
    onRowCommit,
    isRowEmpty,
    localRowErrors,
  } = useTaxComponentsTable(form);

  // Synthesize row errors from RHF and local validation
  const rowErrors = useMemo(() => {
    const errs: Record<number, any> = { ...localRowErrors };
    const rhfErrors = form.formState.errors?.components;
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
  }, [form.formState.errors?.components, fields, localRowErrors]);

  return (
    <div className="mt-4 flex flex-col space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <h3 className="text-sm font-semibold text-foreground">Tax Components</h3>
        <span className="text-xs text-muted-foreground">
          Press Tab or Enter on row to add more
        </span>
      </div>

      <div className="rounded-md border border-border/40 bg-surface overflow-hidden">
        <Table.Root
          data={fields as any}
          columns={columns}
          className="w-full rounded-none border-0"
          tableOptions={{
            meta: {
              state: {
                rowErrors,
                isRowEmpty,
              },
              options: {
                taxLedgers: taxLedgerOptions,
                scope: SCOPE_OPTIONS,
                compute_method: COMPUTE_METHOD_OPTIONS,
              },
              phantomRowConfig: {
                isPhantom: (row: any) => Boolean(row.original?.isPhantom),
                actionText: 'Add New Component',
              },
              actions: {
                updateData,
                onRowCommit,
                removeRow,
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
          <Table.Body className="bg-background [&_[data-radix-scroll-area-viewport]]:!overflow-x-hidden">
            {(row: any, isFocused: boolean) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
                data-focused={isFocused}
                className={`transition-colors border-b border-border last:border-b-0 border-l-3 border-l-transparent group ${
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

      {typeof form.formState.errors?.components?.message === 'string' && (
        <div className="text-destructive text-xs mt-1">
          {form.formState.errors.components.message}
        </div>
      )}
    </div>
  );
};
