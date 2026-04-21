"use client"

import * as React from "react"
import { Navbar } from "@/components/demos/ecommerce/layout/navbar"
import { Footer } from "@/components/demos/ecommerce/layout/footer"
import { ProductCard } from "@/components/demos/ecommerce/shared/ProductCard"
import { useFavoriteStore } from "@/lib/demos/ecommerce/stores/favoriteStore"
import { Button } from "@/components/demos/ecommerce/ui/button"
import { PageTransition } from "@/components/demos/ecommerce/shared/PageTransition"
import { ScrollReveal } from "@/components/demos/ecommerce/shared/ScrollReveal"
import { Heart, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function WishlistPage() {
  const favorites = useFavoriteStore((s) => s.favorites)
  const isHydrated = useFavoriteStore((s) => s.isHydrated)

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <PageTransition>
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary fill-primary" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                  Your Wishlist
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                {favorites.length > 0
                  ? `You have ${favorites.length} ${favorites.length === 1 ? 'piece' : 'pieces'} saved. When you're ready, add them to your cart.`
                  : "Save your favorite items here for easy access later."
                }
              </p>
            </div>

            {!isHydrated ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-surface-lowest rounded-[28px] p-4 flex flex-col h-full ambient-shadow animate-pulse">
                    <div className="aspect-square rounded-[22px] bg-surface-low mb-6" />
                    <div className="px-2 space-y-3">
                      <div className="h-4 w-20 rounded bg-surface-low" />
                      <div className="h-5 w-full rounded bg-surface-low" />
                      <div className="h-5 w-2/3 rounded bg-surface-low" />
                    </div>
                  </div>
                ))}
              </div>
            ) : favorites.length === 0 ? (
              <ScrollReveal>
                <div className="text-center py-24">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className="w-24 h-24 rounded-full bg-surface-low flex items-center justify-center mx-auto mb-8"
                  >
                    <Heart className="w-10 h-10 text-muted-foreground opacity-20" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">No favorites yet</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Explore our collection and tap the heart icon on any product you love. They'll appear here for easy access.
                  </p>
                  <Button asChild size="lg" className="rounded-full px-10 gap-2">
                    <Link href="/projects/ecommerce-demo/shop">
                      Explore the Collection <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  {favorites.map((product, i) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}
