export const colorsDark = {
  // Base — correct elevation hierarchy: background is darkest, surfaces get lighter
  background: '#0D1B2A', // True dark canvas (was #001F3F — too blue, now neutral dark navy)
  foreground: '#F6F7ED', // Praxeti White

  // Surfaces — each level lighter than the one below (elevation hierarchy)
  surface: '#152232', // Card/panel level — lighter than background ✓
  surfaceVariant: '#1C2E40', // Section headers, table headers — lighter than surface ✓
  surfaceVariantForeground: '#F6F7ED',
  popover: '#1C2E40',
  popoverForeground: '#F6F7ED',
  surfaceHover: '#1F3347', // Hover state — distinct from surfaceVariant ✓
  surfaceActive: '#243C54', // Pressed/active state — distinct from hover ✓
  surfaceBorder: '#2A4560', // Visible border, not noisy

  // Primary - Picture Book Green (unchanged — brand color must stay consistent)
  primary: '#00804C',
  primaryHover: '#00995B', // Lighter for hover in dark mode
  primaryActive: '#00B36B',
  primaryForeground: '#FFFFFF',

  // Secondary - Mantis
  secondary: '#74C365',
  secondaryHover: '#89D17B',
  secondaryForeground: '#001F3F',

  // Neutral
  muted: '#1C2E40',
  mutedForeground: '#8A9BA8',

  // Borders / Focus
  border: '#2A4560', // Clear visible border (was #004080 — too saturated blue)
  input: '#2A4560',
  focusRing: '#DBE64C', // First Colors of Spring — stays identical (high contrast glow)

  // States
  disabled: '#1C2E40',
  disabledForeground: '#5C6E80',
  outline: '#243C54',

  // Semantic (hue unchanged, lightness tuned for dark bg readability)
  success: '#74C365', // Mantis
  successForeground: '#001F3F',
  warning: '#DBE64C', // First Colors of Spring
  warningForeground: '#001F3F',
  danger: '#E74C3C',
  dangerForeground: '#FFFFFF',
  info: '#3498DB',
  infoForeground: '#FFFFFF',

  // Sidebar Custom
  sidebarAvatarBg: '#DBE64C',
  sidebarAvatarText: '#001F3F',
};
