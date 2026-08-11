import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  type ToastVariant,
  type ToastDensity,
  type ToastPosition,
} from './index';

import { Button } from '../Button';
import { Icon } from '../Icon/Icon.dom';

const meta: Meta<typeof ToastRoot> = {
  title: 'Primitives/Toast',
  component: ToastRoot,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="p-8 max-w-3xl mx-auto bg-background text-foreground min-h-[350px]">
          <Story />
        </div>
        <ToastViewport position="bottom-right" />
      </ToastProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'destructive'],
      description: 'Visual status variant of the toast',
    },
    density: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
      description: 'Density mode adjusting padding, font size, and icon sizing',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show status indicator icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastRoot>;

export const Default: Story = {
  args: {
    variant: 'default',
    density: 'comfortable',
  },
  render: (args) => (
    <ToastRoot open {...args}>
      <ToastTitle>System Update</ToastTitle>
      <ToastDescription>
        System maintenance is scheduled for tonight at 11:00 PM EST.
      </ToastDescription>
      <ToastClose />
    </ToastRoot>
  ),
};

export const VisualVariants: Story = {
  render: () => {
    const variants: { variant: ToastVariant; title: string; desc: string }[] = [
      {
        variant: 'default',
        title: 'Draft Saved',
        desc: 'Voucher draft #V-8941 has been saved locally.',
      },
      {
        variant: 'info',
        title: 'New Feature Available',
        desc: 'Multi-currency ledger reports are now enabled for your organization.',
      },
      {
        variant: 'success',
        title: 'Payment Processed',
        desc: 'Invoice #INV-2026-092 payment of $14,250.00 confirmed successfully.',
      },
      {
        variant: 'warning',
        title: 'Storage Capacity Warning',
        desc: 'Your document attachment storage is at 88% capacity.',
      },
      {
        variant: 'destructive',
        title: 'Transaction Failed',
        desc: 'Could not connect to payment gateway. Please check network connectivity.',
      },
    ];

    return (
      <div className="space-y-4">
        {variants.map((v) => (
          <ToastRoot key={v.variant} open variant={v.variant}>
            <ToastTitle>{v.title}</ToastTitle>
            <ToastDescription>{v.desc}</ToastDescription>
            <ToastClose />
          </ToastRoot>
        ))}
      </div>
    );
  },
};

export const DensityModes: Story = {
  render: () => {
    const densities: { density: ToastDensity; label: string; desc: string }[] = [
      {
        density: 'compact',
        label: 'Compact Density (ERP Data Grids)',
        desc: 'Tighter padding (p-2.5, text-xs) for data-dense toolbars.',
      },
      {
        density: 'comfortable',
        label: 'Comfortable Density (Standard ERP)',
        desc: 'Balanced spacing (p-4, text-sm) suitable for standard workflows.',
      },
      {
        density: 'spacious',
        label: 'Spacious Density (High Focus)',
        desc: 'Generous padding (p-5, text-base) for prominent notifications.',
      },
    ];

    return (
      <div className="space-y-6">
        {densities.map((item) => (
          <div key={item.density}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                {item.label}
              </span>
            </div>
            <ToastRoot open density={item.density} variant="info">
              <ToastTitle>{item.label}</ToastTitle>
              <ToastDescription>{item.desc}</ToastDescription>
              <ToastClose />
            </ToastRoot>
          </div>
        ))}
      </div>
    );
  },
};

export const WithAction: Story = {
  render: () => (
    <div className="space-y-4">
      <ToastRoot open variant="success">
        <ToastTitle>File Archived</ToastTitle>
        <ToastDescription>
          Ledger_Report_2026.pdf moved to archive storage.
        </ToastDescription>
        <ToastAction altText="Undo archive action">Undo</ToastAction>
        <ToastClose />
      </ToastRoot>

      <ToastRoot open variant="destructive">
        <ToastTitle>Connection Lost</ToastTitle>
        <ToastDescription>
          Lost sync with database replica node-04.
        </ToastDescription>
        <ToastAction altText="Retry database connection">Retry Sync</ToastAction>
        <ToastClose />
      </ToastRoot>
    </div>
  ),
};

export const Customization: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-3 bg-muted/20 rounded-md border border-border">
        <span className="text-xs text-muted-foreground font-medium block mb-2">
          Custom Icon & Styling Integration
        </span>
        <ToastRoot
          open
          variant="default"
          icon={<Icon name="Sparkles" className="text-purple-500 animate-pulse" size={20} />}
          className="border-purple-500/30 bg-purple-950/10 text-purple-900 dark:text-purple-200"
        >
          <ToastTitle className="text-purple-700 dark:text-purple-300">
            AI Assistant Insight
          </ToastTitle>
          <ToastDescription>
            AI anomaly detection found 2 unverified expense entries.
          </ToastDescription>
          <ToastAction
            altText="Review AI insights"
            className="border-purple-500/40 text-purple-700 hover:bg-purple-500/20 dark:text-purple-300"
          >
            Review Now
          </ToastAction>
          <ToastClose />
        </ToastRoot>
      </div>
    </div>
  ),
};

