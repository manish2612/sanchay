import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../../../index';
import { ShortcutCheatSheet } from '../ShortcutCheatSheet.dom';

const meta = {
  title: 'Primitives/ShortcutCheatSheet',
  component: ShortcutCheatSheet,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ShortcutCheatSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Cheat Sheet</Button>
        <ShortcutCheatSheet
          open={open}
          onOpenChange={setOpen}
          categories={[
            {
              title: 'General',
              items: [
                { id: 'search', label: 'Search', keys: ['⌘', 'K'] },
                { id: 'cheatsheet', label: 'Show Shortcuts', keys: ['⌘', '/'] },
              ],
            },
            {
              title: 'Editor',
              items: [
                { id: 'save', label: 'Save', keys: ['⌘', 'S'] },
                { id: 'undo', label: 'Undo', keys: ['⌘', 'Z'] },
                { id: 'redo', label: 'Redo', keys: ['⇧', '⌘', 'Z'] },
              ],
            },
          ]}
        />
      </>
    );
  },
};
