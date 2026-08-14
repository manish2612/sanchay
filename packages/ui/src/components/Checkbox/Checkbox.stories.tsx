import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'radio' },
    },
    labelPosition: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Subscribe to newsletter',
    description: 'Get notified about the latest updates and offers.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Accept terms and conditions',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Accept terms and conditions',
    disabled: true,
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small Checkbox" />
      <Checkbox size="default" label="Default Checkbox" />
      <Checkbox size="lg" label="Large Checkbox" />
    </div>
  ),
};

export const LabelPositionLeft: Story = {
  args: {
    label: 'Accept terms and conditions',
    labelPosition: 'left',
  },
};

export const UncontrolledVsControlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(false);

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-sm">Uncontrolled</h3>
          <Checkbox label="I manage my own state" defaultChecked />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-sm">Controlled (Checked: {checked.toString()})</h3>
          <Checkbox
            label="React manages my state"
            checked={checked}
            onCheckedChange={setChecked}
          />
        </div>
      </div>
    );
  },
};
