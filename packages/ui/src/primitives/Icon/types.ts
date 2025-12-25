import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IconProps {
  /**
   * The name of the icon.
   * For usage, see: https://fonts.google.com/icons
   */
  name: string; // We use string to support both potential generic string and literal types. Ideally this should be a union.

  /**
   * Size of the icon.
   * @default 24
   */
  size?: number;

  /**
   * Color of the icon.
   */
  color?: string;

  /**
   * Additional CSS classes (Web only).
   */
  className?: string;

  /**
   * Style object.
   * For Web: React.CSSProperties
   * For Native: StyleProp<TextStyle>
   */
  style?: any; 
}
