import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useThemeAdapter } from '@sanchay/theme-adapters';
import { Brand, Mode } from '@sanchay/design-tokens';
import { ThemeProviderProps, UseThemeResult } from '../types';

const ThemeContext = createContext<UseThemeResult | null>(null);

export const ThemeProvider = ({ children, initialBrand = 'default', initialMode = 'system' }: ThemeProviderProps) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<Mode | 'system'>(initialMode as Mode | 'system');
  const [brand, setBrand] = useState<Brand>(initialBrand);
  console.log('[ThemeProvider] Initializing with', { initialBrand, initialMode });

  const currentMode = useMemo<Mode>(() => {
    if (mode === 'system') {
      return (systemScheme === 'dark' ? 'dark' : 'light');
    }
    return mode;
  }, [mode, systemScheme]);

  const adapterResult = useMemo(() => {
    return useThemeAdapter(brand, currentMode, 'native');
  }, [brand, currentMode]);

  const value = useMemo<UseThemeResult>(() => ({
    theme: adapterResult.nativeTheme || adapterResult.theme,
    mode: currentMode,
    brand,
    setMode: (m: Mode | 'system') => setMode(m),
    setBrand,
    isDark: currentMode === 'dark',
  }), [adapterResult, currentMode, brand]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
