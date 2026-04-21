"use client"

import * as React from "react"
import { Heart, X, Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/demos/ecommerce/ui/button"
import { useFavoriteStore } from "@/lib/demos/ecommerce/stores/favoriteStore"
import { useCartStore } from "@/lib/demos/ecommerce/stores/cartStore"
import Link from "next/link"
import Image from "next/image"

export function FavoriteDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const favorites = useFavoriteStore((s) => s.favorites)
  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite)
  const { items, addToCart, updateQuantity, removeFromCart } = useCartStore()

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label="Favorites List"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-surface-lowest p-6 shadow-2xl flex flex-col sm:rounded-l-[32px]"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-3">
                <Heart className="w-6 h-6 fill-primary text-primary" /> Favorites
                {favorites.length > 0 && (
                  <span className="text-sm font-medium text-muted-foreground">
                    ({favorites.length})
                  </span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="p-3 rounded-full hover:bg-surface-low transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close favorites"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-6 py-16">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className="w-20 h-20 rounded-full bg-surface-low flex items-center justify-center"
                  >
                    <Heart className="w-8 h-8 opacity-30" />
                  </motion.div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground text-lg mb-2">No favorites yet</p>
                    <p className="text-sm">Save your favorite pieces here for quick access.</p>
                  </div>
                  <Button asChild variant="outline" className="rounded-full px-8 min-h-[44px]">
                    <Link href="/projects/ecommerce-demo/shop" onClick={onClose}>Browse Collection</Link>
                  </Button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {favorites.map((product) => {
                    const cartItem = items.find(i => i.id === product.id)
                    const inCart = !!cartItem
                    const qty = cartItem?.quantity || 0

                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40, scale: 0.9 }}
                        className="flex gap-4 group"
                      >
                        <div className="relative h-24 w-24 bg-surface-highest rounded-[16px] overflow-hidden flex-shrink-0">
                          <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill
                            sizes="96px"
                            className="object-cover" 
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-medium text-foreground text-sm line-clamp-2">{product.name}</h3>
                              <button 
                                onClick={() => toggleFavorite(product)}
                                className="p-2 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 min-w-[32px] min-h-[32px]"
                                aria-label={`Remove ${product.name} from favorites`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-muted-foreground text-sm mt-1">${product.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {inCart ? (
                              /* Quantity controls when already in cart */
                              <div className="flex items-center bg-surface-low rounded-full p-0.5 border border-border/50">
                                <button
                                  onClick={() => {
                                    if (qty <= 1) removeFromCart(product.id)
                                    else updateQuantity(product.id, qty - 1)
                                  }}
                                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-highest transition-colors min-w-[40px] min-h-[40px]"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <motion.span
                                  key={qty}
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="w-8 text-center text-xs font-black text-foreground tabular-nums"
                                >
                                  {qty}
                                </motion.span>
                                <button
                                  onClick={() => updateQuantity(product.id, qty + 1)}
                                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-highest transition-colors min-w-[40px] min-h-[40px]"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              /* Add to cart button */
                              <Button 
                                size="sm" 
                                variant="secondary"
                                className="rounded-full gap-2 h-10 min-h-[40px] px-4 font-bold"
                                onClick={() => addToCart(product)}
                              >
                                <Plus className="w-4 h-4" /> Add to Cart
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-border">
              <Button onClick={onClose} variant="outline" className="w-full h-14 text-lg rounded-full min-h-[56px] hover:bg-surface-low transition-colors">
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
