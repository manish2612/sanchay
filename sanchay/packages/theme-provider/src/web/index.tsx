"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { useThemeAdapter } from '@sanchay/theme-adapters';
import { Brand, Mode } from '@sanchay/design-tokens';
import { ThemeProviderProps, UseThemeResult } from '../types';

const ThemeContext = createContext<UseThemeResult | null>(null);

const InnerProvider = ({ children, initialBrand }: { children: React.ReactNode, initialBrand: Brand }) => {
  const { theme: mode, setTheme: setMode, resolvedTheme } = useNextTheme();
  const [brand, setBrand] = useState<Brand>(initialBrand);

  // Determine current effective mode
  const currentMode = (resolvedTheme as Mode) || 'light';

  // Get current raw theme object using the adapter
  const adapterResult = useMemo(() => {
    return useThemeAdapter(brand, currentMode, 'web');
  }, [brand, currentMode]);

  // Generate Global CSS for both modes (light/dark) for the current brand
  // This ensures no FOUC when toggling modes, as styes are pre-injected.
  const globalStyles = useMemo(() => {
    const light = useThemeAdapter(brand, 'light', 'web');
    const dark = useThemeAdapter(brand, 'dark', 'web');

    // Replace ':root' with specific selectors used by next-themes
    // next-themes uses data-theme="light" or data-theme="dark" on the html element
    const cssLight = (light.webCSSVariables || '').replace(':root', ':root[data-theme="light"]');
    const cssDark = (dark.webCSSVariables || '').replace(':root', ':root[data-theme="dark"]');

    return `${cssLight}\n${cssDark}`;
  }, [brand]);

  const value = useMemo<UseThemeResult>(() => ({
    theme: adapterResult.theme,
    mode: currentMode,
    brand,
    setMode: (m: Mode | 'system') => setMode(m),
    setBrand,
    isDark: currentMode === 'dark',
  }), [adapterResult.theme, currentMode, brand, setMode]);

  return (
    <ThemeContext.Provider value={value}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeProvider = ({ children, initialBrand = 'default', initialMode }: ThemeProviderProps) => {
  return (
    // @ts-ignore
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={initialMode}
      enableSystem
      disableTransitionOnChange
    >
      <InnerProvider initialBrand={initialBrand}>
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
