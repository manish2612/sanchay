'use client';

import * as React from 'react';
import { cn } from '../../../utils';
import { tableStyles } from '../styles';

export const TableHeaderRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(tableStyles.headerRow(), className)} role="row" {...props}>
    {children}
  </div>
));
TableHeaderRow.displayName = 'Table.HeaderRow';
