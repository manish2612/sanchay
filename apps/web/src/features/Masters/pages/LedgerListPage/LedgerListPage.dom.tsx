import React from 'react';
import { flexRender, Row, Cell } from '@tanstack/react-table';
import {
  Icon,
  Button,
  Table,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from '@prime/ui';
import { useLedgerList } from './useLedgerList';
import { ledgerColumns, LedgerTableMeta } from './columns';
import type { LedgerDecoratedItem } from '@/features/Accounts/Ledger/types';
import {
  MasterListHeader,
  MasterListToolbar,
  MasterSearchBar,
  DeleteConfirmModal,
  pageWrapperClasses,
  tableContainerClasses,
  tableCardClasses,
} from '@/features/Masters/components/common';

export function LedgerListPage() {
  const {
    filteredLedgers,
    totalCount,
    isLoading,
    isFetching,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    handleAddNew,
    handleEdit,
    refetch,
    // Deletion
    deleteDialogState,
    isDeleting,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    // Feedback Toast
    toastMessage,
    setToastMessage,
  } = useLedgerList();

  return (
    <div className={pageWrapperClasses}>
      {/* Top Header & Breadcrumb */}
      <MasterListHeader
        domain="Accounting"
        masterName="Ledger"
        entityIcon="BookOpen"
        totalCount={totalCount}
        itemLabel={{ singular: 'ledger', plural: 'ledgers' }}
        subtitle="Manage customer, supplier & bank accounts"
        isLoading={isLoading || isFetching}
        onRefresh={refetch}
        onAddNew={handleAddNew}
        addNewLabel="Add Ledger"
      />

      {/* Control Toolbar: Search */}
      <MasterListToolbar
        searchBar={
          <MasterSearchBar
            id="ledger-list-search"
            placeholder="Search by name, code, parent..."
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClear={handleClearSearch}
          />
        }
      />

      {/* Main Table Area */}
      <div className={tableContainerClasses}>
        <div className={tableCardClasses}>
          {isLoading ? (
            /* Skeleton Loading State */
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-start">
              <div className="h-9 bg-muted/60 rounded-md w-full animate-pulse" />
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-muted/30 rounded-md w-full animate-pulse flex items-center px-4 gap-4"
                >
                  <div className="h-4 bg-muted/70 rounded w-1/4" />
                  <div className="h-4 bg-muted/50 rounded w-1/5" />
                  <div className="h-4 bg-muted/50 rounded w-1/6" />
                  <div className="h-4 bg-muted/40 rounded w-1/8 ml-auto" />
                </div>
              ))}
            </div>
          ) : filteredLedgers.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border/80 flex items-center justify-center text-muted-foreground mb-4">
                <Icon
                  name={searchQuery ? 'SearchX' : 'BookOpen'}
                  size={28}
                  className="opacity-60"
                />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {searchQuery ? 'No matching ledgers found' : 'No ledgers available'}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 max-w-sm">
                {searchQuery
                  ? `No ledgers matched your search term "${searchQuery}". Try searching for another name, code, or parent group.`
                  : 'Start by creating your first ledger account to record financial transactions.'}
              </p>
              {searchQuery ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 text-xs h-8"
                  onClick={handleClearSearch}
                >
                  Clear Search
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-4 text-xs h-8 gap-1.5"
                  onClick={handleAddNew}
                >
                  <Icon name="Plus" size={14} />
                  Add New Ledger
                </Button>
              )}
            </div>
          ) : (
            /* High-Density Data Grid */
            <Table.Root
              data={filteredLedgers}
              columns={ledgerColumns}
              rowHeight={42}
              className="w-full flex-1 min-h-0 border-0 rounded-none"
              tableOptions={{
                meta: {
                  onEditClick: handleEdit,
                  onDeleteClick: handleOpenDeleteDialog,
                } satisfies LedgerTableMeta,
              }}
            >
              <Table.Header className="bg-surface-variant sticky top-0 z-10 border-b border-border h-9 shrink-0">
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
                            className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground h-9 border-r border-border/60 last:border-r-0 select-none"
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

              <Table.Body className="bg-surface [&_[data-radix-scroll-area-viewport]]:!overflow-x-hidden">
                {(row: Row<LedgerDecoratedItem>, isFocused: boolean) => (
                  <Table.Row
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    data-focused={isFocused}
                    className={`transition-colors border-b border-border/80 hover:bg-surface-variant/40 border-l-3 group ${
                      isFocused
                        ? 'bg-primary/[0.06] border-l-primary'
                        : 'border-l-transparent'
                    }`}
                  >
                    {row.getVisibleCells().map((cell: Cell<LedgerDecoratedItem, unknown>) => (
                      <Table.Cell
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          flex: `${cell.column.getSize()} 0 auto`,
                        }}
                        className="px-3 py-1.5 border-r border-border/60 last:border-r-0 overflow-hidden flex items-center"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          )}

          {/* Footer Bar: Item Counter */}
          {!isLoading && filteredLedgers.length > 0 && (
            <div className="px-4 py-2 bg-surface-variant/40 border-t border-border/60 text-[11px] text-muted-foreground flex items-center justify-between shrink-0">
              <span>
                Showing <strong className="text-foreground">{filteredLedgers.length}</strong> of{' '}
                <strong className="text-foreground">{totalCount}</strong> ledgers
              </span>
              <span className="hidden sm:inline-block">
                Press <kbd className="px-1 py-0.5 rounded bg-muted font-mono text-[10px]">Tab</kbd>{' '}
                and arrow keys to navigate rows
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteDialogState.isOpen}
        title="Delete Ledger"
        itemType="Ledger"
        itemName={deleteDialogState.ledger?.name}
        description={
          deleteDialogState.ledger ? (
            <>
              Are you sure you want to delete the ledger{' '}
              <strong className="text-foreground font-semibold">
                &ldquo;{deleteDialogState.ledger.name}&rdquo;
              </strong>
              ? Any linked vouchers or transactions will be permanently affected. This action cannot
              be undone.
            </>
          ) : null
        }
        isDeleting={isDeleting}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />

      {/* Global Feedback Toast */}
      <ToastRoot
        open={!!toastMessage}
        onOpenChange={(open) => !open && setToastMessage(null)}
        variant={toastMessage?.variant || 'default'}
      >
        <ToastTitle>{toastMessage?.title}</ToastTitle>
        <ToastDescription>{toastMessage?.desc}</ToastDescription>
        <ToastClose />
      </ToastRoot>
    </div>
  );
}
