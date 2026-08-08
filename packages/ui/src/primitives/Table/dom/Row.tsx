'use client';

import * as React from 'react';
import { cn } from '../../../utils';
import { tableStyles } from '../styles';

export const TableRow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(tableStyles.row(), className)} role="row" {...props}>
      {children}
    </div>
  ),
);
TableRow.displayName = 'Table.Row';
