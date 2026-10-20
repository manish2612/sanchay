import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { AutoSuggestCell } from '@/components/TableCells/AutoSuggestCell';
import { TextCell } from '@/components/TableCells/TextCell';
import { DateCell } from '@/components/TableCells/DateCell';
import { NumericCell } from '@/components/TableCells/NumericCell';
import { ActionCell } from '@/components/TableCells/ActionCell';
import { AnimatedNumber } from '@prime/ui';

const columnHelper = createColumnHelper<any>();

export const getColumns = (
  maxQty: number,
  onCreateGodown?: () => void,
  hasMfgDate: boolean = false,
  hasExpiryDate: boolean = false,
  hasBatches: boolean = true
): ColumnDef<any, any>[] => {
  const cols: ColumnDef<any, any>[] = [
    columnHelper.accessor('godown', {
      header: 'Godown',
      cell: AutoSuggestCell,
      size: 200,
      meta: {
        inputConfig: {
          placeholder: 'Select Godown...',
          onCreate: onCreateGodown,
          optionsKey: 'godowns',
          idKey: 'godownId',
        },
      },
    }),
  ];

  if (hasBatches) {
    cols.push(
      columnHelper.accessor('batchNumber', {
        header: 'Batch Number',
        cell: TextCell,
        size: 130,
        meta: {
          inputConfig: {
            placeholder: 'Batch #',
          },
        },
      })
    );
  }

  if (hasMfgDate) {
    cols.push(
      columnHelper.accessor('mfgDate', {
        header: 'MFG Date',
        cell: DateCell,
        size: 130,
      })
    );
  }

  if (hasExpiryDate) {
    cols.push(
      columnHelper.accessor('expiryDate', {
        header: 'Expiry Date',
        cell: DateCell,
        size: 130,
      })
    );
  }

  cols.push(
    columnHelper.accessor('quantity', {
      header: 'Quantity',
      cell: NumericCell,
      size: 110,
      meta: {
        inputConfig: {
          type: 'number',
        },
      },
    }),
    columnHelper.accessor('rate', {
      header: 'Rate',
      cell: NumericCell,
      size: 110,
    }),
    columnHelper.display({
      id: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        // Calculate Amount = quantity * rate dynamically
        const qty = Number(row.original.quantity) || 0;
        const rate = Number(row.original.rate) || 0;
        const amount = qty * rate;

        return (
          <div className="flex h-full w-full items-center justify-end px-2 text-sm text-foreground my-auto tabular-nums">
            <AnimatedNumber
              value={amount}
              formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
            />
          </div>
        );
      },
      size: 110,
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: ActionCell,
      size: 50,
    })
  );

  return cols;
};
