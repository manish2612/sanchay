import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';
import { Table } from '../../../index';
import { flexRender } from '@tanstack/react-table';
import { generateData, columns } from './mockData';

const meta: Meta<any> = {
  title: 'Primitives/Table/Basic',
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

export const Full5Items: Story = {
  args: { rowHeight: 44 },
  render: (args) => {
    const data = useMemo(() => generateData(5), []);
    return (
      <div className="border rounded-md h-[500px]">
        <Table.Root {...args} data={data} columns={columns} className="h-full">
          <Table.Header>
            {({ table }) => (
              <>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.HeaderRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Table.Head key={header.id} style={{ width: header.getSize(), flex: `${header.getSize()} 0 auto` }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Table.Head>
                    ))}
                  </Table.HeaderRow>
                ))}
              </>
            )}
          </Table.Header>
          <Table.StatusPosition position="top" />
          <Table.Body>
            {(row, isFocused) => (
              <Table.Row key={row.id} data-state={row.getIsSelected() ? "selected" : undefined} data-focused={isFocused}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id} style={{ width: cell.column.getSize(), flex: `${cell.column.getSize()} 0 auto` }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
          <Table.StatusPosition position="bottom" />
          <Table.Footer>
            <div className="px-4 py-2">Footer Content (Total: {data.length} invoices)</div>
          </Table.Footer>
        </Table.Root>
      </div>
    );
  }
};

export const NoChrome6Items: Story = {
  args: { rowHeight: 44 },
  render: (args) => {
    const data = useMemo(() => generateData(6), []);
    return (
      <div className="border rounded-md h-[500px]">
        <Table.Root {...args} data={data} columns={columns} className="h-full">
          <Table.StatusPosition position="top" />
          <Table.Body>
            {(row, isFocused) => (
              <Table.Row key={row.id} data-state={row.getIsSelected() ? "selected" : undefined} data-focused={isFocused}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id} style={{ width: cell.column.getSize(), flex: `${cell.column.getSize()} 0 auto` }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
          <Table.StatusPosition position="bottom" />
        </Table.Root>
      </div>
    );
  }
};

export const Bare60Items: Story = {
  args: { rowHeight: 44 },
  render: (args) => {
    const data = useMemo(() => generateData(60), []);
    return (
      <div className="border rounded-md h-[500px]">
        <Table.Root {...args} data={data} columns={columns} className="h-full">
          <Table.Body>
            {(row, isFocused) => (
              <Table.Row key={row.id} data-state={row.getIsSelected() ? "selected" : undefined} data-focused={isFocused}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id} style={{ width: cell.column.getSize(), flex: `${cell.column.getSize()} 0 auto` }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    );
  }
};

export const NoData: Story = {
  args: { rowHeight: 44 },
  render: (args) => {
    const data = useMemo(() => generateData(0), []);
    return (
      <div className="border rounded-md h-[500px]">
        <Table.Root {...args} data={data} columns={columns} className="h-full">
          <Table.Body>
            {(row, isFocused) => (
              <Table.Row key={row.id} data-state={row.getIsSelected() ? "selected" : undefined} data-focused={isFocused}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id} style={{ width: cell.column.getSize(), flex: `${cell.column.getSize()} 0 auto` }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    );
  }
};
