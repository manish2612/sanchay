import React from 'react';
import { Link } from '@tanstack/react-router';
import { flexRender } from '@tanstack/react-table';
import {
  Icon,
  Button,
  TextInput,
  Table,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from '@prime/ui';
import { useGroupList, GroupFilterType } from './useGroupList';
import { groupColumns } from './columns';
import { DeleteGroupModal } from './DeleteGroupModal.dom';
import {
  pageWrapperClasses,
  pageHeaderWrapperClasses,
  breadcrumbClasses,
  breadcrumbLinkClasses,
  headerTitleWrapperClasses,
  titleSectionClasses,
  entityIconWrapperClasses,
  titleClasses,
  subtitleClasses,
  countBadgeClasses,
  toolbarWrapperClasses,
  searchInputClasses,
  tableContainerClasses,
  tableCardClasses,
} from './styles.dom';

export function GroupListPage() {
  const {
    filteredGroups,
    isLoading,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    activeFilter,
    setActiveFilter,
    counts,
    handleAddNew,
    handleEditGroup,
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
  } = useGroupList();

  const filterTabs: Array<{ id: GroupFilterType; label: string; count: number }> = [
    { id: 'all', label: 'All', count: counts.total },
    { id: 'predefined', label: 'Predefined', count: counts.predefined },
    { id: 'custom', label: 'Custom', count: counts.custom },
  ];

  return (
    <div className={pageWrapperClasses}>
      {/* Top Header & Breadcrumb */}
      <div className={pageHeaderWrapperClasses}>
        <div className={breadcrumbClasses}>
          <Link to="/masters" className={breadcrumbLinkClasses}>
            <Icon name="ArrowLeft" size={13} className="opacity-70" />
            <span>Masters Hub</span>
          </Link>
          <span className="text-muted-foreground/40 font-mono">/</span>
          <span>Accounting</span>
          <span className="text-muted-foreground/40 font-mono">/</span>
          <span className="text-foreground font-semibold">Group Master</span>
        </div>

        <div className={headerTitleWrapperClasses}>
          <div className={titleSectionClasses}>
            <div className={entityIconWrapperClasses}>
              <Icon name="Layers" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={titleClasses}>Group Master</h1>
                <span className={countBadgeClasses}>
                  {counts.total} {counts.total === 1 ? 'group' : 'groups'}
                </span>
              </div>
              <p className={subtitleClasses}>
                Organize and manage your Chart of Accounts ledger hierarchy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 text-muted-foreground hover:text-foreground"
              onClick={() => refetch()}
              title="Refresh group list"
              aria-label="Refresh group list"
            >
              <Icon name="RefreshCw" size={14} className={isLoading ? 'animate-spin' : ''} />
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="h-9 px-4 gap-1.5 shadow-sm font-medium"
              onClick={handleAddNew}
              aria-label="Add new group"
            >
              <Icon name="Plus" size={15} />
              <span>Add Group</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Search & Filter Tabs */}
      <div className={toolbarWrapperClasses}>
        <div className="w-full sm:w-auto">
          <TextInput
            id="group-list-search"
            placeholder="Search by name, alias, parent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={searchInputClasses}
            leftSlot={<Icon name="Search" size={14} className="opacity-50" />}
            rightSlot={
              searchQuery ? (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                  aria-label="Clear search"
                >
                  <Icon name="X" size={13} />
                </button>
              ) : (
                <div className="hidden sm:flex items-center justify-center w-4 h-4 rounded border border-border bg-muted/60 text-[10px] font-mono text-muted-foreground">
                  /
                </div>
              )
            }
            aria-label="Search groups"
          />
        </div>

        {/* Filter Pills */}
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
      </div>

      {/* Main Table Area */}
      <div className={tableContainerClasses}>
        <div className={tableCardClasses}>
          {isLoading ? (
            /* Skeleton Loading State */
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-start">
              <div className="h-9 bg-muted/60 rounded-md w-full animate-pulse" />
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-muted/30 rounded-md w-full animate-pulse flex items-center px-4 gap-4"
                >
                  <div className="h-4 bg-muted/70 rounded w-1/4" />
                  <div className="h-4 bg-muted/50 rounded w-1/6" />
                  <div className="h-4 bg-muted/50 rounded w-1/5" />
                  <div className="h-4 bg-muted/40 rounded w-1/6 ml-auto" />
                </div>
              ))}
            </div>
          ) : filteredGroups.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border/80 flex items-center justify-center text-muted-foreground mb-4">
                <Icon name={searchQuery ? 'SearchX' : 'Layers'} size={28} className="opacity-60" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {searchQuery ? 'No matching groups found' : 'No groups available'}
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 max-w-sm">
                {searchQuery
                  ? `No groups matched your search term "${searchQuery}". Try searching for another name, alias, or parent group.`
                  : 'Start by creating your first group to organize your Chart of Accounts.'}
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
                  Add New Group
                </Button>
              )}
            </div>
          ) : (
            /* High-Density Data Grid */
            <Table.Root
              data={filteredGroups}
              columns={groupColumns}
              rowHeight={42}
              className="w-full flex-1 min-h-0 border-0 rounded-none"
              tableOptions={{
                meta: {
                  onEditClick: handleEditGroup,
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
                    className={`transition-colors border-b border-border/60 last:border-b-0 border-l-3 group ${
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
          {!isLoading && filteredGroups.length > 0 && (
            <div className="px-4 py-2 bg-surface-variant/40 border-t border-border/60 text-[11px] text-muted-foreground flex items-center justify-between shrink-0">
              <span>
                Showing <strong className="text-foreground">{filteredGroups.length}</strong> of{' '}
                <strong className="text-foreground">{counts.total}</strong> groups
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
      <DeleteGroupModal
        isOpen={deleteDialogState.isOpen}
        group={deleteDialogState.group}
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
