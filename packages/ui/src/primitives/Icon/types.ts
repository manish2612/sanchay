import { icons } from 'lucide-react';

export type IconName = keyof typeof icons;

export interface IconProps {
  /**
   * The name of the icon.
   * For usage, see: https://lucide.dev/icons/
   */
  name: IconName;

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
