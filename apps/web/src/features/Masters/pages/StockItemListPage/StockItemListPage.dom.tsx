import React from 'react';
import { flexRender } from '@tanstack/react-table';
import {
  Icon,
  Button,
  Table,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from '@prime/ui';
import { useStockItemList } from './useStockItemList';
import { stockItemColumns } from './columns';
import {
  MasterListHeader,
  MasterListToolbar,
  MasterSearchBar,
  DeleteConfirmModal,
  pageWrapperClasses,
  tableContainerClasses,
  tableCardClasses,
} from '@/features/Masters/components/common';

export function StockItemListPage() {
  const {
    filteredStockItems,
    totalCount,
    isLoading,
    isFetching,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    handleAddNew,
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
  } = useStockItemList();

  return (
    <div className={pageWrapperClasses}>
      {/* Top Header & Breadcrumb */}
      <MasterListHeader
        domain="Inventory"
        masterName="Stock Item"
        entityIcon="Package"
        totalCount={totalCount}
        itemLabel={{ singular: 'stock item', plural: 'stock items' }}
        subtitle="Manage your inventory items and stock catalog"
        isLoading={isLoading || isFetching}
        onRefresh={refetch}
        onAddNew={handleAddNew}
        addNewLabel="Add Stock Item"
      />

      {/* Control Toolbar: Search */}
      <MasterListToolbar
        searchBar={
          <MasterSearchBar
            id="stock-item-list-search"
            placeholder="Search by name, group, category, unit, code..."
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
                  <div className="h-4 bg-muted/50 rounded w-1/5" />
                  <div className="h-4 bg-muted/40 rounded w-1/6" />
                  <div className="h-4 bg-muted/40 rounded w-12 ml-auto" />
                </div>
              ))}
            </div>
          ) : filteredStockItems.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border/80 flex items-center justify-center text-muted-foreground mb-4">
                <Icon name={searchQuery ? 'SearchX' : 'Package'} size={28} className="opacity-60" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {searchQuery ? 'No matching stock items found' : 'No stock items available'}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 max-w-sm">
                {searchQuery
                  ? `No items matched your search term "${searchQuery}". Try searching for another name, group, or category.`
                  : 'Get started by creating your first stock item in the catalog.'}
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
                  Add Stock Item
                </Button>
              )}
            </div>
          ) : (
            /* High-Density Data Grid */
            <Table.Root
              data={filteredStockItems}
              columns={stockItemColumns}
              rowHeight={42}
              className="w-full flex-1 min-h-0 border-0 rounded-none"
              tableOptions={{
                meta: {
                  onDeleteClick: handleOpenDeleteDialog,
                } as any,
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
                {(row: any, isFocused: boolean) => (
                  <Table.Row
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    data-focused={isFocused}
                    className={`transition-colors border-b border-border border-l-3 group ${
                      isFocused
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
          {!isLoading && filteredStockItems.length > 0 && (
            <div className="px-4 py-2 bg-surface-variant/40 border-t border-border/60 text-[11px] text-muted-foreground flex items-center justify-between shrink-0">
              <span>
                Showing <strong className="text-foreground">{filteredStockItems.length}</strong> of{' '}
                <strong className="text-foreground">{totalCount}</strong> stock items
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
        title="Delete Stock Item"
        itemType="Stock Item"
        itemName={deleteDialogState.item?.name}
        description={
          deleteDialogState.item ? (
            <>
              Are you sure you want to delete the stock item{' '}
              <strong className="text-foreground font-semibold">
                &ldquo;{deleteDialogState.item.name}&rdquo;
              </strong>
              ? Any transaction entries or inventory records associated with this item may be affected.
              This action cannot be undone.
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
