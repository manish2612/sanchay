
export * from './types/theme';
export * from './tokens/colors';
export * from './tokens/spacing';
export * from './tokens/typography';
export * from './tokens/radii';
export * from './tokens/shadows';
export * from './tokens/motion';
export * from './tokens/z-index';

import { brand as defaultBrand } from './brands/default-brand';
import { Theme } from './types/theme';

const brands = {
    default: defaultBrand,
};

export type Brand = keyof typeof brands;
export type Mode = 'light' | 'dark';

export const getTheme = (brand: Brand, mode: Mode): Theme => {
    return brands[brand][mode];
};
