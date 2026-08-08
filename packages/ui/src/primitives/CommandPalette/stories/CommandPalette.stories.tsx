import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Button } from '../../../index';
import { CommandDialog, CommandInput, CommandList, CommandItem } from '../dom/index';

const meta = {
  title: 'Primitives/CommandPalette',
  component: CommandDialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommandDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };
      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
    }, []);

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Press ⌘K or click to open
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandItem value="calendar" onSelect={() => alert('Calendar')}>
              Calendar
            </CommandItem>
            <CommandItem value="search" onSelect={() => alert('Search')}>
              Search Emoji
            </CommandItem>
            <CommandItem value="calculator" onSelect={() => alert('Calculator')}>
              Calculator
            </CommandItem>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};
