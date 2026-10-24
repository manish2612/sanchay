import React, { useMemo } from 'react';
import { Table } from '@prime/ui';
import { flexRender } from '@tanstack/react-table';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import {
  useCostCenterAllocationTable,
  isCostCenterRowEmpty,
} from './useCostCenterAllocationTable';
import { getColumns, type CostCenterAllocationRow } from './columns';
import { costCenterAllocationRowSchema } from './schema';
import { getColumnStyles } from './styles';
import { AllocationTableLayout } from '@/components/AllocationTableLayout';
import { TableErrorSummary } from '@/components/EditableTable';
import { useGetCostCategoriesQuery, useGetCostCentersQuery } from '../../api';

export { isCostCenterRowEmpty, costCenterAllocationRowSchema };
export type { CostCenterAllocationRow };

export interface CostCenterAllocationTableProps<TFormValues extends FieldValues = FieldValues> {
  form?: UseFormReturn<TFormValues>;
  name?: string;
  initialAllocations?: CostCenterAllocationRow[];
  onChange?: (allocations: CostCenterAllocationRow[]) => void;
  targetAmount?: number;
  className?: string;
}

export const CostCenterAllocationTable = <TFormValues extends FieldValues = FieldValues>({
  form,
  name = 'costCenterAllocations',
  initialAllocations = [],
  onChange,
  targetAmount = 0,
  className = '',
}: CostCenterAllocationTableProps<TFormValues>) => {
  const { data: categories } = useGetCostCategoriesQuery();
  const { data: centers } = useGetCostCentersQuery();

  const {
    data,
    updateData,
    onRowCommit,
    resetRow,
    removeRow,
    rowErrors,
    errorsList,
    tableRootError,
    totalAllocatedAmount,
    isFullyAllocated,
    isOverAllocated,
  } = useCostCenterAllocationTable<TFormValues>({
    form,
    name,
    initialAllocations,
    onChange,
    targetAmount,
  });

  const columns = useMemo(() => getColumns(), []);

  const costCategoryOptions = useMemo(() => {
    return (
      categories?.map((cat) => ({
        id: cat.id,
        label: cat.name,
        value: cat.name,
      })) || []
    );
  }, [categories]);

  const costCenterOptions = useMemo(() => {
    return (
      centers?.map((cc: any) => ({
        id: cc.id,
        label: cc.name,
        value: cc.name,
        cost_category_name: cc.cost_category_name,
        cost_category_id: cc.cost_category_id,
      })) || []
    );
  }, [centers]);

  return (
    <AllocationTableLayout
      title="Allocations"
      currentValue={totalAllocatedAmount}
      targetValue={targetAmount}
      isFullyAllocated={isFullyAllocated}
      isOverAllocated={isOverAllocated}
      formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
      className={className}
    >
      <div className="flex flex-col flex-1 h-full min-h-0 overflow-hidden">
        <Table.Root
          data={data}
          columns={columns}
          className="h-full flex-1 rounded-none border-x-0 border-t-0 border-b-0"
          tableOptions={{
            meta: {
              state: {
                rowErrors,
                isRowEmpty: isCostCenterRowEmpty,
              },
              phantomRowConfig: {
                isPhantom: (row: any) => Boolean((row.original as any)?.isPhantom),
                actionText: 'Add New Allocation',
              },
              actions: {
                updateData,
                onRowCommit,
                resetRow,
                removeRow,
              },
              resetRow,
              removeRow,
              options: {
                costCategories: costCategoryOptions,
                costCenters: costCenterOptions,
              },
            },
          }}
        >
          <Table.Header className="bg-surface-variant sticky top-0 z-10 border-b border-border h-8 shrink-0">
            {({ table }) => (
              <>
                {table.getHeaderGroups().map((headerGroup: any) => (
                  <Table.HeaderRow key={headerGroup.id}>
                    {headerGroup.headers.map((header: any) => (
                      <Table.Head
                        key={header.id}
                        style={getColumnStyles(header.column.columnDef, header.getSize())}
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
              const isPhantom = Boolean((row.original as any)?.isPhantom);
              const hasRowError = Boolean(
                rowErrors[row.index] && Object.keys(rowErrors[row.index]).length > 0
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
                  {row.getVisibleCells().map((cell: any) => (
                    <Table.Cell
                      key={cell.id}
                      style={getColumnStyles(cell.column.columnDef, cell.column.getSize())}
                      className="px-2 py-0 border-r border-border last:border-r-0"
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
    </AllocationTableLayout>
  );
};
