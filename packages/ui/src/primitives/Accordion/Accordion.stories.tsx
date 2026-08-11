import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionSingleProps,
} from './index';

import { Icon } from '../Icon/Icon.dom';

const meta: Meta<typeof Accordion> = {
  title: 'Primitives/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8 max-w-2xl mx-auto bg-background text-foreground min-h-[300px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated', 'ghost'],
      description: 'Visual layout variant of the accordion items',
    },
    density: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
      description: 'Density mode adjusting padding and font sizes',
    },
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Whether one or multiple items can be opened at the same time',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether all items can be collapsed in single mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
    variant: 'default',
    density: 'comfortable',
  },
  render: (args) => {
    const singleProps = args as AccordionSingleProps;
    return (
      <Accordion {...singleProps} defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>General Settings</AccordionTrigger>
          <AccordionContent>
            Manage your account preferences, email notifications, and default language settings.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Security & Privacy</AccordionTrigger>
          <AccordionContent>
            Configure two-factor authentication, active sessions, and password recovery options.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Billing & Subscriptions</AccordionTrigger>
          <AccordionContent>
            View your active plans, payment methods, download monthly invoices, and update billing information.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};


export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} variant="default">
      <AccordionItem value="item-1">
        <AccordionTrigger>System Requirements</AccordionTrigger>
        <AccordionContent>
          Requires Node.js v18+, Modern browser (Chrome, Firefox, Safari, Edge), and 4GB RAM minimum.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Installation Instructions</AccordionTrigger>
        <AccordionContent>
          Run <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">pnpm install @prime/ui</code> to install component dependencies into your project.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>License Agreement</AccordionTrigger>
        <AccordionContent>
          Distributed under the MIT License. Commercial and non-commercial usage permitted.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithHeaderIcons: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" variant="bordered">
      <AccordionItem value="item-1">
        <AccordionTrigger icon="User">
          User Account Details
        </AccordionTrigger>
        <AccordionContent>
          Update your profile avatar, display name, and public handle.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon="Lock">
          Access Credentials
        </AccordionTrigger>
        <AccordionContent>
          Generate API keys, OAuth tokens, and configure single sign-on (SSO) integrations.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger icon="Bell">
          Notification Preferences
        </AccordionTrigger>
        <AccordionContent>
          Customize push notifications, email digests, and automated Slack alerts.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const VisualVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          1. Default Variant (Clean Bordered Dividers)
        </h4>
        <Accordion type="single" collapsible defaultValue="v1-1" variant="default">
          <AccordionItem value="v1-1">
            <AccordionTrigger icon="FileText">Document Summary</AccordionTrigger>
            <AccordionContent>Clean horizontal divider borders using border-border token.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="v1-2">
            <AccordionTrigger icon="Folder">File Repository</AccordionTrigger>
            <AccordionContent>Maintains seamless continuity within lists and forms.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          2. Bordered Variant (Card Outline Container)
        </h4>
        <Accordion type="single" collapsible defaultValue="v2-1" variant="bordered">
          <AccordionItem value="v2-1">
            <AccordionTrigger icon="Layers">Structured Layout</AccordionTrigger>
            <AccordionContent>Enclosed in a rounded card border container.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="v2-2">
            <AccordionTrigger icon="Database">Database Schema</AccordionTrigger>
            <AccordionContent>Ideal for grouped settings or inspectable records.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          3. Separated Variant (Standalone Card Items)
        </h4>
        <Accordion type="single" collapsible defaultValue="v3-1" variant="separated">
          <AccordionItem value="v3-1">
            <AccordionTrigger icon="Shield">Security Policy</AccordionTrigger>
            <AccordionContent>Individual card items with background surface and subtle shadow.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="v3-2">
            <AccordionTrigger icon="Key">Access Control</AccordionTrigger>
            <AccordionContent>Separated gap spacing for distinct card presentation.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          4. Ghost Variant (Flush / Minimalist)
        </h4>
        <Accordion type="single" collapsible defaultValue="v4-1" variant="ghost">
          <AccordionItem value="v4-1">
            <AccordionTrigger icon="Sliders">Advanced Parameters</AccordionTrigger>
            <AccordionContent>Minimalist flush styling with subtle hover state and no borders.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="v4-2">
            <AccordionTrigger icon="Zap">Performance Tuning</AccordionTrigger>
            <AccordionContent>Great for dense sidebars or inline filters.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

