import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'dark',
    // Typography
    fontBase: '"Inter", sans-serif',
    fontCode: 'monospace',

    brandTitle: 'Storybook',
    brandUrl: '/',
    brandTarget: '_self',

    // Colors
    colorPrimary: '#129153',
    colorSecondary: '#129153',

    // UI
    appBg: '#0f172a',
    appContentBg: '#16212e',
    appPreviewBg: '#1e2a38',
    appBorderColor: '#2c3d50',
    appBorderRadius: 4,

    // Text colors
    textColor: '#ffffff',
    textInverseColor: '#ffffff',

    // Toolbar default and active colors
    barTextColor: '#94a3b8',
    barSelectedColor: '#129153',
    barHoverColor: '#ffffff',
    barBg: '#0f172a',

    // Form colors
    inputBg: '#1e2a38',
    inputBorder: '#2c3d50',
    inputTextColor: '#ffffff',
    inputBorderRadius: 4,
  }),
});
