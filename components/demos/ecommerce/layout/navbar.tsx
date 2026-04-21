"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Menu, Heart, X, Search } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/demos/ecommerce/ThemeToggle"
import { CartDrawer } from "@/components/demos/ecommerce/CartDrawer"
import { FavoriteDrawer } from "@/components/demos/ecommerce/FavoriteDrawer"
import { useCartStore, useCartTotalItems } from "@/lib/demos/ecommerce/stores/cartStore"
import { useFavoriteStore } from "@/lib/demos/ecommerce/stores/favoriteStore"
import { usePathname } from "next/navigation"
import { PRODUCTS } from "@/lib/demos/ecommerce/products"

export function Navbar() {
  const isCartOpen = useCartStore((s) => s.isCartOpen)
  const setCartOpen = useCartStore((s) => s.setCartOpen)
  const [isFavoriteOpen, setIsFavoriteOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const totalItems = useCartTotalItems()
  const favorites = useFavoriteStore((s) => s.favorites)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  // Search results filtering
  const searchResults = searchQuery.length > 1 
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  // Close everything on Escape key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false)
        setIsSearchOpen(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // Close mobile menu and search on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
    setSearchQuery("")
  }, [pathname])

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(var(--color-background-rgb), 0)", "rgba(var(--color-surface-rgb), 0.7)"]
  )
  const backdropBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(20px)"])
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ["1px solid transparent", "1px solid var(--color-border)"]
  )

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/admin", label: "Admin Demo" },
  ]

  return (
    <>
      <motion.nav
        style={{ 
          backgroundColor, 
          backdropFilter: backdropBlur, 
          borderBottom,
          paddingTop: 'env(safe-area-inset-top)'
        }}
        className="fixed top-0 w-full z-40 transition-colors duration-300 h-20 md:h-24 flex items-center"
      >
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/projects/ecommerce-demo" className="text-xl font-bold tracking-tight text-foreground min-w-[44px] min-h-[44px] flex items-center">
              Digital Curator.
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-foreground transition-colors min-h-[44px] flex items-center ${pathname === link.href ? "text-foreground" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            <button
              className="p-2 text-foreground hover:bg-surface-low rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>

            <button
              className="p-2 text-foreground hover:bg-surface-low rounded-full transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsFavoriteOpen(true)}
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-primary text-[10px] font-bold text-white rounded-full flex items-center justify-center px-1">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              id="cart-icon-target"
              className="p-2 text-foreground hover:bg-surface-low rounded-full transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setCartOpen(true)}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-primary text-[10px] font-bold text-white rounded-full flex items-center justify-center px-1">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="p-2 text-foreground hover:bg-surface-low rounded-full transition-colors md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Input Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-surface-lowest border-b border-border shadow-2xl p-6 z-50"
            >
              <div className="container mx-auto max-w-2xl relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 bg-surface-low rounded-2xl pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                
                {searchResults.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Top Results</p>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/projects/ecommerce-demo/product/${product.id}`}
                        className="flex items-center gap-4 p-2 hover:bg-surface-low rounded-xl transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-highest flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category} • ${product.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md md:hidden"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-[320px] z-[60] bg-surface-lowest shadow-2xl md:hidden flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Digital Curator.
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-surface-low rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-2xl font-bold transition-colors min-h-[44px] flex items-center ${pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-border space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                  <ThemeToggle />
                </div>
                <div className="text-xs text-muted-foreground">
                  © 2026 Digital Curator. All rights reserved.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      <FavoriteDrawer isOpen={isFavoriteOpen} onClose={() => setIsFavoriteOpen(false)} />
    </>
  )
}