export const DensityModes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
            Compact Density
          </span>
          <span className="text-xs text-muted-foreground">Tighter padding (py-2 px-3, text-xs)</span>
        </div>
        <Accordion type="single" collapsible density="compact" variant="bordered">
          <AccordionItem value="c-1">
            <AccordionTrigger icon="Grid">Compact Item 1</AccordionTrigger>
            <AccordionContent>Optimized for high-density ERP data screens and toolbars.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="c-2">
            <AccordionTrigger icon="Table">Compact Item 2</AccordionTrigger>
            <AccordionContent>Saves vertical space while preserving clear touch/click targets.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
            Comfortable Density (Default)
          </span>
          <span className="text-xs text-muted-foreground">Standard spacing (py-3 px-4, text-sm)</span>
        </div>
        <Accordion type="single" collapsible density="comfortable" variant="bordered">
          <AccordionItem value="m-1">
            <AccordionTrigger icon="Grid">Comfortable Item 1</AccordionTrigger>
            <AccordionContent>Balanced proportions suitable for general application forms.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="m-2">
            <AccordionTrigger icon="Table">Comfortable Item 2</AccordionTrigger>
            <AccordionContent>Standard visual hierarchy with comfortable reading distance.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
            Spacious Density
          </span>
          <span className="text-xs text-muted-foreground">Generous spacing (py-4 px-5, text-base)</span>
        </div>
        <Accordion type="single" collapsible density="spacious" variant="bordered">
          <AccordionItem value="s-1">
            <AccordionTrigger icon="Grid">Spacious Item 1</AccordionTrigger>
            <AccordionContent>Generous padding for touch screens, landing pages, or marketing FAQs.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="s-2">
            <AccordionTrigger icon="Table">Spacious Item 2</AccordionTrigger>
            <AccordionContent>Enhanced whitespace for relaxed user experience.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

export const CustomHeaderBadges: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" variant="separated">
      <AccordionItem value="item-1">
        <AccordionTrigger icon="Clock">
          <div className="flex items-center justify-between w-full pr-2">
            <span>Pending Approvals</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
              3 Requires Review
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          You have 3 purchase requisitions waiting for management authorization.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon="CheckCircle">
          <div className="flex items-center justify-between w-full pr-2">
            <span>Completed Tasks</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              12 Done
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          All weekly compliance and audit log tasks have been verified.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" variant="bordered">
      <AccordionItem value="item-1">
        <AccordionTrigger icon="Unlock">Active Section</AccordionTrigger>
        <AccordionContent>This accordion section can be toggled freely.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger icon="Lock">Locked Section (Disabled)</AccordionTrigger>
        <AccordionContent>This content cannot be opened because the section is disabled.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger icon="Settings">Settings Section</AccordionTrigger>
        <AccordionContent>Another active accordion section.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const KeyboardNavigationGuide: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 rounded-lg border border-border bg-muted/30 text-xs space-y-2">
        <div className="font-semibold text-foreground flex items-center gap-1.5">
          <Icon name="Keyboard" size={14} className="text-primary" />
          <span>Keyboard Accessibility Shortcuts (WAI-ARIA Accordion)</span>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-muted-foreground font-mono">
          <li><kbd className="px-1 rounded bg-background border border-border">Tab</kbd> Move focus to trigger</li>
          <li><kbd className="px-1 rounded bg-background border border-border">Space / Enter</kbd> Expand / Collapse</li>
          <li><kbd className="px-1 rounded bg-background border border-border">↓ / ↑</kbd> Move focus to next/prev</li>
          <li><kbd className="px-1 rounded bg-background border border-border">Home / End</kbd> Jump to first/last</li>
        </ul>
      </div>

      <Accordion type="single" collapsible defaultValue="kb-1" variant="default">
        <AccordionItem value="kb-1">
          <AccordionTrigger icon="HelpCircle">Keyboard Navigation Step 1</AccordionTrigger>
          <AccordionContent>Press Tab to focus this trigger, then press Space or Enter to toggle.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="kb-2">
          <AccordionTrigger icon="HelpCircle">Keyboard Navigation Step 2</AccordionTrigger>
          <AccordionContent>Press Down Arrow key to jump directly to this trigger element.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="kb-3">
          <AccordionTrigger icon="HelpCircle">Keyboard Navigation Step 3</AccordionTrigger>
          <AccordionContent>Press Home to return focus to the top or End to reach the bottom.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
