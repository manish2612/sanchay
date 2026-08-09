import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TextInput } from './TextInput.dom';
import { Icon } from '../Icon/Icon.dom'; // Assuming Icon is available here

const meta: Meta<typeof TextInput> = {
  title: 'Primitives/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    labelVariant: {
      control: 'select',
      options: ['default', 'in-field', 'inline', 'hidden'],
      description: 'The visual style of the label.',
    },
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: 'The visual variant of the input.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled.',
    },
  },
  args: {
    label: 'Default Label',
    placeholder: 'Enter text...',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const InFieldLabel: Story = {
  args: {
    label: 'In-field Label',
    labelVariant: 'in-field',
  },
};

export const InlineLabel: Story = {
  args: {
    label: 'Inline Label',
    labelVariant: 'inline',
  },
};

export const HiddenLabel: Story = {
  args: {
    label: 'Hidden Label',
    labelVariant: 'hidden',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'In-field with left icon',
    labelVariant: 'in-field',
    placeholder: 'Search...',
    leftSlot: <Icon name="Search" size={18} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Inline with right icon',
    labelVariant: 'inline',
    placeholder: 'Email address',
    rightSlot: <Icon name="Mail" size={18} />,
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    placeholder: 'Invalid input',
    leftSlot: <Icon name="CircleAlert" size={18} />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled',
  },
};
