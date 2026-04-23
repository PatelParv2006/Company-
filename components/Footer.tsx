"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/site-content";

type FooterProps = {
  settings: SiteSettings;
};

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer({ settings }: FooterProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const socialLinks = [
    { href: settings.socialLinks.github, label: "GitHub", icon: GithubIcon },
    { href: settings.socialLinks.linkedin, label: "LinkedIn", icon: LinkedinIcon },
    { href: settings.socialLinks.twitter, label: "Twitter", icon: TwitterIcon },
    { href: settings.socialLinks.instagram, label: "Instagram", icon: InstagramIcon },
  ];

  const navColumns = [
    {
      title: "Company",
      links: [
        { href: "/about", label: "About" },
        { href: "/projects", label: "Projects" },
        { href: "/blog", label: "Blog" },
        { href: "/careers", label: "Careers" },
      ],
    },
    {
      title: "Explore",
      links: [
        { href: "/services", label: "Services" },
        { href: "/estimator", label: "Estimator" },
        { href: "/contact", label: "Contact" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05060c] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
      <div className="absolute -top-10 left-1/4 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:flex md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">
              Build With Confidence
            </p>
            <h2 className="text-3xl font-heading font-bold text-white md:text-4xl">
              Ready to turn a product idea into production-ready software?
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Tell us what you&apos;re building and we&apos;ll help shape the right roadmap, stack, and delivery plan.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-glow mt-6 inline-flex rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 font-semibold text-white md:mt-0"
          >
            Get Quote
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 font-heading text-lg font-bold text-white shadow-lg shadow-blue-500/30">
                D
              </span>
              <span className="font-heading text-2xl font-bold text-white">DevMind Studio</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              DevMind Studio designs and engineers premium web apps, SaaS products, mobile experiences, and AI-enabled workflows for ambitious teams.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {navColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-heading text-lg font-bold text-white">{column.title}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-heading text-lg font-bold text-white">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-blue-300" />
                <a href={`mailto:${settings.email}`} className="transition hover:text-white">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-blue-300" />
                <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="transition hover:text-white">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-blue-300" />
                <span>{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} DevMind Studio. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
