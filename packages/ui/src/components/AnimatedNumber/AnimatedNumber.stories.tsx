import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { AnimatedNumber } from './AnimatedNumber';
import { Button } from '../../primitives/Button';

const meta = {
  title: 'Components/AnimatedNumber',
  component: AnimatedNumber,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AnimatedNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

function InteractiveDemo({ initialValue, ...props }: any) {
  const [val, setVal] = useState(initialValue);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setVal(val - 1450)}>
          - 1,450
        </Button>
        <Button variant="outline" onClick={() => setVal(val - 12)}>
          - 12
        </Button>
        <Button variant="outline" onClick={() => setVal(val + 12)}>
          + 12
        </Button>
        <Button variant="outline" onClick={() => setVal(val + 1450)}>
          + 1,450
        </Button>
        <Button variant="outline" onClick={() => setVal(val - 4000)}>
          - 4,000
        </Button>
        <Button variant="outline" onClick={() => setVal(val - 5450)}>
          - 5,450
        </Button>
      </div>

      <AnimatedNumber value={val} {...props} />
    </div>
  );
}

export const KpiDashboard: Story = {
  render: () => (
    <InteractiveDemo
      initialValue={12450.5}
      mode="slide"
      formatOptions={{ style: 'currency', currency: 'USD' }}
      className="text-4xl font-bold text-foreground"
    />
  ),
};

export const GrandTotal: Story = {
  render: () => (
    <div className="w-full p-4 border rounded-lg bg-surface flex justify-between items-center shadow-sm">
      <span className="font-semibold text-lg text-foreground">Total Due</span>
      <InteractiveDemo
        initialValue={4200.0}
        mode="slide"
        formatOptions={{ style: 'currency', currency: 'USD' }}
        className="text-2xl font-semibold text-primary"
      />
    </div>
  ),
};

export const InlineTableCell: Story = {
  render: () => (
    <div className="border rounded-md shadow-sm overflow-hidden w-96">
      <table className="w-full text-sm">
        <thead className="bg-muted text-left">
          <tr>
            <th className="p-2 font-medium">Item</th>
            <th className="p-2 font-medium text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">Premium Widget</td>
            <td className="p-2 text-right">
              <InteractiveDemo
                initialValue={150}
                mode="fade"
                formatOptions={{ style: 'currency', currency: 'USD' }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

export const FormatVariants: Story = {
  render: () => {
    const [customDelay, setCustomDelay] = useState(0);
    const [animationKey, setAnimationKey] = useState(0);

    return (
      <div className="flex flex-col gap-6">
        {/* Controls */}
        <div className="flex items-center gap-6 p-4 border rounded-xl bg-surface-variant">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-semibold flex justify-between">
              <span>Additional Delay</span>
              <span className="text-muted-foreground">{customDelay}ms</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max="2000" 
              step="100" 
              value={customDelay} 
              onChange={(e) => setCustomDelay(Number(e.target.value))} 
              className="w-full"
            />
          </div>
          <Button onClick={() => setAnimationKey(k => k + 1)}>
            Replay Animations
          </Button>
        </div>

        {/* Gallery */}
        <div key={animationKey} className="grid grid-cols-2 gap-x-12 gap-y-8 p-6 bg-surface border rounded-xl shadow-sm">
          
          {/* US Dollar Variations */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-muted-foreground border-b pb-1 mb-1">US Dollar (USD)</span>
            <div className="flex justify-between items-center">
              <span className="text-sm">Default (US$)</span>
              <AnimatedNumber delay={customDelay} value={1250000.5} formatOptions={{ style: 'currency', currency: 'USD' }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Narrow Symbol ($)</span>
              <AnimatedNumber delay={customDelay} value={1250000.5} formatOptions={{ style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Accounting (Negative)</span>
              <AnimatedNumber delay={customDelay} value={-1250.5} formatOptions={{ style: 'currency', currency: 'USD', currencySign: 'accounting' }} />
            </div>
          </div>

          {/* Euro Variations */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-muted-foreground border-b pb-1 mb-1">Euro (EUR) - Locale Differences</span>
            <div className="flex justify-between items-center">
              <span className="text-sm">German (de-DE)</span>
              <AnimatedNumber delay={customDelay} value={1250000.5} locale="de-DE" formatOptions={{ style: 'currency', currency: 'EUR' }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">French (fr-FR)</span>
              <AnimatedNumber delay={customDelay} value={1250000.5} locale="fr-FR" formatOptions={{ style: 'currency', currency: 'EUR' }} />
            </div>
          </div>

          {/* South Asian Currencies */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-muted-foreground border-b pb-1 mb-1">South Asian (Lakh/Crore Grouping)</span>
            <div className="flex justify-between items-center">
              <span className="text-sm">Indian Rupee (en-IN)</span>
              <AnimatedNumber delay={customDelay} value={1250000.5} locale="en-IN" formatOptions={{ style: 'currency', currency: 'INR' }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Nepali Rupee (ne-NP)</span>
              <AnimatedNumber delay={customDelay} value={1250000.5} locale="ne-NP" formatOptions={{ style: 'currency', currency: 'NPR' }} />
            </div>
          </div>

          {/* Other Styles */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-muted-foreground border-b pb-1 mb-1">Other Styles</span>
            <div className="flex justify-between items-center">
              <span className="text-sm">Compact (K/M/B)</span>
              <AnimatedNumber delay={customDelay} value={1250000.5} formatOptions={{ notation: 'compact', maximumFractionDigits: 1 }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Percentage</span>
              <AnimatedNumber delay={customDelay} value={0.854} formatOptions={{ style: 'percent', minimumFractionDigits: 1 }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Japanese Yen (No decimals)</span>
              <AnimatedNumber delay={customDelay} value={1250000} locale="ja-JP" formatOptions={{ style: 'currency', currency: 'JPY' }} />
            </div>
          </div>

        </div>
      </div>
    );
  },
};
