---
name: ERP-FE Classic
colors:
  background: 'hsl(210, 40%, 98%)'
  foreground: 'hsl(222, 22%, 5%)'
  surface: 'hsl(0, 0%, 100%)'
  surface-variant: 'hsl(210, 40%, 96%)'
  surface-hover: 'hsl(0, 0%, 96%)'
  primary: 'hsl(212, 100%, 48%)'
  primary-hover: 'hsl(221, 83%, 48%)'
  primary-foreground: 'hsl(0, 0%, 100%)'
  secondary: 'hsl(210, 40%, 96%)'
  secondary-foreground: 'hsl(222, 22%, 5%)'
  border: 'hsl(214, 32%, 80%)'
  input: 'hsl(214, 32%, 80%)'
  focus-ring: 'hsl(221, 83%, 53%)'
  success: 'hsl(142, 71%, 45%)'
  warning: 'hsl(38, 92%, 50%)'
  danger: 'hsl(0, 84%, 60%)'
  info: 'hsl(199, 89%, 48%)'
  muted: 'hsl(210, 40%, 96%)'
  muted-foreground: 'hsl(215, 16%, 47%)'
typography:
  body-sm:
    fontFamily: var(--font-ibm-plex-sans)
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 1.5
  body-md:
    fontFamily: var(--font-ibm-plex-sans)
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 1.5
  body-lg:
    fontFamily: var(--font-ibm-plex-sans)
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 1.5
  headline-sm:
    fontFamily: var(--font-work-sans)
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 1.2
  headline-md:
    fontFamily: var(--font-work-sans)
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 1.2
  headline-lg:
    fontFamily: var(--font-work-sans)
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 1.2
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  0: 0px
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
---

## ERP-FE Design Guidelines

### Brand & Style
This is the Classic theme for the ERP frontend. It is designed to be clean, modern, and accessible. It uses a light background with high-contrast foreground text.

### Colors
- **Primary Color:** Brand Blue `hsl(212, 100%, 48%)`. Used for primary buttons, active states, and focus rings.
- **Surface:** Clean white `hsl(0, 0%, 100%)` for cards, popovers, and main content areas.
- **Background:** Subtle off-white `hsl(210, 40%, 98%)` to separate canvas from content surfaces.

### Typography
- **Headings:** Work Sans is used for all headings to provide a modern, structural feel.
- **Body:** IBM Plex Sans provides excellent readability for dense data and forms.
- **Mono:** System monospace for code and technical data.

### Spacing & Layout
The spacing scale follows a 4px baseline grid (4px, 8px, 12px, 16px, 24px, 32px, etc.). 
- Standard padding for cards is typically 16px or 24px.
- Use 8px or 12px for gap between elements in a row/column.

### Shapes & Radii
- Forms, inputs, and small buttons use a 6px (`md`) border radius.
- Cards, modals, and larger containers use an 8px (`lg`) or 12px (`xl`) border radius.
