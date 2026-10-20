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
import { useTaxGroupList, TaxGroupFilterType } from './useTaxGroupList';
import { taxGroupColumns } from './columns';
import {
  MasterListHeader,
  MasterListToolbar,
  MasterSearchBar,
  DeleteConfirmModal,
  pageWrapperClasses,
  tableContainerClasses,
  tableCardClasses,
} from '@/features/Masters/components/common';

export function TaxGroupListPage() {
  const {
    filteredTaxGroups,
    isLoading,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    activeFilter,
    setActiveFilter,
    counts,
    handleAddNew,
    handleEditTaxGroup,
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
  } = useTaxGroupList();

  const filterTabs: Array<{ id: TaxGroupFilterType; label: string; count: number }> = [
    { id: 'all', label: 'All', count: counts.total },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'inactive', label: 'Inactive', count: counts.inactive },
  ];

  return (
    <div className={pageWrapperClasses}>
      {/* Top Header & Breadcrumb */}
      <MasterListHeader
        domain="Accounting"
        masterName="Tax Group"
        entityIcon="Percent"
        totalCount={counts.total}
        itemLabel={{ singular: 'tax group', plural: 'tax groups' }}
        subtitle="Manage tax rate configurations and multi-component tax structures"
        isLoading={isLoading}
        onRefresh={refetch}
        onAddNew={handleAddNew}
        addNewLabel="Add Tax Group"
      />

      {/* Control Toolbar: Search & Filter Tabs */}
      <MasterListToolbar
        searchBar={
          <MasterSearchBar
            id="tax-group-list-search"
            placeholder="Search by name, code, tax type, or component..."
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClear={handleClearSearch}
          />
        }
        filterTabs={
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {filterTabs.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-surface hover:bg-surface-variant text-muted-foreground hover:text-foreground border border-border/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isSelected
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        }
      />

      {/* Main Table Card */}
      <div className={tableContainerClasses}>
        <div className={tableCardClasses}>
          {isLoading && filteredTaxGroups.length === 0 ? (
            /* Loading Skeleton */
            <div className="p-4 space-y-3 flex-1">
              <div className="h-14 bg-muted/60 rounded-md w-full animate-pulse" />
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-muted/30 rounded-md w-full animate-pulse flex items-center px-4 gap-4"
                >
                  <div className="h-4 bg-muted/70 rounded w-1/4" />
                  <div className="h-4 bg-muted/50 rounded w-1/6" />
                  <div className="h-4 bg-muted/50 rounded w-1/5" />
                  <div className="h-4 bg-muted/40 rounded w-1/6 ml-auto" />
                </div>
              ))}
            </div>
          ) : filteredTaxGroups.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border/80 flex items-center justify-center text-muted-foreground mb-4">
                <Icon name={searchQuery ? 'SearchX' : 'Percent'} size={28} className="opacity-60" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {searchQuery ? 'No matching tax groups found' : 'No tax groups available'}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 max-w-sm">
                {searchQuery
                  ? `No tax groups matched your search term "${searchQuery}". Try searching for another name, code, or component.`
                  : 'Start by creating your first tax group to configure tax rates and components.'}
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
                  Add New Tax Group
                </Button>
              )}
            </div>
          ) : (
            /* Multi-Tier Grouped Data Grid */
            <Table.Root
              data={filteredTaxGroups}
              columns={taxGroupColumns}
              rowHeight={(index) => {
                const item = filteredTaxGroups[index];
                const count = item?.components?.length || 1;
                return Math.max(52, count * 38);
              }}
              className="w-full flex-1 min-h-0 border-0 rounded-none"
              tableOptions={{
                meta: {
                  onEditClick: handleEditTaxGroup,
                  onDeleteClick: handleOpenDeleteDialog,
                } as any,
              }}
            >
              <Table.Header className="bg-surface-variant sticky top-0 z-10 border-b border-border h-14 shrink-0 overflow-visible">
                {({ table }) => {
                  const headerGroups = table.getHeaderGroups();
                  if (headerGroups.length === 0) return null;
                  const topHeaders = headerGroups[0].headers;

                  return (
                    <div className="flex w-full h-14 items-stretch border-b border-border p-0 bg-surface-variant">
                      {topHeaders.map((header) => {
                        // Only columns with multiple subheaders (e.g. Component) are split
                        const isSplitColumn = Boolean(
                          header.subHeaders && header.subHeaders.length > 1
                        );
                        const headerSize = header.getSize();

                        if (isSplitColumn) {
                          return (
                            <div
                              key={header.id}
                              style={{
                                width: headerSize,
                                flex: `${headerSize} 0 auto`,
                              }}
                              className="flex flex-col border-r border-border/60 last:border-r-0 select-none overflow-hidden bg-surface-variant"
                            >
                              {/* Parent Group Header (e.g., "Component") */}
                              <div className="h-6 px-3 flex items-center justify-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-surface-variant border-b border-border/60">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </div>
                              {/* Subcolumns Header Row */}
                              <div className="h-8 flex items-stretch bg-surface-variant">
                                {header.subHeaders.map((subHeader) => {
                                  const subSize = subHeader.getSize();
                                  return (
                                    <div
                                      key={subHeader.id}
                                      style={{
                                        width: subSize,
                                        flex: `${subSize} 0 auto`,
                                      }}
                                      className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-r border-border/60 last:border-r-0 flex items-center overflow-hidden bg-surface-variant"
                                    >
                                      {subHeader.isPlaceholder
                                        ? null
                                        : flexRender(
                                            subHeader.column.columnDef.header,
                                            subHeader.getContext()
                                          )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        // Standalone (Not Split) Column: Takes the full height of the header (56px) and vertically centers its name
                        return (
                          <div
                            key={header.id}
                            style={{
                              width: headerSize,
                              flex: `${headerSize} 0 auto`,
                            }}
                            className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-r border-border/60 last:border-r-0 select-none flex items-center bg-surface-variant h-full ${
                              header.id.includes('actions') ? 'justify-end pr-2' : ''
                            }`}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </Table.Header>

              <Table.Body className="bg-surface">
                {(row: any, isFocused: boolean) => (
                  <Table.Row
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    data-focused={isFocused}
                    className={`transition-colors border-b border-border relative group ${
                      isFocused
                        ? 'bg-primary/[0.06] shadow-[inset_3px_0_0_0_var(--colors-primary,#3b82f6)]'
                        : 'hover:bg-surface-variant/40'
                    }`}
                  >
                    {row.getVisibleCells().map((cell: any) => {
                      const isComponentSubcolumn = cell.column.id.startsWith('component_');
                      return (
                        <Table.Cell
                          key={cell.id}
                          style={{
                            width: cell.column.getSize(),
                            flex: `${cell.column.getSize()} 0 auto`,
                          }}
                          className={`border-r border-border/60 last:border-r-0 overflow-hidden flex h-full ${
                            isComponentSubcolumn ? 'p-0 items-stretch' : 'px-3 py-1 items-center'
                          }`}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          )}

          {/* Footer Bar: Item Counter */}
          {!isLoading && filteredTaxGroups.length > 0 && (
            <div className="px-4 py-2 bg-surface-variant/40 border-t border-border/60 text-[11px] text-muted-foreground flex items-center justify-between shrink-0">
              <span>
                Showing <strong className="text-foreground">{filteredTaxGroups.length}</strong> of{' '}
                <strong className="text-foreground">{counts.total}</strong> {counts.total === 1 ? 'item' : 'items'}
              </span>
              <span className="text-[10px] text-muted-foreground/60 hidden sm:inline">
                Use Tab and arrow keys to navigate table
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmModal
        isOpen={deleteDialogState.isOpen}
        itemName={deleteDialogState.taxGroup?.name}
        itemType="tax group"
        isDeleting={isDeleting}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast Notification */}
      <ToastRoot
        open={Boolean(toastMessage)}
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
