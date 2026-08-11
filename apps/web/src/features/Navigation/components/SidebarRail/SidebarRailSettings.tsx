'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Icon, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
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

interface SidebarRailSettingsProps {
  onPopoverToggle: (isOpen: boolean) => void;
  forceClose: boolean;
}

export function SidebarRailSettings({
  onPopoverToggle,
  forceClose,
}: SidebarRailSettingsProps) {
  const { brand, setBrand, mode, setMode, density, setDensity } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Allow parent to force close this popover (e.g. when user clicks Avatar)
  useEffect(() => {
    if (forceClose) {
      setIsOpen(false);
    }
  }, [forceClose]);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onPopoverToggle(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onPopoverToggle]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    onPopoverToggle(nextState);
  };

  return (
    <div className="relative flex justify-center w-full" ref={menuRef}>
      <Tooltip open={isOpen ? false : undefined}>
        <TooltipTrigger asChild>
          <button
            onClick={handleToggle}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              isOpen ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon name="Settings" className="text-[22px]" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Settings & Theme</TooltipContent>
      </Tooltip>

      {/* Settings Popover */}
      {isOpen && (
        <div className="absolute left-full ml-4 bottom-0 w-[280px] bg-surface border border-border shadow-2xl rounded-xl p-4 z-[100] flex flex-col cursor-default">
          <div className="font-heading font-bold text-base text-foreground mb-4">Appearance</div>

          {/* Theme Mode Selection */}
          <div className="mb-5">
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
                    className={`flex-1 flex items-center justify-center py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
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
          <div className="mb-5">
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
                    className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 text-[11px] font-medium rounded-md capitalize transition-all ${
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
                    className={`flex items-center w-full px-2 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-foreground hover:bg-surfaceHover'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full mr-3 shadow-sm border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: theme.color }}
                    />
                    <span className="text-sm">{theme.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
