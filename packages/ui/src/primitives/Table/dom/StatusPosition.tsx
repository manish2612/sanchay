"use client";

import * as React from "react";
import { Icon } from "../../Icon/Icon.dom";
import { cn } from "../../../utils";
import { tableStyles } from "../styles";
import { useTableContext } from "./Context";

export const TableStatusPosition = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { position: "top" | "bottom" }
>(({ className, position, ...props }, ref) => {
  const { virtualizer, data } = useTableContext();
  const virtualRows = virtualizer.getVirtualItems();

  if (virtualRows.length === 0) return null;

  let count = 0;
  if (position === "top") {
    count = virtualRows[0].index;
  } else {
    count = data.length - virtualRows[virtualRows.length - 1].index - 1;
  }

  return (
    <div
      ref={ref}
      className={cn(tableStyles.statusBar(), "shrink-0", className)}
      {...props}
    >
      <span>{position === "top" ? "Rows Above" : "Rows Below"}</span>
      <div className="flex items-center gap-1">
        <span className="font-mono">{count}</span>
        <Icon
          name={
            position === "top" ? "keyboard_arrow_up" : "keyboard_arrow_down"
          } // Using Material Icons names
          size={16}
          className="text-muted-foreground"
        />
      </div>
    </div>
  );
});
TableStatusPosition.displayName = "Table.StatusPosition";
