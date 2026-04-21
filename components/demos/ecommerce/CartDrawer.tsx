"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, X, ArrowRight, Minus, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/demos/ecommerce/ui/button"
import { useCartStore, useCartSubtotal } from "@/lib/demos/ecommerce/stores/cartStore"

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const items = useCartStore((s) => s.items)
  const removeFromCart = useCartStore((s) => s.removeFromCart)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const subtotal = useCartSubtotal()

  // Handle ESC key to close
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
            aria-label="Shopping Cart"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-surface-lowest p-6 shadow-2xl flex flex-col sm:rounded-l-[32px]"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" /> Your Cart
                {items.length > 0 && (
                  <span className="text-sm font-medium text-muted-foreground">
                    ({items.length} {items.length === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="p-3 rounded-full hover:bg-surface-low transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close cart"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-6 py-16">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className="w-20 h-20 rounded-full bg-surface-low flex items-center justify-center"
                  >
                    <ShoppingBag className="w-8 h-8 opacity-30" />
                  </motion.div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground text-lg mb-2">Your cart is empty</p>
                    <p className="text-sm">Discover our curated collection and find something you love.</p>
                  </div>
                  <Button asChild className="rounded-full px-8 gap-2 min-h-[44px]">
                    <Link href="/projects/ecommerce-demo/shop" onClick={onClose}>
                      Start Shopping <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -40, scale: 0.9 }}
                      transition={{ type: "spring", bounce: 0.2, delay: index * 0.03 }}
                      className="flex gap-4 group"
                    >
                      <div className="relative h-24 w-24 bg-surface-highest rounded-[16px] overflow-hidden flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          sizes="96px"
                          className="object-cover" 
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-medium text-foreground text-sm line-clamp-2">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100 min-w-[32px] min-h-[32px]"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-muted-foreground text-sm">${item.price.toFixed(2)}</p>
                            {item.quantity > 1 && (
                              <motion.p
                                key={item.quantity}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-xs font-bold text-primary"
                              >
                                = ${(item.price * item.quantity).toFixed(2)}
                              </motion.p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <button 
                            onClick={() => {
                              if (item.quantity <= 1) {
                                removeFromCart(item.id)
                              } else {
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            }}
                            className="w-10 h-10 rounded-full bg-surface-low flex items-center justify-center hover:bg-surface-highest transition-colors min-w-[40px] min-h-[40px]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="font-bold w-6 text-center tabular-nums"
                          >
                            {item.quantity}
                          </motion.span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 rounded-full bg-surface-low flex items-center justify-center hover:bg-surface-highest transition-colors min-w-[40px] min-h-[40px]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="pt-6 mt-6 border-t border-border">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-muted-foreground">Subtotal</span>
                  <motion.span
                    key={subtotal}
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-xl font-semibold tracking-tight"
                  >
                    ${subtotal.toFixed(2)}
                  </motion.span>
                </div>
                <Button asChild className="w-full h-14 text-lg rounded-full mb-3 min-h-[56px]">
                  <Link href="/projects/ecommerce-demo/checkout" onClick={onClose}>Checkout</Link>
                </Button>
                <Button asChild variant="outline" className="w-full h-12 rounded-full mb-3 min-h-[48px]">
                  <Link href="/projects/ecommerce-demo/shop" onClick={onClose}>
                    <ShoppingBag className="w-4 h-4 mr-2" /> Go to Cart
                  </Link>
                </Button>
                <button
                  onClick={onClose}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-2 py-3 transition-colors font-medium min-h-[44px]"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
