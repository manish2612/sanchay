import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, useTheme } from '@prime/theme-provider';
import { ToastProvider, ToastViewport } from '@prime/ui';
import '../src/index.css';
import type { Brand, Mode, Density } from '@prime/design-tokens';

// Syncs the Storybook Toolbar globals with our ThemeProvider
const ThemeSync = ({ mode, brand, density }: { mode: Mode; brand: Brand; density: Density }) => {
  const { setMode, setBrand, setDensity } = useTheme();

  React.useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);

  React.useEffect(() => {
    setBrand(brand);
  }, [brand, setBrand]);

  React.useEffect(() => {
    setDensity(density);
  }, [density, setDensity]);

  React.useEffect(() => {
    document.body.classList.add(
      'bg-background',
      'text-foreground',
      'transition-colors',
      'duration-200',
    );
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [mode]);

  return null;
};

const preview: Preview = {
  globalTypes: {
    brand: {
      name: 'Brand',
      description: 'Global brand theme for components',
      defaultValue: 'classic',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'classic', title: 'Classic' },
          { value: 'prosperity-green', title: 'Prosperity Green' },
          { value: 'vibrant-orange', title: 'Vibrant Orange' },
          { value: 'executive-blue', title: 'Executive Blue' },
        ],
        showName: true,
      },
    },
    mode: {
      name: 'Mode',
      description: 'Light or Dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        showName: true,
      },
    },
    density: {
      name: 'Density',
      description: 'Global spacing density',
      defaultValue: 'comfortable',
      toolbar: {
        icon: 'zoom',
        items: [
          { value: 'comfortable', title: 'Comfortable' },
          { value: 'compact', title: 'Compact' },
          { value: 'spacious', title: 'Spacious' },
        ],
        showName: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
  },
  decorators: [
    (Story, context) => {
      const { brand, mode, density } = context.globals as {
        brand: Brand;
        mode: Mode;
        density: Density;
      };

      return (
        <ThemeProvider initialBrand={brand} initialMode={mode} initialDensity={density}>
          <ThemeSync brand={brand} mode={mode} density={density} />
          {/* We remove the full-height wrapper so components only take required space */}
          <ToastProvider>
            <div className="p-4">
              <Story />
            </div>
            <ToastViewport position="bottom-right" />
          </ToastProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
