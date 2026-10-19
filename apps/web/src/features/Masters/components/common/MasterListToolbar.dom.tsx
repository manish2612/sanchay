import React from 'react';
import { toolbarWrapperClasses } from './styles.dom';

export interface MasterListToolbarProps {
  searchBar?: React.ReactNode;
  filterTabs?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function MasterListToolbar({
  searchBar,
  filterTabs,
  children,
  className = toolbarWrapperClasses,
}: MasterListToolbarProps) {
  return (
    <div className={className}>
      {searchBar}
      {filterTabs}
      {children}
    </div>
  );
}
