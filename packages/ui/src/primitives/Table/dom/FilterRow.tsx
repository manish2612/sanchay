'use client';

import * as React from 'react';
import { Column } from '@tanstack/react-table';
import { cn } from '../../../utils';
import { tableStyles } from '../styles';
import { useTableContext } from './Context';
import { TextInput } from '../../TextInput';
import { DropdownMenu } from '../../../components/DropdownMenu';
import { DatePicker } from '../../DatePicker';
import { Icon } from '../../Icon/Icon.dom';

// Extend ColumnMeta to support filter configuration
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends import('@tanstack/react-table').RowData, TValue> {
    filter?: {
      type?: 'text' | 'numeric' | 'select' | 'date';
      options?: { id: string; label: string }[];
      component?: (props: { column: Column<TData, TValue> }) => React.ReactNode;
      placeholder?: string;
    };
  }
}

export function FilterRow() {
  const { table } = useTableContext();

  if (!table.options.meta?.enableColumnFilter) {
    return null;
  }

  return (
    <div className={cn(tableStyles.filterRow())} role="row">
      {table.getVisibleLeafColumns().map((column) => (
        <div
          key={column.id}
          className={cn(tableStyles.filterCell())}
          style={{ width: column.getSize(), flex: `${column.getSize()} 0 auto` }}
        >
          {column.getCanFilter() ? <FilterCell column={column} /> : null}
        </div>
      ))}
    </div>
  );
}

function FilterCell({ column }: { column: Column<any, any> }) {
  const filterMeta = column.columnDef.meta?.filter;
  const filterValue = column.getFilterValue() as string | number;

  if (filterMeta?.component) {
    return (
      <React.Fragment>
        {filterMeta.component({ column })}
      </React.Fragment>
    );
  }

  const isActive = filterValue !== undefined && filterValue !== '';

  const inputContainerClass = cn(
    "h-8 w-full my-auto bg-transparent border focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-0 transition-all",
    isActive ? "border-primary ring-1 ring-primary" : "border-border"
  );

  switch (filterMeta?.type) {
    case 'select': {
      const options = filterMeta.options || [];
      const selectedOption = options.find((opt) => opt.id === filterValue);
      const mappedItems: any[] = options.map((opt) => ({
        ...opt,
        onSelect: () => column.setFilterValue(opt.id),
      }));

      // Add a clear option
      if (isActive) {
        mappedItems.unshift({ 
          id: '', 
          label: 'Clear Filter', 
          onSelect: () => column.setFilterValue(undefined),
          className: 'text-destructive focus:text-destructive',
          icon: 'X'
        });
      }

      return (
        <DropdownMenu items={mappedItems} triggerLabel={filterMeta?.placeholder ?? 'Select...'}>
          <button className={cn(inputContainerClass, "px-2 rounded-md flex items-center justify-between text-sm")}>
            <span className={!selectedOption ? 'text-muted-foreground' : ''}>
              {selectedOption ? selectedOption.label : (filterMeta?.placeholder ?? 'Select...')}
            </span>
            <Icon name="ChevronDown" size={16} />
          </button>
        </DropdownMenu>
      );
    }
    case 'date': {
      let parsedDate: Date | undefined = undefined;
      if (filterValue) {
        const isoParsed = new Date(`${filterValue}T00:00:00`);
        parsedDate = !isNaN(isoParsed.getTime()) ? isoParsed : (isNaN(new Date(filterValue as string).getTime()) ? undefined : new Date(filterValue as string));
      }

      return (
        <div className="relative w-full h-full flex items-center">
          <DatePicker
            date={parsedDate}
            onDateChange={(d) => {
              if (d) {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                column.setFilterValue(`${year}-${month}-${day}`);
              } else {
                column.setFilterValue(undefined);
              }
            }}
            className={cn(inputContainerClass, "px-2 py-0 text-sm rounded-md shadow-none w-full")}
          />
          {isActive && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                column.setFilterValue(undefined);
              }} 
              className="absolute right-8 opacity-50 hover:opacity-100 flex items-center justify-center p-1"
            >
              <Icon name="X" size={14} className="text-destructive" />
            </button>
          )}
        </div>
      );
    }
    case 'numeric':
      return (
        <TextInput
          type="number"
          value={(filterValue ?? '') as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={filterMeta?.placeholder ?? `Filter...`}
          className={cn(inputContainerClass, "px-2")}
          inputClassName="text-sm px-0 h-full text-right"
          rightSlot={
            isActive ? (
              <button onClick={() => column.setFilterValue(undefined)} className="opacity-50 hover:opacity-100 flex items-center justify-center pl-1 h-full">
                <Icon name="X" size={14} className="text-destructive" />
              </button>
            ) : undefined
          }
        />
      );
    case 'text':
    default:
      return (
        <TextInput
          value={(filterValue ?? '') as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={filterMeta?.placeholder ?? `Filter...`}
          className={cn(inputContainerClass, "px-2")}
          inputClassName="text-sm px-0 h-full"
          rightSlot={
            isActive ? (
              <button onClick={() => column.setFilterValue(undefined)} className="opacity-50 hover:opacity-100 flex items-center justify-center pl-1 h-full">
                <Icon name="X" size={14} className="text-destructive" />
              </button>
            ) : undefined
          }
        />
      );
  }
}
