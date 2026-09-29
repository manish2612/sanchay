import React from "react";
import { Table, flexRender } from "@prime/ui";
import { ledgerColumns } from "./columns";
import { useLedgerEntryTable } from "../../hooks/useLedgerEntryTable";
import { VoucherSectionHeader } from "../VoucherSectionHeader";
import { LineDetailsSheet } from "../LineDetailsSheet";
import { CostCenterAllocationSheet } from "@/features/CostCenter/components/CostCenterAllocationSheet";
import { getColumnStyles, rowVariants } from "./styles";
import { useGetLedgersQuery } from "@/features/Accounts/Ledger/api";

export function LedgerEntryTable({ applyMode = "Item Mode" }: { applyMode?: string }) {
  const { data: ledgers, isLoading: isLedgersLoading } = useGetLedgersQuery();

  const { 
    data, 
    activeColumns,
    totalDebit,
    totalCredit,
    tableOptions,
    handleDetailsClose,
    handleCostCenterClose,
    handleCostCenterSave,
    activeDetailsRowIndex,
    activeCostCenterRowIndex,
    activeCostCenterRow,
    activeCostCenterTargetAmount,
    updateData
  } = useLedgerEntryTable(applyMode, ledgers || []);

  return (
    <div className="flex-1 flex flex-col min-h-[140px] overflow-hidden relative">
      <div className="flex-1 overflow-hidden flex flex-col">
        <Table.Root
          data={data}
          columns={activeColumns}
          className="h-full flex-1 rounded-none border-x-0 border-t-0 border-b-0"
          tableOptions={tableOptions}
        >
          {/* Table Header */}
          <Table.Header className="bg-surface-variant sticky top-0 z-10 border-b border-border h-8">
            {({ table }) => (
              <>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.HeaderRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const metaLayout = (header.column.columnDef.meta as any)?.layout;
                      const headerClassName = metaLayout?.headerClassName || "";
                      
                      return (
                        <Table.Head
                          key={header.id}
                          style={getColumnStyles(header.column.columnDef, header.getSize())}
                          className={`px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis h-8 border-r border-border last:border-r-0 ${headerClassName}`}
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
            {(row: any, isFocused) => {
              const isRowPhantom = !!row.original?.isPhantom;
              
              return (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  data-focused={isFocused}
                  className={rowVariants({ isPhantom: isRowPhantom, isFocused })}
                >
                  {row.getVisibleCells().map((cell: any) => {
                    const metaLayout = (cell.column.columnDef.meta as any)?.layout;
                    const cellClassName = metaLayout?.cellClassName || "";
                    
                    return (
                      <Table.Cell
                        key={cell.id}
                        style={getColumnStyles(cell.column.columnDef, cell.column.getSize())}
                        className={`py-0 border-r border-border last:border-r-0 ${cellClassName}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              );
            }}
          </Table.Body>

          {/* Table Footer */}
          {applyMode === "Account Mode" && (
            <Table.Footer className="bg-surface-variant sticky bottom-0 z-10 border-t border-border shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
              <Table.Row>
                {activeColumns.map((col: any) => {
                  const key = col.accessorKey;
                  const size = col.size || 150;
                  const isLabel = key === 'name';
                  
                  let content: React.ReactNode = null;
                  let isError = false;
                  if (key === 'debitAmount') {
                    content = totalDebit;
                    isError = (tableOptions as any).meta?.state?.rowErrors?.[0]?.rootMismatch || false;
                  } else if (key === 'creditAmount') {
                    content = totalCredit;
                    isError = (tableOptions as any).meta?.state?.rowErrors?.[0]?.rootMismatch || false;
                  } else if (isLabel) {
                    content = <span className="text-[10px] text-muted-foreground uppercase mr-2 mt-0.5">Total</span>;
                  }
                  
                  return (
                    <Table.Cell 
                      key={key} 
                      style={getColumnStyles(col, size)} 
                      className={`py-1.5 px-2 border-r border-border last:border-r-0 flex items-center justify-end ${isLabel ? '' : 'font-bold text-sm'} ${isError ? 'text-danger ring-1 ring-inset ring-danger' : ''}`}
                    >
                      {content}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            </Table.Footer>
          )}
        </Table.Root>
      </div>

      {activeDetailsRowIndex !== null && (
        <LineDetailsSheet
          open={activeDetailsRowIndex !== null}
          onOpenChange={handleDetailsClose}
          rowIndex={activeDetailsRowIndex}
          row={data[activeDetailsRowIndex]}
          updateData={updateData}
        />
      )}

      {activeCostCenterRow && (
        <CostCenterAllocationSheet
          open={activeCostCenterRowIndex !== null}
          onOpenChange={handleCostCenterClose}
          targetAmount={activeCostCenterTargetAmount}
          ledgerName={activeCostCenterRow.name || 'Unknown Ledger'}
          initialAllocations={activeCostCenterRow.costCenterAllocations}
          onSave={handleCostCenterSave}
        />
      )}
    </div>
  );
}
