import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { GlassNav } from "@/components/layout/GlassNav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TECH LAB | Precision Tactility",
  description:
    "以工业级精度解构软件工程。技术深潜、项目实战与思考记录。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <div className="grain-overlay fixed inset-0 z-[100]" />
        <GlassNav />
        <main className="pt-16 min-h-screen flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
