'use client';

import * as React from 'react';
import { Header } from '@tanstack/react-table';
import { cn } from '../../../utils';
import { tableStyles } from '../styles';

import { Icon } from '../../Icon/Icon.dom';

export function ColumnResizer({ header }: { header: Header<any, unknown> }) {
  if (!header.column.getCanResize()) {
    return null;
  }

  const { isResizingColumn, deltaOffset } = header.getContext().table.getState().columnSizingInfo;
  const isResizing = isResizingColumn === header.column.id;

  return (
    <div
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className={cn(tableStyles.resizer({ isResizing }))}
      style={{
        transform: isResizing ? `translateX(${deltaOffset}px)` : undefined,
      }}
    >
      <Icon name="GripVertical" size={14} className="opacity-50 hover:opacity-100" />
    </div>
  );
}
