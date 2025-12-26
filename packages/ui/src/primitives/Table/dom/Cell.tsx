"use client";

import * as React from "react";
import { cn } from "../../../utils";
import { tableStyles } from "../styles";

export const TableCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(tableStyles.cell(), className)}
    role="gridcell"
    {...props}
  >
    {children}
  </div>
));
TableCell.displayName = "Table.Cell";
