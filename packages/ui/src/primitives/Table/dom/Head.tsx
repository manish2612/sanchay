'use client';

import * as React from 'react';
import { cn } from '../../../utils';
import { tableStyles } from '../styles';

import { Header } from '@tanstack/react-table';
import { ColumnResizer } from './ColumnResizer';

export interface TableHeadProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: Header<any, any>;
}

export const TableHead = React.forwardRef<HTMLDivElement, TableHeadProps>(
  ({ className, children, header, ...props }, ref) => {
    const isFiltered = header?.column.getIsFiltered() ?? false;
    
    return (
      <div
        ref={ref}
        className={cn(tableStyles.headerCell({ isFiltered }), className)}
        role="columnheader"
        {...props}
      >
        {children}
        {header && <ColumnResizer header={header} />}
      </div>
    );
  },
);
TableHead.displayName = 'Table.Head';
