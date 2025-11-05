import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./[locale]/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iKafil — Premium Pre-Owned Apple Marketplace",
  description:
    "iKafil is a premier marketplace specializing in certified pre-owned Apple products. Buy high-quality, inspected MacBooks and iPhones at competitive prices.",
  keywords: [
    "Apple marketplace",
    "buy used macbook",
    "used iphone uzbekistan",
    "pre-owned apple",
    "macbook shop",
    "iphone shop",
    "iKafil apple market",
  ],
  openGraph: {
    title: "iKafil — Premium Pre-Owned Apple Marketplace",
    description:
      "Buy high-quality, certified pre-owned Apple products. Carefully inspected Apple MacBooks and iPhones at competitive prices.",
    url: "https://ikafil.uz",
    siteName: "iKafil",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
