import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip.dom';
import { Button } from '../Button';
import { Icon } from '../Icon/Icon.dom';

const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="p-16 flex items-center justify-center min-h-[250px]">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover Me</Button>
      </TooltipTrigger>
      <TooltipContent>
        This is a standard tooltip
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 items-center justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on Top</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on Right</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on Bottom</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on Left</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon name="Info" className="text-[20px]" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="flex items-center gap-2">
        <Icon name="Zap" className="text-[16px] text-amber-400" />
        <span>Quick Shortcut:</span>
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded border border-white/20">
          ⌘K
        </kbd>
      </TooltipContent>
    </Tooltip>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="secondary">Instant (0ms)</Button>
        </TooltipTrigger>
        <TooltipContent>Appears immediately</TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <Button variant="secondary">Delayed (700ms)</Button>
        </TooltipTrigger>
        <TooltipContent>Appears after delay</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col items-center gap-4">
        <Button size="sm" onClick={() => setOpen((prev) => !prev)}>
          Toggle Tooltip: {open ? 'ON' : 'OFF'}
        </Button>
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Button variant="outline">Target Element</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Controlled open state ({open ? 'Visible' : 'Hidden'})
          </TooltipContent>
        </Tooltip>
      </div>
    );
  },
};
