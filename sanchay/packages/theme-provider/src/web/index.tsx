"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { useThemeAdapter } from '@sanchay/theme-adapters';
import { Brand, Mode, Density } from '@sanchay/design-tokens';
import { ThemeProviderProps, UseThemeResult } from '../types';

const ThemeContext = createContext<UseThemeResult | null>(null);

const InnerProvider = ({ children, initialBrand, initialDensity }: { children: React.ReactNode, initialBrand: Brand, initialDensity: Density }) => {
  const { theme: mode, setTheme: setMode, resolvedTheme } = useNextTheme();
  const [brand, setBrand] = useState<Brand>(initialBrand);
  const [density, setDensity] = useState<Density>(initialDensity);

  // Determine current effective mode
  const currentMode = (resolvedTheme as Mode) || 'light';

  // Get current raw theme object using the adapter
  const adapterResult = useMemo(() => {
    return useThemeAdapter(brand, currentMode, density, 'web');
  }, [brand, currentMode, density]);

  // Generate Global CSS for all Mode x Density combinations
  const globalStyles = useMemo(() => {
    const modes: Mode[] = ['light', 'dark'];
    const densities: Density[] = ['comfortable', 'compact', 'spacious'];
    
    let css = '';

    modes.forEach(m => {
        densities.forEach(d => {
            const result = useThemeAdapter(brand, m, d, 'web');
            // Selector strategy:
            // [data-theme='light'] .sanchay-density-comfortable
            // And also handle the case where the class is on the body/html itself if needed,
            // but standard nesting rules apply.
            // Note: next-themes applies data-theme to HTML.
            // We apply density class to a wrapper or body.
            
            // Selector: Inside a matching theme container, find the density class OR if the density class IS the container.
            // Broadest selector logic:
            const selector = `[data-theme='${m}'] .sanchay-density-${d}, [data-theme='${m}'].sanchay-density-${d}`;
            
            // Special case for Default Density (Comfortable) - make it the default for the theme if no density class is present?
            // Actually, for simplicity, we REQUIRE the density class. 
            // The InnerProvider will wrap children in the active density class.
            
            const block = (result.webCSSVariables || '').replace(':root', selector);
            css += block + '\n';
        });
    });

    return css;
  }, [brand]);

  const value = useMemo<UseThemeResult>(() => ({
    theme: adapterResult.theme,
    mode: currentMode,
    brand,
    density,
    setMode: (m: Mode | 'system') => setMode(m),
    setBrand,
    setDensity,
    isDark: currentMode === 'dark',
  }), [adapterResult.theme, currentMode, brand, density, setMode]);

  return (
    <ThemeContext.Provider value={value}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className={`sanchay-density-${density}`} style={{ display: 'contents' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const ThemeProvider = ({ children, initialBrand = 'default', initialMode, initialDensity = 'comfortable' }: ThemeProviderProps) => {
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
