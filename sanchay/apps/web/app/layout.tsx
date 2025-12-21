import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanchay ERP',
  description: 'Pro grade ERP',
};

import { ThemeProvider } from '@sanchay/theme-provider/web';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider initialBrand="default" initialMode="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
