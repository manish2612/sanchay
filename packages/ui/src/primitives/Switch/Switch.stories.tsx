import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Switch } from './Switch.dom';

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'The size of the switch.',
    },
    labelVariant: {
      control: 'select',
      options: ['default', 'inline', 'hidden'],
      description: 'The visual style of the label.',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'The position of the label when labelVariant is inline.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled.',
    },
    checked: {
      control: 'boolean',
      description: 'The controlled checked state.',
    },
  },
  args: {
    label: 'Switch Label',
    size: 'default',
    disabled: false,
    labelVariant: 'inline',
    labelPosition: 'right',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

const SwitchWithState = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);
  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
};

export const Default: Story = {
  render: (args) => <SwitchWithState {...args} />,
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Switch',
  },
  render: (args) => <SwitchWithState {...args} />,
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Switch',
  },
  render: (args) => <SwitchWithState {...args} />,
};

export const StackedLabel: Story = {
  args: {
    labelVariant: 'default',
    label: 'Stacked Label',
  },
  render: (args) => <SwitchWithState {...args} />,
};

export const LeftLabel: Story = {
  args: {
    labelVariant: 'inline',
    labelPosition: 'left',
    label: 'Left Label (Settings)',
  },
  render: (args) => <SwitchWithState {...args} />,
};

export const HiddenLabel: Story = {
  args: {
    labelVariant: 'hidden',
    label: 'Hidden Screen Reader Label',
  },
  render: (args) => <SwitchWithState {...args} />,
};

export const DisabledOff: Story = {
  args: {
    disabled: true,
    label: 'Disabled Off',
  },
  render: (args) => <Switch {...args} checked={false} />,
};

export const DisabledOn: Story = {
  args: {
    disabled: true,
    label: 'Disabled On',
    checked: true,
  },
  render: (args) => <Switch {...args} checked={true} />,
};
