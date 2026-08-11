import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Table, TABLE_ROW_COMMIT_ACTIONS } from '../../../index';
import { flexRender } from '@tanstack/react-table';
import { editableColumns } from './mockData';

const meta: Meta<any> = {
  title: 'Primitives/Table/Editable',
  component: Table.Root,
  tags: ['autodocs'],
  argTypes: {
    rowHeight: {
      control: 'number',
      description: 'The height of each row in pixels, used for virtualization.',
    },
  },
  args: {
    rowHeight: 44,
  },
};

export default meta;
type Story = StoryObj<any>;

export const Editable: Story = {
  args: { rowHeight: 44 },
  render: (args) => {
    const [data, setData] = useState(() => [
      {
        id: 'INV-1',
        date: '',
        status: 'Pending',
        method: 'Credit Card',
        amount: '',
        isPhantom: true,
      } as any,
    ]);
    const [rowErrors, setRowErrors] = useState<Record<number, boolean>>({});

    const updateData = (rowIndex: number, columnId: string, value: unknown) => {
      setData((old: any[]) =>
        old.map((row, index) =>
          index === rowIndex ? { ...old[rowIndex], [columnId]: value } : row,
        ),
      );
    };

    const onRowCommit = (rowIndex: number, columnId?: string, cellValue?: string) => {
      let row = data[rowIndex] as any;
      if (columnId && cellValue !== undefined) {
        row = { ...row, [columnId]: cellValue };
        updateData(rowIndex, columnId, cellValue);
      }
      const numeric = Number(row.amount.replace(/[^0-9.-]+/g, ''));
      if (isNaN(numeric) || row.amount.trim() === '') {
        setRowErrors((prev) => ({ ...prev, [rowIndex]: true }));
        setTimeout(() => {
          setRowErrors((prev) => ({ ...prev, [rowIndex]: false }));
        }, 500);
        return TABLE_ROW_COMMIT_ACTIONS.STAY;
      }
      if (row.isPhantom) {
        setData((old: any[]) => {
          const newData = [...old];
          const committedRow =
            columnId && cellValue !== undefined
              ? { ...newData[rowIndex], [columnId]: cellValue, isPhantom: false }
              : { ...newData[rowIndex], isPhantom: false };
          newData[rowIndex] = committedRow;
          newData.push({
            id: `INV-${newData.length + 1}`,
            date: '',
            status: 'Pending',
            method: 'Credit Card',
            amount: '',
            isPhantom: true,
          });
          return newData;
        });
        return TABLE_ROW_COMMIT_ACTIONS.ADVANCE;
      }
      return TABLE_ROW_COMMIT_ACTIONS.EXIT;
    };

    return (
      <div className="border border-[#222222] rounded-md h-[400px]">
        <Table.Root
          {...args}
          data={data}
          columns={editableColumns}
          className="h-full"
          tableOptions={{
            meta: {
              updateData,
              onRowCommit,
              rowErrors,
              phantomRowConfig: {
                isPhantom: (row: any) => row.original.isPhantom,
                actionText: 'Add New Invoice',
              },
            },
          }}
        >
          <Table.Header>
            {({ table }) => (
              <>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.HeaderRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Table.Head
                        key={header.id}
                        style={{ width: header.getSize(), flex: `${header.getSize()} 0 auto` }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Table.Head>
                    ))}
                  </Table.HeaderRow>
                ))}
              </>
            )}
          </Table.Header>
          <Table.Body>
            {(row, isFocused) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
                data-focused={isFocused}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      flex: `${cell.column.getSize()} 0 auto`,
                    }}
                    className="py-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    );
  },
};
