import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prime ERP",
  description: "Pro grade ERP",
};

import { ThemeProvider } from "@prime/theme-provider/web";
import { LinkProvider, ShortcutProvider } from "@prime/ui";
import { NextLinkAdapter } from "../providers/NextLinkAdapter";
import { ApiProvider } from "../providers/ApiProvider";
import { AppLayout } from "./components/AppLayout";
import { IBM_Plex_Sans, Work_Sans } from "next/font/google";
import { cookies } from "next/headers";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const initialBrand = (cookieStore.get("prime-brand")?.value || "classic") as any;
  const initialDensity = (cookieStore.get("prime-density")?.value || "comfortable") as any;
  const initialMode = (cookieStore.get("prime-mode")?.value || "system") as any;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${workSans.variable} prime-density-${initialDensity}`}>
        <ThemeProvider initialBrand={initialBrand} initialMode={initialMode} initialDensity={initialDensity}>
          <ShortcutProvider>
            <ApiProvider>
              <LinkProvider value={NextLinkAdapter}>
                <AppLayout>{children}</AppLayout>
              </LinkProvider>
            </ApiProvider>
          </ShortcutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
