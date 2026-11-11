import type { Metadata, Viewport } from "next";
/* polices variables embarquées (aucun appel réseau au build) */
import "@fontsource-variable/sora";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/nora/fx/lenis";

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
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  openGraph: {
    title: "NORA — La plateforme des développeurs africains",
    description:
      "Apprendre, créer, collaborer et se faire connaître, au même endroit.",
    siteName: "NORA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0912",
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
        className="antialiased bg-background text-foreground"
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <LanguageProvider>
            <SmoothScroll />
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
