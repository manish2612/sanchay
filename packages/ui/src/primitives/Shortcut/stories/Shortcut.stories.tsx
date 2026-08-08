import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ShortcutProvider } from '../ShortcutProvider';
import { useShortcut } from '../useShortcut';
import { Text } from '../../../index';

const meta = {
  title: 'Primitives/Shortcut',
  component: ShortcutProvider,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ShortcutProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const ShortcutDemo = () => {
  const [lastAction, setLastAction] = useState<string>('Press ⌘S to save or ⌘O to open');

  useShortcut('meta+s', (e) => {
    e.preventDefault();
    setLastAction('Saved!');
  });

  useShortcut('meta+o', (e) => {
    e.preventDefault();
    setLastAction('Opened file!');
  });

  return (
    <div className="p-8 border border-border rounded-lg bg-surface shadow-sm">
      <Text variant="heading" size="lg" className="mb-4">
        Shortcut Hook Demo
      </Text>
      <Text variant="body" size="md">
        {lastAction}
      </Text>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ShortcutProvider>
      <ShortcutDemo />
    </ShortcutProvider>
  ),
  args: {} as React.ComponentProps<typeof ShortcutProvider>,
};
