import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SegmentedControl } from './index';

const meta: Meta<typeof SegmentedControl.Root> = {
  title: 'Primitives/SegmentedControl',
  component: SegmentedControl.Root,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default'],
      description: 'The size of the segmented control.',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
      description: 'The visual style variant.',
    },
  },
  args: {
    size: 'default',
    variant: 'default',
    defaultValue: 'rooms',
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl.Root>;

export const Default: Story = {
  render: (args) => (
    <SegmentedControl.Root {...args}>
      <SegmentedControl.Item value="details" label="Details" />
      <SegmentedControl.Item value="rooms" label="Rooms" />
      <SegmentedControl.Item value="photos" label="Photos" />
    </SegmentedControl.Root>
  ),
};

export const SmallSize: Story = {
  render: (args) => (
    <SegmentedControl.Root {...args} defaultValue="1" size="sm">
      <SegmentedControl.Item value="1" label="One" />
      <SegmentedControl.Item value="2" label="Two" />
      <SegmentedControl.Item value="3" label="Three" />
    </SegmentedControl.Root>
  ),
};

export const ExtraSmallSize: Story = {
  render: (args) => (
    <SegmentedControl.Root {...args} defaultValue="yes" size="xs">
      <SegmentedControl.Item value="yes" label="Yes" />
      <SegmentedControl.Item value="no" label="No" />
    </SegmentedControl.Root>
  ),
};

export const CustomStylingGhost: Story = {
  render: (args) => (
    <SegmentedControl.Root {...args} defaultValue="grid" variant="ghost">
      <SegmentedControl.Item value="list" label="List View" />
      <SegmentedControl.Item value="grid" label="Grid View" />
    </SegmentedControl.Root>
  ),
};

export const TwoOptionsManual: Story = {
  render: (args) => (
    <SegmentedControl.Root {...args} defaultValue="apple">
      <SegmentedControl.Item value="apple" label="Apple" />
      <SegmentedControl.Item value="banana" label="Banana" />
    </SegmentedControl.Root>
  ),
};

export const CustomBorderRadius: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <input
        type="text"
        defaultValue="0.00"
        className="w-24 h-8 px-2 text-right border border-input rounded-md text-sm shadow-sm bg-surface text-foreground"
        disabled
      />
      <div className="w-[60px]">
        <SegmentedControl.Root
          {...args}
          defaultValue="%"
          size="xs"
          className="rounded-md p-0.5"
        >
          <SegmentedControl.Item
            value="%"
            label="%"
            className="w-4 rounded-sm font-bold"
          />
          <SegmentedControl.Item
            value="#"
            label="#"
            className="w-4 rounded-sm font-bold"
          />
        </SegmentedControl.Root>
      </div>
    </div>
  ),
};
