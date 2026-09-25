import React, { useMemo } from 'react';
import { Table, Icon } from '@prime/ui';
import { flexRender } from '@tanstack/react-table';
import { useCostCenterAllocationTable } from './useCostCenterAllocationTable';
import { getColumns, type CostCenterAllocationRow } from './columns';
import { getColumnStyles, rowVariants } from './styles';

export interface CostCenterAllocationTableProps {
  initialAllocations?: CostCenterAllocationRow[];
  onChange?: (allocations: CostCenterAllocationRow[]) => void;
  targetAmount: number;
}

export const CostCenterAllocationTable = ({
  initialAllocations = [],
  onChange,
  targetAmount,
}: CostCenterAllocationTableProps) => {
  const {
    data,
    updateData,
    onRowCommit,
    removeRow,
    rowErrors,
    totalAllocatedAmount,
    isFullyAllocated,
    isOverAllocated,
  } = useCostCenterAllocationTable(initialAllocations, onChange, targetAmount);

  const columns = useMemo(() => getColumns(), []);

  return (
    <div className="flex flex-col space-y-3 h-full overflow-hidden">
      <div className="flex items-center justify-between flex-shrink-0">
        <h3 className="text-sm font-medium text-foreground">Allocations</h3>
        <span className="text-xs text-muted-fg">
          Allocated:{' '}
          <span className={isOverAllocated ? 'text-danger font-bold' : ''}>
            {totalAllocatedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>{' '}
          / {targetAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className="rounded-md border border-border/40 bg-surface overflow-hidden flex-1 flex flex-col min-h-0">
        <Table.Root
          data={data}
          columns={columns}
          className="h-full flex-1 rounded-none border-x-0 border-t-0 border-b-0"
          tableOptions={{
            meta: {
              state: {
                rowErrors,
                isRowEmpty: (row: any) => 
                  !row.original.costCenter && 
                  !row.original.costCategory && 
                  (!row.original.amount || row.original.amount === "0.00" || row.original.amount === "0"),
              },
              phantomRowConfig: {
                isPhantom: (row: any) => (row.original as any).isPhantom,
                actionText: 'Add New Allocation',
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
            {(row: any, isFocused: boolean) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
                data-focused={isFocused}
                className={rowVariants({ 
                  isPhantom: !!(row.original as any).isPhantom, 
                  isFocused 
                })}
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
            )}
          </Table.Body>
        </Table.Root>
      </div>

      {/* Visual Hint for Full Allocation */}
      {isFullyAllocated && (
        <div className="flex items-center text-xs text-success bg-success/10 px-3 py-2 rounded-md border border-success/20 flex-shrink-0">
          <Icon name="CheckCircle2" size={16} className="mr-2 flex-shrink-0" />
          Total amount is fully allocated.
        </div>
      )}

      {/* Visual Error for Over Allocation */}
      {isOverAllocated && (
        <div className="flex items-center text-xs text-danger bg-danger/10 px-3 py-2 rounded-md border border-danger/20 flex-shrink-0">
          <Icon name="AlertCircle" size={16} className="mr-2 flex-shrink-0" />
          Total allocated amount ({totalAllocatedAmount.toLocaleString()}) exceeds the target amount (
          {targetAmount.toLocaleString()}). Please adjust your allocations.
        </div>
      )}
    </div>
  );
};
