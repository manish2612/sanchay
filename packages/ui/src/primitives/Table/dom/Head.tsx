'use client';

import * as React from 'react';
import { cn } from '../../../utils';
import { tableStyles } from '../styles';

export const TableHead = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(tableStyles.headerCell(), className)}
      role="columnheader"
      {...props}
    >
      {children}
    </div>
  ),
);
TableHead.displayName = 'Table.Head';
