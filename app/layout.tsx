import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalAIAssistant from "@/components/GlobalAIAssistant";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevMind Studio | Custom Software Development",
    template: "%s | DevMind Studio",
  },
  description:
    "DevMind Studio engineers high-performance custom software, SaaS platforms, and web applications using Next.js, React, and cloud architecture — built for startups and growing businesses.",
  keywords: [
    "custom software development",
    "SaaS development",
    "web application",
    "Next.js",
    "React",
    "UI/UX design",
    "DevMind Studio",
    "software agency India",
  ],
  authors: [{ name: "DevMind Studio" }],
  creator: "DevMind Studio",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://devmindstudio.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DevMind Studio",
    title: "DevMind Studio | Custom Software Development",
    description:
      "Custom Software, SaaS Platforms & Web Applications Built for Growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevMind Studio | Custom Software Development",
    description:
      "Custom Software, SaaS Platforms & Web Applications Built for Growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300 bg-white text-gray-900 dark:bg-[#0b0f19] dark:text-gray-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <GlobalAIAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
