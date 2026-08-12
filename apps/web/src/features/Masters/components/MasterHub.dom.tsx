import React from 'react';
import { TextInput, Icon, SegmentedControl, Button } from '@prime/ui';
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle } from '@prime/ui';
import { MasterFolderCard } from './MasterFolderCard.dom';
import { useMasterHub } from './useMasterHub';
import { useGlobalMasterSheet } from './MasterFormSheet/MasterFormSheetContext';
import {
  pageHeaderWrapperClasses,
  pageBackgroundClasses,
  controlPanelWrapperClasses,
} from '../styles.dom';

export function MasterHub() {
  const {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredMasters,
  } = useMasterHub();

  const { openMasterSheet } = useGlobalMasterSheet();

  const hasResults = filteredMasters.length > 0;

  return (
    <div className={`${pageBackgroundClasses}`}>
      <div className={pageHeaderWrapperClasses}>
        <div className={controlPanelWrapperClasses}>
          <SegmentedControl.Root
            className="sm:max-w-[350px]"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <SegmentedControl.Item value="all" label="All" />
            <SegmentedControl.Item value="accounting" label="Accounting" />
            <SegmentedControl.Item value="inventory" label="Inventory" />
          </SegmentedControl.Root>

          <div className="w-full sm:w-80" role="search">
            <TextInput
              id="master-search"
              placeholder="Search masters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full bg-surface/50 border-border/50 hover:bg-surface focus-within:bg-surface focus-within:border-primary/30 transition-colors duration-200 h-11"
              leftSlot={<Icon name="Search" size={16} className="opacity-50" />}
              rightSlot={
                <div className="hidden sm:flex items-center justify-center w-5 h-5 rounded border border-border bg-surface-variant text-[10px] font-medium text-muted-foreground">
                  /
                </div>
              }
              aria-label="Search masters"
            />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pt-6">
        {hasResults ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
            {filteredMasters.map((master) => (
              <MasterFolderCard
                key={master.id}
                config={master}
                onOpenSheet={(config) => openMasterSheet(config.id as any)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Icon name="SearchX" size={48} className="text-muted-foreground opacity-50 mb-4" />
            <p className="text-lg font-medium text-foreground">No masters found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
