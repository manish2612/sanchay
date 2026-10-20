import React from 'react';
import { Table, Icon } from '@prime/ui';
import { useGodownAllocationTable } from './useGodownAllocationTable';
import { getColumns } from './columns';
import { useMemo, useCallback } from 'react';
import { flexRender } from '@tanstack/react-table';
import { AllocationTableLayout } from '@/components/AllocationTableLayout';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';
import { STOCK_ITEM_FORM_FIELDS } from '../../constants';

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
    rowErrors,
    errorSummary,
    godownOptions,
  } = useGodownAllocationTable(form);

  const hasMfgDate = Boolean(form.watch(STOCK_ITEM_FORM_FIELDS.TRACK_MFG_DATE));
  const hasExpiryDate = Boolean(form.watch(STOCK_ITEM_FORM_FIELDS.TRACK_EXPIRY_DATE));
  const hasBatches = Boolean(form.watch(STOCK_ITEM_FORM_FIELDS.MAINTAIN_BATCHES));

  const onCreateGodown = useCallback(() => openMasterSheet('godown'), [openMasterSheet]);
  const columns = useMemo(
    () => getColumns(openingQuantity, onCreateGodown, hasMfgDate, hasExpiryDate, hasBatches),
    [openingQuantity, onCreateGodown, hasMfgDate, hasExpiryDate, hasBatches]
  );
  const isFullyAllocated = openingQuantity > 0 && totalAllocatedQuantity === openingQuantity;
  const isOverAllocated = totalAllocatedQuantity > openingQuantity;

  // Synthesize real-time row errors for the 'quantity' column if overallocated, and merge local validation errors
  const mergedRowErrors = useMemo(() => {
    let errs: Record<number, any> = { ...localRowErrors };
    Object.entries(rowErrors).forEach(([idx, colErrs]) => {
      errs[Number(idx)] = { ...(errs[Number(idx)] || {}), ...colErrs };
    });

    if (isOverAllocated) {
      fields.forEach((_: any, idx: number) => {
        errs[idx] = { ...(errs[idx] || {}), quantity: 'Overallocated limit' };
      });
    }
    return errs;
  }, [rowErrors, localRowErrors, isOverAllocated, fields]);

  // If Godown feature is off, don't show the table
  if (!enableGodownAllocation) return null;

  return (
    <div className="mt-6 h-full">
      <AllocationTableLayout
        title="Godown Allocation"
        currentValue={totalAllocatedQuantity}
        targetValue={openingQuantity}
        isFullyAllocated={isFullyAllocated}
        isOverAllocated={isOverAllocated}
        successMessage="Total quantity is fully allocated. You cannot add more godowns."
        errorMessagePrefix="Total allocated quantity"
        errorMessageTargetLabel="opening quantity limit"
      >
        <Table.Root
          data={fields}
          columns={columns}
          className="h-full flex-1 rounded-none border-x-0 border-t-0 "
          tableOptions={{
            meta: {
              options: {
                godowns: godownOptions,
              },
              state: {
                rowErrors: mergedRowErrors,
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
            {(row: any, isFocused: boolean) => {
              const hasRowError = Boolean(
                mergedRowErrors[row.index] &&
                  (typeof mergedRowErrors[row.index] === 'boolean'
                    ? mergedRowErrors[row.index]
                    : Object.keys(mergedRowErrors[row.index]).length > 0)
              );

              return (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  data-focused={isFocused}
                  data-error={hasRowError ? 'true' : undefined}
                  className={`transition-colors border-b border-border last:border-b-0 border-l-3 group ${
                    hasRowError
                      ? 'border-l-danger bg-danger/[0.04]'
                      : (row.original as any).isPhantom
                        ? 'border-l-transparent bg-primary/5'
                        : isFocused
                          ? 'bg-primary/[0.06] border-l-primary'
                          : 'border-l-transparent hover:bg-surface-variant/40'
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
              );
            }}
          </Table.Body>
        </Table.Root>

        {openingQuantity <= 0 && (
          <div className="flex items-center gap-2 p-3 text-xs text-muted-foreground bg-muted/20 border-t border-border">
            <Icon name="Info" size={14} className="shrink-0 text-muted-foreground" />
            <span>Enter opening quantity above to allocate godowns.</span>
          </div>
        )}

        {errorSummary && (
          <div className="flex items-center gap-2 p-2.5 px-3 text-xs text-danger bg-danger/10 border-t border-danger/20">
            <Icon name="CircleAlert" size={14} className="shrink-0" />
            <span>{errorSummary}</span>
          </div>
        )}
      </AllocationTableLayout>
    </div>
  );
};
