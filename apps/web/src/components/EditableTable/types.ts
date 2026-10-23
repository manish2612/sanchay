export interface RowErrorInfo {
  rowIndex: number;
  rowNumber: number;
  isPhantom: boolean;
  fieldErrors: Record<string, string>;
  messages: string[];
}

export interface UseTableRowErrorsOptions<T = Record<string, unknown>> {
  fields: T[];
  isRowEmpty?: (row: T) => boolean;
  isPhantom?: (row: T) => boolean;
  columnLabels?: Record<string, string>;
}

export interface UseTableRowErrorsReturn {
  rowErrors: Record<number, Record<string, string>>;
  errorsList: RowErrorInfo[];
  hasErrors: boolean;
  totalErrorCount: number;
  tableRootError?: string;
  clearRowErrors: (rowIndex: number, columnId?: string) => void;
}

export interface TableErrorSummaryProps {
  errorsList: RowErrorInfo[];
  tableRootError?: string;
  columnLabels?: Record<string, string>;
  onResetRow?: (rowIndex: number) => void;
  className?: string;
}
