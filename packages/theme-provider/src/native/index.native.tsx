import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useThemeAdapter } from '@prime/theme-adapters';
import { Brand, Mode, Density } from '@prime/design-tokens';
import { ThemeProviderProps, UseThemeResult } from '../types';

const ThemeContext = createContext<UseThemeResult | null>(null);

export const ThemeProvider = ({ children, initialBrand = 'classic', initialMode = 'system', initialDensity = 'comfortable' }: ThemeProviderProps) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<Mode | 'system'>(initialMode as Mode | 'system');
  const [brand, setBrand] = useState<Brand>(initialBrand);
  const [density, setDensity] = useState<Density>(initialDensity);
  
  console.log('[ThemeProvider] Initializing with', { initialBrand, initialMode, initialDensity });

  const currentMode = useMemo<Mode>(() => {
    if (mode === 'system') {
      return (systemScheme === 'dark' ? 'dark' : 'light');
    }
    return mode;
  }, [mode, systemScheme]);

  const adapterResult = useMemo(() => {
    return useThemeAdapter(brand, currentMode, density, 'native');
  }, [brand, currentMode, density]);

  const value = useMemo<UseThemeResult>(() => ({
    theme: adapterResult.nativeTheme || adapterResult.theme,
    mode: currentMode,
    brand,
    density,
    setMode: (m: Mode | 'system') => setMode(m),
    setBrand,
    setDensity,
    isDark: currentMode === 'dark',
  }), [adapterResult, currentMode, brand, density]);

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
