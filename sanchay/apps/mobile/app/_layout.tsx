import { Slot } from 'expo-router';
import { ThemeProvider } from '@sanchay/theme-provider';

export default function Layout() {
  return (
    <ThemeProvider initialBrand="default" initialMode="system">
      <Slot />
    </ThemeProvider>
  );
}
