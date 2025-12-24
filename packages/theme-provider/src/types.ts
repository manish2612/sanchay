import { Brand, Mode, Theme, Density } from '@sanchay/design-tokens';

export interface ThemeProviderProps {
    children: React.ReactNode;
    initialBrand?: Brand;
    initialMode?: Mode | 'system';
    initialDensity?: Density;
}

export interface UseThemeResult {
    theme: Theme; // The raw theme object (or native theme object on native)
    mode: Mode;
    brand: Brand;
    density: Density;
    setMode: (mode: Mode | 'system') => void;
    setBrand: (brand: Brand) => void;
    setDensity: (density: Density) => void;
    isDark: boolean;
}
