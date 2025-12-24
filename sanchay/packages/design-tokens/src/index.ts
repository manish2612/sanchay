
export * from './types/theme';
export * from './tokens/colors';
export * from './tokens/spacing';
export * from './tokens/typography';
export * from './tokens/radii';
export * from './tokens/shadows';
export * from './tokens/motion';
export * from './tokens/z-index';

import { brand as defaultBrand } from './brands/default-brand';
import { brand as orangeBrand } from './brands/orange-brand';
import { Theme } from './types/theme';

const brands = {
    default: defaultBrand,
    orange: orangeBrand,
};

export type Brand = keyof typeof brands;
export type Mode = 'light' | 'dark';
export type Density = 'comfortable' | 'compact' | 'spacious';

export const getTheme = (brand: Brand, mode: Mode, density: Density = 'comfortable'): Theme => {
    const rawTheme = brands[brand][mode];

    // Resolve Spacing
    const resolvedSpacing = rawTheme.spacing[density] || rawTheme.spacing.comfortable;

    // Resolve Sizes
    const resolvedSizes = rawTheme.sizes[density] || rawTheme.sizes.comfortable;

    return {
        ...rawTheme,
        spacing: resolvedSpacing,
        sizes: resolvedSizes,
    };
};
