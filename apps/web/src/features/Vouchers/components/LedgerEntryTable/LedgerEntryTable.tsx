import React from "react";
import { Table, flexRender } from "@prime/ui";
import { ledgerColumns } from "./columns";
import { useLedgerEntryTable } from "../../hooks/useLedgerEntryTable";
import { VoucherSectionHeader } from "../VoucherSectionHeader";
import { LineDetailsSheet } from "../LineDetailsSheet";
import { CostCenterAllocationSheet } from "@/features/CostCenter/components/CostCenterAllocationSheet";
import { getColumnStyles, rowVariants } from "./styles";

export function LedgerEntryTable({ applyMode = "Item Mode" }: { applyMode?: string }) {
  const { 
    data, 
    rowErrors, 
    updateData, 
    onRowCommit,
    activeDetailsRowIndex,
    setActiveDetailsRowIndex,
    activeCostCenterRowIndex,
    setActiveCostCenterRowIndex,
    activeCostCenterRow,
    activeCostCenterTargetAmount,
  } = useLedgerEntryTable(applyMode);

  // Filter columns based on applyMode
  const activeColumns = React.useMemo(() => {
    if (applyMode === "Account Mode") {
      // Exclude standard 'amount' and 'vatAmt'
      return ledgerColumns.filter(col => 
        (col as any).accessorKey !== "amount" && (col as any).accessorKey !== "vatAmt"
      );
    } else {
      // Exclude 'debitAmount' and 'creditAmount'
      return ledgerColumns.filter(col => 
        (col as any).accessorKey !== "debitAmount" && (col as any).accessorKey !== "creditAmount"
      );
    }
  }, [applyMode]);

  return (
    <div className="flex-1 flex flex-col min-h-[140px] overflow-hidden relative">
      <div className="flex-1 overflow-hidden flex flex-col">
        <Table.Root
          data={data}
          columns={activeColumns}
          className="h-full flex-1 rounded-none border-x-0 border-t-0 border-b-0"
          tableOptions={{
            meta: {
              actions: {
                updateData,
                onRowCommit,
                openLineDetails: setActiveDetailsRowIndex,
              },
              state: {
                rowErrors,
                isRowEmpty: (row: any) => row.original.name.trim() === "",
              },
              phantomRowConfig: {
                isPhantom: (row: any) => row.original.isPhantom,
                actionText: "Add New Entry",
              },
            },
          }}
        >
          {/* Table Header */}
          <Table.Header className="bg-surface-variant sticky top-0 z-10 border-b border-border h-8">
            {({ table }) => (
              <>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.HeaderRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Table.Head
                        key={header.id}
                        style={getColumnStyles(header.column.columnDef, header.getSize())}
                        className={`px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis h-8 border-r border-border last:border-r-0 ${(header.column.columnDef.meta as any)?.layout?.headerClassName || ""}`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </Table.Head>
                    ))}
                  </Table.HeaderRow>
                ))}
              </>
            )}
          </Table.Header>

          {/* Table Body */}
          <Table.Body className="bg-background">
            {(row, isFocused) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                data-focused={isFocused}
                className={rowVariants({ 
                  isPhantom: !!row.original.isPhantom, 
                  isFocused 
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    style={getColumnStyles(cell.column.columnDef, cell.column.getSize())}
                    className={`py-0 border-r border-border last:border-r-0 ${
                      (cell.column.columnDef.meta as any)?.layout?.cellClassName || ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>

      {activeDetailsRowIndex !== null && (
        <LineDetailsSheet
          open={activeDetailsRowIndex !== null}
          onOpenChange={(open) => {
            if (!open) setActiveDetailsRowIndex(null);
          }}
          rowIndex={activeDetailsRowIndex}
          row={data[activeDetailsRowIndex]}
          updateData={updateData}
        />
      )}

      {activeCostCenterRow && (
        <CostCenterAllocationSheet
          open={activeCostCenterRowIndex !== null}
          onOpenChange={(open) => {
            if (!open) setActiveCostCenterRowIndex(null);
          }}
          targetAmount={activeCostCenterTargetAmount}
          ledgerName={activeCostCenterRow.name || 'Unknown Ledger'}
          initialAllocations={activeCostCenterRow.costCenterAllocations}
          onSave={(allocations) => {
            if (activeCostCenterRowIndex !== null) {
              updateData(activeCostCenterRowIndex, 'costCenterAllocations', allocations);
            }
          }}
        />
      )}
    </div>
  );
}
