import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanchay ERP",
  description: "Pro grade ERP",
};

import { ThemeProvider } from "@sanchay/theme-provider/web";
import { LinkProvider, ShortcutProvider } from "@sanchay/ui";
import { NextLinkAdapter } from "../providers/NextLinkAdapter";
import { IBM_Plex_Sans, Work_Sans } from "next/font/google";
import "@fontsource/material-icons";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${workSans.variable}`}>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --font-material-icons: 'Material Icons'; }`,
          }}
        />
        <ThemeProvider initialBrand="default" initialMode="system">
          <ShortcutProvider>
            <LinkProvider value={NextLinkAdapter}>{children}</LinkProvider>
          </ShortcutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
