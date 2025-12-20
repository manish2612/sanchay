import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanchay ERP',
  description: 'Pro grade ERP',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
