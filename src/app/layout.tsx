import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CodeCritters - Learn Coding!",
  description:
    "A fun, interactive app that teaches children aged 6-8 programming through block-based coding with an AI tutor companion.",
  keywords: ["kids coding", "learn programming", "block coding", "education"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-nunito)] antialiased">
        {children}
      </body>
    </html>
  );
}
