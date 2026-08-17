'use client';

import * as React from 'react';
import { Table as TanStackTable } from '@tanstack/react-table';
import { cn } from '../../../utils';
import { tableStyles } from '../styles';
import { useTableContext } from './Context';
import { FilterRow } from './FilterRow';

export const TableHeader = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: React.ReactNode | ((props: { table: TanStackTable<any> }) => React.ReactNode);
  }
>(({ className, children, ...props }, ref) => {
  const { table } = useTableContext();

  return (
    <div
      ref={ref}
      className={cn(tableStyles.header(), 'shrink-0', className)}
      role="rowgroup"
      {...props}
    >
      {typeof children === 'function' ? children({ table }) : children}
      <FilterRow />
    </div>
  );
});
TableHeader.displayName = 'Table.Header';
