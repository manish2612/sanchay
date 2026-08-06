import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button.dom';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
      description: 'The visual style of the button.',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.',
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'default',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🚀',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
