
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { sizes } from '../tokens/sizes';
import { fontFamily, fontSize, fontWeight, lineHeight } from '../tokens/typography';
import { radii } from '../tokens/radii';
import { shadows } from '../tokens/shadows';
import { motion } from '../tokens/motion';
import { zIndex } from '../tokens/z-index';

export interface Theme {
    meta: {
        name: string;
        version: string;
        mode: 'light' | 'dark';
    };
    colors: typeof colors;
    space: typeof spacing['comfortable'];
    sizes: typeof sizes['comfortable'];
    fonts: typeof fontFamily;
    fontSizes: typeof fontSize;
    fontWeights: typeof fontWeight;
    lineHeights: typeof lineHeight;
    radii: typeof radii;
    shadows: typeof shadows;
    transitions: typeof motion;
    zIndices: typeof zIndex;
}
