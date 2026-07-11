
import { Theme } from '../../types/theme';
import { colors } from '../../tokens/colors';
import { colorsDark } from '../../tokens/colors-dark';
import { spacing } from '../../tokens/spacing';
import { sizes } from '../../tokens/sizes';
import { fontFamily, fontSize, fontWeight, lineHeight } from '../../tokens/typography';
import { radii } from '../../tokens/radii';
import { shadows } from '../../tokens/shadows';
import { motion } from '../../tokens/motion';
import { zIndex } from '../../tokens/z-index';

const shared = {
    space: spacing,
    sizes,
    fonts: fontFamily,
    fontSizes: fontSize,
    fontWeights: fontWeight,
    lineHeights: lineHeight,
    radii,
    shadows,
    transitions: motion,
    zIndices: zIndex,
};

const light = {
    meta: {
        name: 'ERP Default',
        version: '1.0.0',
        mode: 'light' as const,
    },
    colors, // In a real app we would have light/dark sets. Using the default set for now.
    ...shared,
};

const dark = {
    meta: {
        name: 'ERP Default',
        version: '1.0.0',
        mode: 'dark' as const,
    },
    colors: colorsDark,
    ...shared,
};

export const brand = {
    light,
    dark,
};
