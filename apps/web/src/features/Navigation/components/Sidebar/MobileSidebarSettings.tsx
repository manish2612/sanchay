'use client';
import React from 'react';
import { Icon } from '@prime/ui';
import { useTheme } from '@prime/theme-provider/web';
import { Brand, Density, Mode } from '@prime/design-tokens';

const AVAILABLE_THEMES: { id: Brand; label: string; color: string }[] = [
  { id: 'classic', label: 'Classic', color: '#0070f3' },
  { id: 'executive-blue', label: 'Executive Blue', color: '#1E488F' },
  { id: 'prosperity-green', label: 'Prosperity Green', color: '#2E5C46' },
  { id: 'vibrant-orange', label: 'Vibrant Orange', color: '#E85D04' },
];

const AVAILABLE_DENSITIES: { id: Density; label: string }[] = [
  { id: 'compact', label: 'Compact' },
  { id: 'comfortable', label: 'Comfort' },
  { id: 'spacious', label: 'Spacious' },
];

export function MobileSidebarSettings({ onBack }: { onBack: () => void }) {
  const { brand, setBrand, mode, setMode, density, setDensity } = useTheme();

  return (
    <>
      <div className="flex items-center h-14 px-2 border-b border-border flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center p-2 text-sm text-mutedForeground hover:text-foreground font-medium"
        >
          <Icon name="ChevronLeft" className="w-4 h-4 mr-1" />
          Main Menu
        </button>
      </div>
      <div className="px-5 py-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-foreground">Settings & Theme</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="font-heading font-bold text-base text-foreground mb-4">Appearance</div>

        {/* Theme Mode Selection */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-mutedForeground uppercase tracking-wider mb-2">
            Mode
          </div>
          <div className="flex bg-black/5 dark:bg-white/5 rounded-lg p-1">
            {(['light', 'dark', 'system'] as const).map((m) => {
              const isActive = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 flex items-center justify-center py-2 text-xs font-medium rounded-md capitalize transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {/* Density Selection */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-mutedForeground uppercase tracking-wider mb-2">
            Density
          </div>
          <div className="flex bg-black/5 dark:bg-white/5 rounded-lg p-1">
            {AVAILABLE_DENSITIES.map((d) => {
              const isActive = density === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setDensity(d.id)}
                  className={`flex-1 flex flex-col items-center justify-center py-2 px-1 text-[11px] font-medium rounded-md capitalize transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand Theme Selection */}
        <div>
          <div className="text-xs font-semibold text-mutedForeground uppercase tracking-wider mb-2">
            Theme Color
          </div>
          <div className="flex flex-col space-y-1">
            {AVAILABLE_THEMES.map((theme) => {
              const isActive = brand === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setBrand(theme.id)}
                  className={`flex items-center w-full px-3 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-foreground hover:bg-surfaceHover'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full mr-3 shadow-sm border border-black/10 dark:border-white/10"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className="text-sm">{theme.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
