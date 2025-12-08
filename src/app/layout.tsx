import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Raijin Tech Solutions - Software Developer",
  description: "A modern, dynamic portfolio showcasing software development skills and projects.",
  keywords: ["portfolio", "software developer", "web development", "react", "nextjs", "raijin tech"],
  authors: [{ name: "Raijin Tech Solutions" }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: "Raijin Tech Solutions - Software Developer",
    description: "A modern, dynamic portfolio showcasing software development skills and projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raijin Tech Solutions - Software Developer",
    description: "A modern, dynamic portfolio showcasing software development skills and projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
