export type AnimationMode = 'slide' | 'fade';

export interface AnimatedNumberProps {
  /** The target numeric value to display. */
  value: number;

  /**
   * Visual animation style.
   * @default 'slide'
   */
  mode?: AnimationMode;

  /**
   * Options for formatting the number, compatible with Intl.NumberFormat.
   * Enables complete flexibility for currencies, percentages, and decimals
   * without tying the component to a single locale or currency by default.
   */
  formatOptions?: Intl.NumberFormatOptions;

  /**
   * Locale for number formatting. If omitted, falls back to the browser default,
   * allowing it to adapt to whatever user settings are in place.
   */
  locale?: string | string[];

  /**
   * Duration of the full animation in milliseconds.
   * @default 500
   */
  duration?: number;

  /**
   * Additional delay in milliseconds before the animation starts.
   * This is added to the calculated stagger delay for each character.
   * @default 0
   */
  delay?: number;

  /**
   * Additional CSS class name applied to the outer wrapper.
   */
  className?: string;
}
