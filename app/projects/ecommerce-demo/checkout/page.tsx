"use client"

import * as React from "react"
import { Navbar } from "@/components/demos/ecommerce/layout/navbar"
import { Footer } from "@/components/demos/ecommerce/layout/footer"
import { Button } from "@/components/demos/ecommerce/ui/button"
import { useCartStore, useCartSubtotal } from "@/lib/demos/ecommerce/stores/cartStore"
import { ShieldCheck, CreditCard, Wallet, ArrowRight, Calendar, Truck, Package, Lock, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { PageTransition } from "@/components/demos/ecommerce/shared/PageTransition"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const subtotal = useCartSubtotal()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "wallet">("card")
  const shipping = 0
  const tax = subtotal * 0.07 // 7% tax mock
  const total = subtotal + shipping + tax

  const handleConfirmPayment = () => {
    clearCart()
    router.push("/order-success")
  }

  // Calculate delivery date
  const deliveryStart = new Date()
  deliveryStart.setDate(deliveryStart.getDate() + 3)
  const deliveryEnd = new Date()
  deliveryEnd.setDate(deliveryEnd.getDate() + 5)
  const formatDate = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-32 pb-24">
          <div className="container mx-auto px-6 max-w-2xl text-center py-24">
            <div className="w-20 h-20 rounded-full bg-surface-low flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-muted-foreground opacity-30" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart before checking out.</p>
            <Button asChild size="lg" className="rounded-full px-10 gap-2">
              <Link href="/projects/ecommerce-demo/shop">
                Continue Shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-background">
        <PageTransition>
          <div className="container mx-auto px-6 max-w-6xl">
            
            {/* Back link */}
            <Link href="/projects/ecommerce-demo/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Shop
            </Link>

            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Form Section */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-primary" />
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                      Secure Checkout
                    </h1>
                  </div>
                  <div className="h-px flex-1 bg-border hidden sm:block" />
                </div>

                <section className="bg-card border border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-8 rounded-[32px]">
                  <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</span>
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">First Name</label>
                      <input type="text" placeholder="John" className="w-full h-14 bg-background border border-border rounded-[18px] px-6 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Last Name</label>
                      <input type="text" placeholder="Doe" className="w-full h-14 bg-background border border-border rounded-[18px] px-6 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Address</label>
                      <input type="text" placeholder="123 Luxury Ave, Suite 100" className="w-full h-14 bg-background border border-border rounded-[18px] px-6 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">City</label>
                      <input type="text" placeholder="New York" className="w-full h-14 bg-background border border-border rounded-[18px] px-6 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Postal Code</label>
                      <input type="text" placeholder="10001" className="w-full h-14 bg-background border border-border rounded-[18px] px-6 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground" />
                    </div>
                  </div>
                </section>

                <section className="bg-card border border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-8 rounded-[32px]">
                  <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</span>
                    Payment Method
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`border-2 rounded-[22px] p-6 flex flex-col items-center justify-center gap-3 cursor-pointer relative overflow-hidden transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(10,132,255,0.1)]' : 'border-border bg-background hover:border-primary/30'}`}
                    >
                      <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 ${paymentMethod === 'card' ? 'border-4 border-primary bg-background' : 'border-border'}`} />
                      <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground opacity-50'}`} />
                      <span className={`font-bold ${paymentMethod === 'card' ? 'text-foreground' : 'text-muted-foreground opacity-50'}`}>Credit Card</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod("wallet")}
                      className={`border-2 rounded-[22px] p-6 flex flex-col items-center justify-center gap-3 cursor-pointer relative overflow-hidden transition-all ${paymentMethod === 'wallet' ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(10,132,255,0.1)]' : 'border-border bg-background hover:border-primary/30'}`}
                    >
                      <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 ${paymentMethod === 'wallet' ? 'border-4 border-primary bg-background' : 'border-border'}`} />
                      <Wallet className={`w-8 h-8 ${paymentMethod === 'wallet' ? 'text-primary' : 'text-muted-foreground opacity-50'}`} />
                      <span className={`font-bold ${paymentMethod === 'wallet' ? 'text-foreground' : 'text-muted-foreground opacity-50'}`}>Digital Wallet</span>
                    </button>
                  </div>

                  {/* Payment method icons */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                    <span className="text-xs text-muted-foreground font-medium">We accept:</span>
                    <div className="flex items-center gap-3">
                      {/* Visa */}
                      <div className="px-3 py-1.5 bg-surface-low rounded-lg text-xs font-bold text-foreground border border-border">VISA</div>
                      {/* Mastercard */}
                      <div className="px-3 py-1.5 bg-surface-low rounded-lg text-xs font-bold text-foreground border border-border">MC</div>
                      {/* PayPal */}
                      <div className="px-3 py-1.5 bg-surface-low rounded-lg text-xs font-bold text-primary border border-border">PayPal</div>
                      {/* UPI */}
                      <div className="px-3 py-1.5 bg-surface-low rounded-lg text-xs font-bold text-foreground border border-border">UPI</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Card Number</label>
                      <input type="text" placeholder="•••• •••• •••• ••••" className="w-full h-14 bg-background border border-border rounded-[18px] px-6 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Expiry Date</label>
                      <div className="relative group">
                        <input 
                          type="month" 
                          onClick={(e) => (e.target as any).showPicker?.()}
                          className="w-full h-14 bg-background border border-border rounded-[18px] px-6 pr-12 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all [color-scheme:light] dark:[color-scheme:dark] cursor-pointer text-foreground" 
                        />
                        <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary pointer-events-none transition-colors" />
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">CVC</label>
                      <input type="text" placeholder="•••" className="w-full h-14 bg-background border border-border rounded-[18px] px-6 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-foreground" />
                    </div>
                  </div>
                </section>
              </div>

              {/* Order Summary */}
              <div className="lg:w-[420px] flex-shrink-0">
                <div className="bg-card border border-border p-8 rounded-[32px] sticky top-32 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)]">
                  <h2 className="text-xl font-bold mb-8 text-foreground">Order Summary</h2>
                  
                  <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-[14px] bg-surface-highest overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-foreground line-clamp-1">{item.name}</h4>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs font-medium text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-6 border-t border-border mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-bold text-green-600 dark:text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Tax</span>
                      <span className="font-semibold text-foreground">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border mb-8">
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold text-foreground">Order Total</span>
                      <span className="text-3xl font-black tracking-tight text-primary">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Delivery estimate */}
                  <div className="flex items-center gap-3 p-4 rounded-[16px] bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 mb-6">
                    <Truck className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-green-800 dark:text-green-300">Estimated Delivery</p>
                      <p className="text-xs text-green-700 dark:text-green-400">{formatDate(deliveryStart)} — {formatDate(deliveryEnd)}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirmPayment}
                    className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-lg font-bold rounded-full shadow-[0_8px_30px_rgba(10,132,255,0.35)] hover:shadow-[0_12px_40px_rgba(10,132,255,0.45)] transition-all flex items-center justify-center gap-2 group"
                  >
                    Place Order
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                  
                  {/* Trust elements */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span>Secure 256-bit Encrypted Checkout</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
                      <Package className="w-4 h-4 text-primary" />
                      <span>Order Protection & Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}
