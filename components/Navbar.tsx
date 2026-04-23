"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Hide navbar on admin pages (admin has its own layout)
  if (pathname.startsWith("/admin")) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Estimator", href: "/estimator" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        scrolled
          ? "glass-nav"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <Link href="/" className="font-heading font-bold text-xl text-[var(--text-primary)]">
              DevMind <span className="text-blue-500">Studio</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-[var(--accent-blue)] bg-[color:color-mix(in_oklab,var(--accent-blue)_12%,transparent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[color:color-mix(in_oklab,var(--bg-tertiary)_65%,transparent)]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-[color:color-mix(in_oklab,var(--bg-tertiary)_70%,transparent)] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-[var(--text-secondary)] hover:text-yellow-400 transition-colors" />
                ) : (
                  <Moon className="w-5 h-5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" />
                )}
              </button>
            )}
            <Link
              href="/contact"
              className="btn-glow bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-[color:color-mix(in_oklab,var(--bg-tertiary)_70%,transparent)]"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-[var(--text-secondary)]" />
                ) : (
                  <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[color:color-mix(in_oklab,var(--bg-tertiary)_70%,transparent)]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden glass-nav shadow-2xl"
          >
            <div className="px-4 pt-3 pb-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "text-[var(--accent-blue)] bg-[color:color-mix(in_oklab,var(--accent-blue)_10%,transparent)]"
                        : "text-[var(--text-secondary)] hover:bg-[color:color-mix(in_oklab,var(--bg-tertiary)_65%,transparent)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3">
                <Link
                  href="/contact"
                  className="w-full block text-center btn-glow bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-base font-medium"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
