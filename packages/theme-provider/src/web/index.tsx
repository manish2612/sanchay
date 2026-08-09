'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { useThemeAdapter } from '@prime/theme-adapters';
import { Brand, Mode, Density } from '@prime/design-tokens';
import { ThemeProviderProps, UseThemeResult } from '../types';

const ThemeContext = createContext<UseThemeResult | null>(null);

const InnerProvider = ({
  children,
  initialBrand,
  initialDensity,
}: {
  children: React.ReactNode;
  initialBrand: Brand;
  initialDensity: Density;
}) => {
  const { theme: userPreference, setTheme: setNextThemeMode, resolvedTheme } = useNextTheme();
  const [brand, setBrandState] = useState<Brand>(initialBrand);
  const [density, setDensityState] = useState<Density>(initialDensity);

  const setBrand = React.useCallback((newBrand: Brand) => {
    setBrandState(newBrand);
    document.cookie = `prime-brand=${newBrand}; path=/; max-age=31536000`;
  }, []);

  const setDensity = React.useCallback((newDensity: Density) => {
    setDensityState(newDensity);
    document.cookie = `prime-density=${newDensity}; path=/; max-age=31536000`;
  }, []);

  const setMode = React.useCallback(
    (newMode: Mode | 'system') => {
      setNextThemeMode(newMode);
      document.cookie = `prime-mode=${newMode}; path=/; max-age=31536000`;
    },
    [setNextThemeMode],
  );

  // Determine current effective mode for tokens
  // next-themes can return 'system' for resolvedTheme during SSR before mounting.
  // We MUST enforce it to be either 'light' or 'dark' to prevent token crashes.
  let currentMode = (resolvedTheme as Mode) || 'light';
  if (currentMode !== 'light' && currentMode !== 'dark') {
    currentMode = 'light';
  }

  // Get current raw theme object using the adapter
  const adapterResult = useMemo(() => {
    return useThemeAdapter(brand, currentMode as Mode, density, 'web');
  }, [brand, currentMode, density]);

  // Generate Global CSS for all Mode x Density combinations
  const globalStyles = useMemo(() => {
    const modes: Mode[] = ['light', 'dark'];
    const densities: Density[] = ['comfortable', 'compact', 'spacious'];

    let css = '';

    modes.forEach((m) => {
      densities.forEach((d) => {
        const result = useThemeAdapter(brand, m, d, 'web');
        const selector = `[data-theme='${m}'] .prime-density-${d}, [data-theme='${m}'].prime-density-${d}`;
        const block = (result.webCSSVariables || '').replace(':root', selector);
        css += block + '\n';
      });
    });

    css += `
      :root {
        --font-ibm-plex-sans: 'IBM Plex Sans';
        --font-work-sans: 'Work Sans';
      }
      body {
        font-family: var(--fonts-body);
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--fonts-heading);
      }
    `;

    return css;
  }, [brand]);

  // Apply density class to body
  useEffect(() => {
    const classes = [
      'prime-density-compact',
      'prime-density-comfortable',
      'prime-density-spacious',
    ];
    document.body.classList.remove(...classes);
    document.body.classList.add(`prime-density-${density}`);

    return () => {
      document.body.classList.remove(`prime-density-${density}`);
    };
  }, [density]);

  const value = useMemo<UseThemeResult>(
    () => ({
      theme: adapterResult.theme,
      // We must expose the user's PREFERENCE (e.g., 'system'), not the resolved currentMode,
      // so that UI toggles correctly reflect if 'system' is selected.
      mode: (userPreference as Mode | 'system') || 'system',
      brand,
      density,
      setMode,
      setBrand,
      setDensity,
      isDark: currentMode === 'dark',
    }),
    [adapterResult.theme, userPreference, brand, density, setMode, currentMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeProvider = ({
  children,
  initialBrand = 'classic',
  initialMode,
  initialDensity = 'comfortable',
}: ThemeProviderProps) => {
  return (
    // @ts-ignore
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={initialMode}
      enableSystem
      disableTransitionOnChange
    >
      <InnerProvider initialBrand={initialBrand} initialDensity={initialDensity}>
        {children}
      </InnerProvider>
    </NextThemesProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
