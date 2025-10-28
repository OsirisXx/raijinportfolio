import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio - Software Developer",
  description: "A modern, dynamic portfolio showcasing software development skills and projects.",
  keywords: ["portfolio", "software developer", "web development", "react", "nextjs"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Portfolio - Software Developer",
    description: "A modern, dynamic portfolio showcasing software development skills and projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Software Developer",
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
