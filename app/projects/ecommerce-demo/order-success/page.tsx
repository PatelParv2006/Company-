"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/demos/ecommerce/ui/button"
import { CheckCircle2, ArrowRight, ShoppingBag, Package } from "lucide-react"
import Link from "next/link"

export default function OrderSuccessPage() {
  // Dynamic delivery dates
  const deliveryStart = new Date()
  deliveryStart.setDate(deliveryStart.getDate() + 3)
  const deliveryEnd = new Date()
  deliveryEnd.setDate(deliveryEnd.getDate() + 5)
  const formatDate = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric" })

  // Random order ID
  const orderId = React.useMemo(() => `DC-${Math.floor(10000 + Math.random() * 90000)}`, [])

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="relative z-10 w-24 h-24 mb-8 text-primary mx-auto"
      >
        <CheckCircle2 className="w-full h-full drop-shadow-[0_0_30px_rgba(10,132,255,0.4)]" />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 max-w-lg"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Order Confirmed
        </h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Thank you for your purchase. Your order <span className="font-semibold text-foreground">#{orderId}</span> has been received and is currently being processed. You will receive an email with tracking details shortly.
        </p>

        <div className="bg-card p-6 rounded-[22px] border border-border mb-6 text-left flex items-center gap-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Estimated Delivery</h4>
            <p className="text-muted-foreground text-sm">{formatDate(deliveryStart)} — {formatDate(deliveryEnd)}</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-[22px] border border-border mb-10 text-left flex items-center gap-6 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Order Protected</h4>
            <p className="text-muted-foreground text-sm">Full buyer protection with easy returns within 30 days.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="px-10 h-14 gap-2">
            <Link href="/projects/ecommerce-demo">
              Return Home <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-10 h-14 gap-2">
            <Link href="/projects/ecommerce-demo/shop">
              <ShoppingBag className="w-5 h-5" /> Continue Shopping
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
