export * from './types/theme';
export * from './themes/classic/colors';
export * from './tokens/spacing';
export * from './tokens/typography';
export * from './tokens/radii';
export * from './tokens/shadows';
export * from './tokens/motion';
export * from './tokens/z-index';

import { brand as classicTheme } from './themes/classic';
import { brand as vibrantOrangeTheme } from './themes/vibrant-orange';
import { brand as prosperityGreenTheme } from './themes/prosperity-green';
import { brand as executiveBlueTheme } from './themes/executive-blue';
import { Theme } from './types/theme';

const brands = {
  classic: classicTheme,
  'vibrant-orange': vibrantOrangeTheme,
  'prosperity-green': prosperityGreenTheme,
  'executive-blue': executiveBlueTheme,
};

export type Brand = keyof typeof brands;
export type Mode = 'light' | 'dark';
export type Density = 'comfortable' | 'compact' | 'spacious';

export const getTheme = (brand: Brand, mode: Mode, density: Density = 'comfortable'): Theme => {
  // Fallback to classic if an unknown brand is provided
  const themeBrand = brands[brand] || brands['classic'];
  const rawTheme = themeBrand[mode];

  // Resolve Spacing
  const resolvedSpacing = rawTheme.space[density] || rawTheme.space.comfortable;

  // Resolve Sizes
  const resolvedSizes = rawTheme.sizes[density] || rawTheme.sizes.comfortable;

  return {
    ...rawTheme,
    space: resolvedSpacing,
    sizes: resolvedSizes,
  };
};
