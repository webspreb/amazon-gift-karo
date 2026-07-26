import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CuratedGift — Unique Gift Ideas for Every Occasion",
    template: "%s | CuratedGift",
  },
  description: "Discover thoughtful, unexpected gift ideas for Indian festivals, birthdays, anniversaries and more. Curated picks for every budget.",
  openGraph: {
    title: "CuratedGift — Unique Gift Ideas for Every Occasion",
    description: "Discover thoughtful, unexpected gift ideas for Indian festivals, birthdays, anniversaries and more.",
    siteName: "CuratedGift",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CuratedGift — Unique Gift Ideas",
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
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GiftKaro",
              "alternateName": "CuratedGift",
              "url": "https://giftkaro.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://giftkaro.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('giftkaro-theme');
                  if (saved && saved !== 'default') {
                    document.documentElement.dataset.theme = saved;
                  } else {
                    var today = new Date();
                    var mmdd = ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
                    var theme = '';
                    if (mmdd >= '10-15' && mmdd <= '11-05') theme = 'diwali';
                    else if (mmdd >= '12-01' && mmdd <= '12-26') theme = 'christmas';
                    else if (mmdd >= '02-01' && mmdd <= '02-15') theme = 'valentines';
                    if (theme) document.documentElement.dataset.theme = theme;
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
