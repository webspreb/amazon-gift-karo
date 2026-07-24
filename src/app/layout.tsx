import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getActiveSeason } from "@/lib/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GiftKaro — Unique Gift Ideas for Every Occasion",
    template: "%s | GiftKaro",
  },
  description: "Discover thoughtful, unexpected gift ideas for Indian festivals, birthdays, anniversaries and more. Curated picks for every budget.",
  openGraph: {
    title: "GiftKaro — Unique Gift Ideas for Every Occasion",
    description: "Discover thoughtful, unexpected gift ideas for Indian festivals, birthdays, anniversaries and more.",
    siteName: "GiftKaro",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GiftKaro — Unique Gift Ideas",
    description: "Discover thoughtful, unexpected gift ideas for Indian festivals and occasions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const season = getActiveSeason();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header theme={{ primary: season.colors.primary, secondary: season.colors.secondary }} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
