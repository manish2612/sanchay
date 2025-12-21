import { Brand, Mode, Theme } from '@sanchay/design-tokens';

export interface ThemeProviderProps {
    children: React.ReactNode;
    initialBrand?: Brand;
    initialMode?: Mode | 'system';
}

export interface UseThemeResult {
    theme: Theme; // The raw theme object (or native theme object on native)
    mode: Mode;
    brand: Brand;
    setMode: (mode: Mode | 'system') => void;
    setBrand: (brand: Brand) => void;
    isDark: boolean;
}
