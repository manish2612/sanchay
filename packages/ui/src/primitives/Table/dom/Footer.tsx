'use client';

import * as React from 'react';
import { cn } from '../../../utils';
import { tableStyles } from '../styles';

export const TableFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(tableStyles.footer(), 'shrink-0', className)} {...props}>
        {children}
      </div>
    );
  },
);
TableFooter.displayName = 'Table.Footer';
