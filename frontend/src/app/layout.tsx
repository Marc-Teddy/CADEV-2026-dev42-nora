import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/i18n";
import { CustomCursor } from "@/components/nora/fx/cursor";
import { SmoothScroll } from "@/components/nora/fx/lenis";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NORA — La plateforme des développeurs africains",
  description:
    "NORA réunit les développeurs africains au même endroit : profil-portfolio vivant, projets, salons en temps réel, challenges, mentorat et missions rémunérées en Mobile Money. De l'idée au projet déployé.",
  keywords: [
    "NORA",
    "développeurs africains",
    "hackathon",
    "communauté tech Afrique",
    "challenges de code",
    "Mobile Money",
  ],
  authors: [{ name: "Équipe dev42" }],
  openGraph: {
    title: "NORA — La plateforme des développeurs africains",
    description:
      "Apprendre, créer, collaborer et se faire connaître, au même endroit.",
    siteName: "NORA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <LanguageProvider>
            <SmoothScroll />
            <CustomCursor />
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
