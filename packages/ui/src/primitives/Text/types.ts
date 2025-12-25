import { Theme } from '@sanchay/design-tokens';
import { TextProps as RNTextProps, TextStyle } from 'react-native';

export type TextVariant = keyof Theme['typography']['fontFamily'];
export type TextSize = keyof Theme['typography']['fontSize'];
export type TextWeight = keyof Theme['typography']['fontWeight'];
export type TextColor = keyof Theme['colors'];
export type TextAlign = TextStyle['textAlign'];

export interface TextProps extends RNTextProps {
  /**
   * Theme variant for font family.
   * @default 'body'
   */
  variant?: TextVariant;
  
  /**
   * Font size from the theme.
   * @default 'md'
   */
  size?: TextSize;
  
  /**
   * Font weight from the theme.
   * @default 'regular'
   */
  weight?: TextWeight;
  
  /**
   * Text alignment.
   */
  align?: TextAlign;
  
  /**
   * Color key from the theme or a raw color string.
   * @default 'foreground'
   */
  color?: TextColor | string;
  
  /**
   * If true, truncates text to a single line using ellipsis.
   * Shortcut for numberOfLines={1} ellipsizeMode="tail"
   */
  truncate?: boolean;
}
