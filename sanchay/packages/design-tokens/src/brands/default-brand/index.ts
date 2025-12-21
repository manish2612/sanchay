
import { Theme } from '../../types/theme';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontFamily, fontSize, fontWeight, lineHeight } from '../../tokens/typography';
import { radii } from '../../tokens/radii';
import { shadows } from '../../tokens/shadows';
import { motion } from '../../tokens/motion';
import { zIndex } from '../../tokens/z-index';

const shared = {
    spacing,
    typography: {
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
    },
    radii,
    shadows,
    motion,
    zIndex,
};

const light: Theme = {
    meta: {
        name: 'ERP Default',
        version: '1.0.0',
        mode: 'light',
    },
    colors, // In a real app we would have light/dark sets. Using the default set for now.
    ...shared,
};

const dark: Theme = {
    meta: {
        name: 'ERP Default',
        version: '1.0.0',
        mode: 'dark',
    },
    colors, // Placeholder: in reality, override with dark tokens
    ...shared,
};

export const brand = {
    light,
    dark,
};
