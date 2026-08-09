import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SplitButton } from '../SplitButton';

const meta = {
  title: 'Components/SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    primaryLabel: 'Save',
    primaryAction: () => alert('Saved!'),
    items: [
      { id: '1', label: 'Save as draft', onSelect: () => alert('Saved as draft') },
      { id: '2', label: 'Publish now', onSelect: () => alert('Published') },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    primaryLabel: 'Create',
    primaryIcon: 'Plus',
    variant: 'primary',
    primaryAction: () => alert('Created!'),
    items: [
      { id: '1', label: 'Create Folder', icon: 'Folder', onSelect: () => alert('Created folder') },
      { id: '2', label: 'Create File', icon: 'File', onSelect: () => alert('Created file') },
    ],
  },
};
