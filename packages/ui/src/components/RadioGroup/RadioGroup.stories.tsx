import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'default', 'lg'],
      control: { type: 'radio' },
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { label: 'Option One', value: '1' },
  { label: 'Option Two', value: '2' },
  { label: 'Option Three', value: '3' },
];

const advancedOptions = [
  { 
    label: 'Standard Plan', 
    value: 'standard',
    description: 'Perfect for small teams and startups.'
  },
  { 
    label: 'Pro Plan', 
    value: 'pro',
    description: 'Advanced features for scaling businesses.'
  },
  { 
    label: 'Enterprise Plan (Coming Soon)', 
    value: 'enterprise',
    description: 'Custom solutions for large organizations.',
    disabled: true
  },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    defaultValue: '1',
  },
};

export const Horizontal: Story = {
  args: {
    options: basicOptions,
    defaultValue: '2',
    orientation: 'horizontal',
  },
};

export const WithDescriptions: Story = {
  args: {
    options: advancedOptions,
    defaultValue: 'standard',
  },
};

export const DisabledGroup: Story = {
  args: {
    options: basicOptions,
    defaultValue: '1',
    disabled: true,
  },
};

export const Sizes: Story = {
  args: {
    options: basicOptions,
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Small</h3>
        <RadioGroup size="sm" defaultValue="1" options={basicOptions} orientation="horizontal" />
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium">Default</h3>
        <RadioGroup size="default" defaultValue="1" options={basicOptions} orientation="horizontal" />
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium">Large</h3>
        <RadioGroup size="lg" defaultValue="1" options={basicOptions} orientation="horizontal" />
      </div>
    </div>
  ),
};

export const UncontrolledVsControlled: Story = {
  args: {
    options: basicOptions,
  },
  render: () => {
    const [value, setValue] = React.useState('2');

    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="font-medium text-sm">Uncontrolled</h3>
          <RadioGroup 
            defaultValue="1" 
            options={basicOptions} 
            orientation="horizontal" 
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium text-sm">Controlled (Selected: {value})</h3>
          <RadioGroup 
            value={value} 
            onValueChange={setValue} 
            options={basicOptions} 
            orientation="horizontal" 
          />
        </div>
      </div>
    );
  },
};