export const KeyboardAndA11y: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 rounded-lg border border-border bg-muted/30 text-xs space-y-3">
        <div className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
          <Icon name="Keyboard" size={16} className="text-primary" />
          <span>Keyboard & Accessibility Guidelines (WAI-ARIA Toast Region)</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Toast notifications are announced via ARIA live regions (<code className="font-mono text-primary">polite</code> for standard status, <code className="font-mono text-primary">assertive</code> for errors). Keyboard users can navigate toasts directly using dedicated hotkeys.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground font-mono">
          <li className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-foreground font-bold">F8</kbd>
            <span>Jump focus to Toast Viewport</span>
          </li>
          <li className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-foreground font-bold">Tab / Shift+Tab</kbd>
            <span>Cycle through Actions & Close</span>
          </li>
          <li className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-foreground font-bold">Space / Enter</kbd>
            <span>Trigger focused Toast Action</span>
          </li>
          <li className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-foreground font-bold">Esc</kbd>
            <span>Dismiss active focused Toast</span>
          </li>
        </ul>
      </div>

      <ToastRoot open variant="warning">
        <ToastTitle>Press F8 to Focus Keyboard Navigation</ToastTitle>
        <ToastDescription>
          Focus moves directly to the Toast region when pressing F8. Press Tab to reach action or close.
        </ToastDescription>
        <ToastAction altText="Test action keyboard target">Focus Action</ToastAction>
        <ToastClose />
      </ToastRoot>
    </div>
  ),
};

interface ToastItemData {
  id: string;
  title: string;
  desc: string;
  variant: ToastVariant;
  density: ToastDensity;
  hasAction?: boolean;
}

export const InteractiveDemo: Story = {
  render: function InteractiveDemoStory() {
    const [toasts, setToasts] = useState<ToastItemData[]>([]);
    const [position, setPosition] = useState<ToastPosition>('bottom-right');

    const addToast = (variant: ToastVariant, density: ToastDensity = 'comfortable', hasAction = false) => {
      const id = String(Date.now());
      const titles: Record<ToastVariant, string> = {
        default: 'System Notification',
        info: 'Sync Complete',
        success: 'Order Submitted',
        warning: 'Unsaved Changes',
        destructive: 'Export Error',
      };
      const descs: Record<ToastVariant, string> = {
        default: `Notification event recorded at ${new Date().toLocaleTimeString()}.`,
        info: 'All ledger transactions synchronized with remote cloud server.',
        success: `Purchase order #PO-${Math.floor(1000 + Math.random() * 9000)} posted.`,
        warning: 'Form data has been modified. Save changes before leaving.',
        destructive: 'Failed to generate PDF report due to missing template.',
      };

      setToasts((prev) => [...prev, { id, title: titles[variant], desc: descs[variant], variant, density, hasAction }]);
    };

    const removeToast = (id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
      <ToastProvider>
        <div className="space-y-6">
          <div className="p-4 border border-border rounded-lg bg-card space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Interactive Toast Dispatcher</h4>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => addToast('default')}>
                + Default Toast
              </Button>
              <Button size="sm" variant="outline" onClick={() => addToast('info')}>
                + Info Toast
              </Button>
              <Button size="sm" variant="outline" onClick={() => addToast('success')}>
                + Success Toast
              </Button>
              <Button size="sm" variant="outline" onClick={() => addToast('warning')}>
                + Warning Toast
              </Button>
              <Button size="sm" variant="destructive" onClick={() => addToast('destructive', 'comfortable', true)}>
                + Action Toast (Destructive)
              </Button>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-border text-xs">
              <span className="font-semibold text-muted-foreground">Viewport Position:</span>
              {(['bottom-right', 'top-right', 'bottom-left', 'top-left', 'bottom-center', 'top-center'] as ToastPosition[]).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setPosition(pos)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    position === pos ? 'bg-primary text-primary-foreground font-semibold' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic">
            Active Toasts: {toasts.length}. Click buttons above to trigger live floating toasts in the selected viewport position.
          </p>
        </div>

        <ToastViewport position={position} />

        {toasts.map((toast) => (
          <ToastRoot
            key={toast.id}
            variant={toast.variant}
            density={toast.density}
            onOpenChange={(open) => {
              if (!open) removeToast(toast.id);
            }}
          >
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.desc}</ToastDescription>
            {toast.hasAction && (
              <ToastAction altText="Retry operation" onClick={() => removeToast(toast.id)}>
                Retry
              </ToastAction>
            )}
            <ToastClose />
          </ToastRoot>
        ))}
      </ToastProvider>
    );
  },
};
