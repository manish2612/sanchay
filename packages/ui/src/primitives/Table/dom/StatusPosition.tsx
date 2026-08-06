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
  const { virtualizer, data, scrollRef } = useTableContext();
  const virtualRows = virtualizer.getVirtualItems();

  if (virtualRows.length === 0) return null;

  // Use scrollOffset (or fallback to ref) to detect actual visual position
  // ignoring overscanned items.
  const scrollOffset = virtualizer.scrollOffset ?? 0;
  const viewportHeight = scrollRef.current?.clientHeight ?? 0;
  const totalHeight = virtualizer.getTotalSize();

  // Hide status bar if there is no scrollable content (all rows fit in viewport)
  if (totalHeight <= viewportHeight && data.length > 0) return null;

  let count = 0;

  if (position === "top") {
    // First row whose TOP is visible (start >= scrollTop)
    // This counts partially hidden top rows as "above"
    const firstFullyVisible = virtualRows.find(
      (row) => row.start >= scrollOffset
    );
    if (firstFullyVisible) {
      count = firstFullyVisible.index;
    } else {
      // If no row is fully visible (e.g. all larger than viewport or just partials),
      // we essentially check the last virtual row.
      // If the last virtual row is partially above, then everything up to it is above.
      // This acts as a fallback.
      count =
        virtualRows.length > 0
          ? virtualRows[virtualRows.length - 1].index + 1
          : 0;
      // Optimization: usually finding the first IS sufficient.
      // If find() fails, it means ALL virtual rows are starting before the offset (cut off at top).
      // So effectively they are all "partially above".
      // But we only want to count rows *strictly* above or partial.
      // Actually if find() fails, it means NO row starts >= offset.
      // So all currently rendered rows start < offset.
      // So the "next" row (not rendered) is the first one that might be fully visible.
      // So count = (index of last rendered) + 1.
    }
  } else {
    const scrollBottom = scrollOffset + viewportHeight;
    // Last row whose BOTTOM is visible (end <= scrollBottom)
    // This counts partially hidden bottom rows as "below"
    // We search backwards from the end of the list
    const lastFullyVisible = [...virtualRows]
      .reverse()
      .find((row) => row.end <= scrollBottom);

    if (lastFullyVisible) {
      count = data.length - 1 - lastFullyVisible.index;
    } else {
      // If no row is fully visible (all cut off at bottom or top),
      // checking from the bottom: if find() fails, it means ALL virtual rows end > scrollBottom.
      // So they are all partially below?
      // Wait, virtualRows are ordered.
      // If row 0 ends > scrollBottom, then row 0 is partially below.
      // Then visible count should be 0? And "Rows Below" = Total - 0 = Total?
      // Wait, if lastFullyVisible is undefined, it means NO row is fully satisfying "end <= scrollBottom".
      // It means all rows end AFTER the viewport bottom.
      // So effectively 0 rows are fully visible.
      // But we are looking for "Rows Below".
      // If 0 rows are fully visible, then the "current" row is partially visible.
      // Does user want partially visible counted as "Below"? Yes.
      // So if Row 0 is partially visible, it acts as +1 to Below count?
      // Yes.
      // So if find() fails, we fall back to:
      // Everything starting from the TOPmost rendered row (since it's not fully visible either, presumably?)
      // Actually, if find() fails, it implies even the first row ends > scrollBottom (is cut off).
      // So first row is also partially below.
      // So count = data.length - virtualRows[0].index;
      // Wait, if virtualRows[0].index is 0. Count = Total.
      // Correct.
      count =
        virtualRows.length > 0
          ? data.length - virtualRows[0].index
          : data.length;
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        tableStyles.statusBar(),
        "shrink-0 bg-primary/8 flex-row-reverse",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1">
        <span>{position === "top" ? "Rows Above" : "Rows Below"}</span>
        <span className="font-mono">{count}</span>
        <Icon
          name={
            position === "top" ? "ChevronUp" : "ChevronDown"
          }
          size={16}
          className="text-muted-foreground"
        />
      </div>
    </div>
  );
});
TableStatusPosition.displayName = "Table.StatusPosition";
