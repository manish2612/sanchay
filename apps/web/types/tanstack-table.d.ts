import '@tanstack/react-table';
import { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    actions?: {
      updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
      onRowCommit?: (
        rowIndex: number,
        columnId?: string,
        cellValue?: string,
      ) => 'STAY' | 'ADVANCE' | 'EXIT';
    };
    state?: {
      rowErrors?: Record<number, boolean>;
      isRowEmpty?: (row: any) => boolean;
      successRowIndex?: number | null;
    };
    features?: {
      phantomRowConfig?: {
        isPhantom: (row: any) => boolean;
        actionText: string;
      };
    };
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    layout?: {
      cellClassName?: string;
      headerClassName?: string;
    };
    inputConfig?: {
      allowNegative?: boolean;
      placeholder?: string;
    };
  }
}
