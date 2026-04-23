import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalAIAssistant from "@/components/GlobalAIAssistant";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "react-hot-toast";
import { getSiteSettings, getSiteUrl } from "@/lib/site-content";

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
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://devmindstudio.vercel.app"
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.ownerName,
    description:
      "Premium software development agency specializing in custom web apps, SaaS platforms, and mobile applications.",
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/favicon.ico`,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: settings.city,
      addressRegion: "Gujarat",
      postalCode: "380015",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.phone,
      contactType: "customer service",
      email: settings.email,
    },
    sameAs: [
      settings.socialLinks.github,
      settings.socialLinks.linkedin,
      settings.socialLinks.twitter,
      settings.socialLinks.instagram,
    ],
    priceRange: "₹₹₹",
    areaServed: "Worldwide",
    serviceType: [
      "Custom Software Development",
      "SaaS Platform Development",
      "Web Application Development",
      "Mobile App Development",
      "AI Solutions",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} min-h-full flex flex-col font-sans transition-colors duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
          <GlobalAIAssistant settings={settings} />
          <CookieConsent />
          <Toaster position="top-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
