import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DropdownMenu } from './index';
import { DropdownMenuProps } from './types';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    labelVariant: {
      control: 'select',
      options: ['default', 'in-field', 'inline', 'hidden'],
      description: 'The visual style of the label.',
    },
    label: {
      control: 'text',
      description: 'The label text.',
    },
    triggerLabel: {
      control: 'text',
      description: 'The text displayed inside the trigger button.',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the dropdown menu includes a search input.',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'The alignment of the dropdown content relative to the trigger.',
    },
  },
  args: {
    label: 'Dropdown Menu',
    labelVariant: 'default',
    triggerLabel: 'Smart Dropdown',
    searchable: false,
    align: 'start',
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const sampleItems = [
  {
    id: '1',
    label: 'Profile',
    onSelect: () => alert('Profile clicked'),
    icon: 'User' as const,
  },
  {
    id: '2',
    label: 'Settings',
    onSelect: () => alert('Settings clicked'),
    icon: 'Settings' as const,
    shortcut: '⌘S',
  },
  {
    id: '3',
    label: 'Logout',
    onSelect: () => alert('Logout clicked'),
    icon: 'LogOut' as const,
  },
];

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <DropdownMenu {...args} items={sampleItems} />
    </div>
  ),
};

export const Searchable: Story = {
  args: {
    searchable: true,
    triggerLabel: 'Searchable Dropdown',
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <DropdownMenu {...args} items={sampleItems} />
    </div>
  ),
};

export const InFieldLabel: Story = {
  args: {
    label: 'In-Field Label',
    labelVariant: 'in-field',
    searchable: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <DropdownMenu {...args} items={sampleItems} />
    </div>
  ),
};

export const InlineLabel: Story = {
  args: {
    label: 'Inline Label',
    labelVariant: 'inline',
    searchable: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <DropdownMenu {...args} items={sampleItems} />
    </div>
  ),
};
