import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalAIAssistant from "@/components/GlobalAIAssistant";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";

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
    "mobile app development",
    "AI solutions",
  ],
  authors: [{ name: "DevMind Studio" }],
  creator: "DevMind Studio",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://devmindstudio.vercel.app"
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

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DevMind Studio",
  description:
    "Premium software development agency specializing in custom web apps, SaaS platforms, and mobile applications.",
  url: "https://devmindstudio.vercel.app",
  logo: "https://devmindstudio.vercel.app/favicon.ico",
  address: {
    "@type": "PostalAddress",
    streetAddress: "SG Highway",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380015",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98765-43210",
    contactType: "customer service",
    email: "contact@devmindstudio.com",
  },
  sameAs: [
    "https://github.com/devmindstudio",
    "https://linkedin.com/company/devmindstudio",
    "https://twitter.com/devmindstudio",
  ],
  priceRange: "₹₹₹",
  areaServed: "Worldwide",
  serviceType: [
    "Custom Software Development",
    "SaaS Platform Development",
    "Web Application Development",
    "Mobile App Development",
    "UI/UX Design",
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300 bg-white text-gray-900 dark:bg-[#030712] dark:text-gray-50">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <GlobalAIAssistant />
          <CookieConsent />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
