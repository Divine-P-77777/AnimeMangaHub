import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AnimeMangaHub | Discover Your Next Favorite Anime",
  description: "Explore curated anime blogs, manga breakdowns, and get personalized AI recommendations.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "AnimeMangaHub | Discover Your Next Favorite Anime",
    description: "Deep dives, anime theories, and AI-powered recommendations.",
    siteName: "AnimeMangaHub",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "AnimeMangaHub Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeMangaHub",
    description: "Deep dives, anime theories, and AI-powered recommendations.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
