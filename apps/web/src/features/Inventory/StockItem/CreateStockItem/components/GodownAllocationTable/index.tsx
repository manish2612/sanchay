import React from 'react';
import { Table, Icon } from '@prime/ui';
import { useGodownAllocationTable } from './useGodownAllocationTable';
import { getColumns } from './columns';
import { useMemo, useCallback } from 'react';
import { flexRender } from '@tanstack/react-table';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';

export const GodownAllocationTable = ({ form }: { form: any }) => {
  const { openMasterSheet } = useGlobalMasterSheet();
  
  const {
    enableGodownAllocation,
    fields,
    updateData,
    removeRow,
    onRowCommit,
    openingQuantity,
    totalAllocatedQuantity,
    localRowErrors,
  } = useGodownAllocationTable(form);

  const onCreateGodown = useCallback(() => openMasterSheet('godown'), [openMasterSheet]);
  const columns = useMemo(() => getColumns(openingQuantity, onCreateGodown), [openingQuantity, onCreateGodown]);
  const isFullyAllocated = totalAllocatedQuantity === openingQuantity;
  const isOverAllocated = totalAllocatedQuantity > openingQuantity;

  // Synthesize real-time row errors for the 'quantity' column if overallocated, and merge local validation errors
  const rowErrors = useMemo(() => {
    let errs = { ...localRowErrors }; // Start with local visual errors

    const rfhErrors = form.formState.errors?.godownAllocations || [];
    if (Array.isArray(rfhErrors)) {
      rfhErrors.forEach((err, idx) => {
        if (err) errs[idx] = true;
      });
    }

    if (isOverAllocated) {
      fields.forEach((_: any, idx: number) => {
        errs[idx] = true;
      });
    }
    return errs;
  }, [form.formState.errors?.godownAllocations, isOverAllocated, fields, localRowErrors]);

  // If Godown feature is off, or if opening quantity is 0, don't show the table
  if (!enableGodownAllocation || openingQuantity <= 0) return null;

  return (
    <div className="mt-6 flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Godown Allocation</h3>
        <span className="text-xs text-muted-fg">
          Allocated:{' '}
          <span className={totalAllocatedQuantity > openingQuantity ? 'text-danger font-bold' : ''}>
            {totalAllocatedQuantity}
          </span>{' '}
          / {openingQuantity}
        </span>
      </div>
      <div className="rounded-md border border-border/40 bg-surface overflow-hidden">
        <Table.Root
          data={fields}
          columns={columns}
          className="h-full flex-1 rounded-none border-x-0 border-t-0 "
          tableOptions={{
            meta: {
              state: {
                rowErrors,
                isRowEmpty: (row: any) => !row.original.godown,
              },
              phantomRowConfig: {
                isPhantom: (row: any) => (row.original as any).isPhantom,
                actionText: 'Add New Godown Allocation',
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
                {table.getHeaderGroups().map((headerGroup: any) => (
                  <Table.HeaderRow key={headerGroup.id}>
                    {headerGroup.headers.map((header: any) => (
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
          <Table.Body className="bg-background">
            {(row: any, isFocused: boolean) => (
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

      {/* Visual Hint for Full Allocation */}
      {isFullyAllocated && (
        <div className="flex items-center text-xs text-success bg-success/10 px-3 py-2 rounded-md border border-success/20">
          <Icon name="CheckCircle2" size={16} className="mr-2 flex-shrink-0" />
          Total quantity is fully allocated. You cannot add more godowns.
        </div>
      )}

      {/* Visual Error for Over Allocation */}
      {isOverAllocated && (
        <div className="flex items-center text-xs text-danger bg-danger/10 px-3 py-2 rounded-md border border-danger/20">
          <Icon name="AlertCircle" size={16} className="mr-2 flex-shrink-0" />
          Total allocated quantity ({totalAllocatedQuantity}) exceeds the opening quantity limit (
          {openingQuantity}). Please adjust your allocations.
        </div>
      )}
    </div>
  );
};
