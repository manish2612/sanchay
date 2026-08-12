import React, { useState, useMemo } from 'react';
import { TextInput, Icon } from '@prime/ui';
import { MASTERS_CONFIG, MASTER_GROUPS } from '../data/mastersConfig';
import { MasterCategorySection } from './MasterCategorySection.dom';
import { pageHeaderWrapperClasses, pageBackgroundClasses } from '../styles.dom';

export function MasterHub() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMasters = useMemo(() => {
    if (!searchQuery.trim()) return MASTERS_CONFIG;
    const lowerQuery = searchQuery.toLowerCase();
    return MASTERS_CONFIG.filter((m) => m.label.toLowerCase().includes(lowerQuery));
  }, [searchQuery]);

  const hasResults = filteredMasters.length > 0;

  return (
    <div className={`${pageBackgroundClasses}`}>
      <div className={pageHeaderWrapperClasses}>
        <div className="flex flex-row">
          <h1 className="text-xl font-bold text-foreground font-heading mr-2">Master Data</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure your foundational business records
          </p>
        </div>

        <div className="w-full sm:w-80" role="search">
          <TextInput
            id="master-search"
            placeholder="Search masters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full bg-surface/50 border-border/50 hover:bg-surface focus-within:bg-surface focus-within:border-primary/30 transition-colors duration-200"
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

      <div className="px-4 sm:px-6 pt-6">
        {hasResults ? (
          MASTER_GROUPS.map((group) => {
            const groupMasters = filteredMasters.filter((m) => m.group === group.id);
            return (
              <MasterCategorySection key={group.id} label={group.label} masters={groupMasters} />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Icon name="SearchX" size={48} className="text-muted-foreground opacity-50 mb-4" />
            <p className="text-lg font-medium text-foreground">
              No masters found for "{searchQuery}"
            </p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
