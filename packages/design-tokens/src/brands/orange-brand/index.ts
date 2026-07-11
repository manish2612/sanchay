
import { colorsOrangeLight, colorsOrangeDark } from '../../tokens/colors-orange';
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
        name: 'Orange Brand',
        version: '1.0.0',
        mode: 'light' as const,
    },
    colors: colorsOrangeLight,
    ...shared,
};

const dark = {
    meta: {
        name: 'Orange Brand',
        version: '1.0.0',
        mode: 'dark' as const,
    },
    colors: colorsOrangeDark,
    ...shared,
};

export const brand = {
    light,
    dark,
};
