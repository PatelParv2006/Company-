"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/demos/ecommerce/ui/button"
import { ArrowRight, ShieldCheck, Truck, Star } from "lucide-react"
import { PRODUCTS } from "@/lib/demos/ecommerce/products"
import Link from "next/link"
import Image from "next/image"

export function HomeHero() {
  const heroProduct = PRODUCTS.find(p => p.id === "p13") || PRODUCTS[0]

  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden mx-4 lg:mx-8 bg-surface-lowest rounded-[40px] mt-20 mb-16 px-6 lg:px-16">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-lowest opacity-50 pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4 max-w-xl"
          >
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/50 text-sm font-medium mb-1 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Latest Collection 2026
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1] mb-2">
                Elevate Your <br />
                <span className="text-gradient">Everyday</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A meticulously curated selection of premium technology and accessories, designed for maximum aesthetic impact and uncompromising performance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto font-bold tracking-wide rounded-full px-8 h-14 min-h-[44px]">
                <Link href="/projects/ecommerce-demo/shop">
                  Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto font-bold tracking-wide rounded-full px-8 h-14 min-h-[44px]">
                <Link href="/projects/ecommerce-demo/shop">
                  View Lookbook
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-8 border-t border-border/50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Global Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Right Imagery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[500px] lg:h-[700px] flex items-center justify-center -right-4 lg:-right-12"
          >
            {/* The "Product Stage" as per design system */}
            <motion.div 
              animate={{ rotate: [3, 5, 3] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute inset-0 bg-surface-highest/30 rounded-[60px] scale-105" 
            />
            <div className="absolute inset-0 bg-surface rounded-[48px] overflow-hidden shadow-2xl">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={heroProduct.image} 
                  alt={heroProduct.name} 
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center scale-110"
                />
              </motion.div>
            </div>
            
            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 left-0 sm:-left-6 lg:bottom-12 lg:-left-12 bg-surface-lowest p-4 sm:p-6 rounded-[28px] shadow-2xl border border-border/50 flex items-center gap-6 z-20"
            >
              <div>
                <div className="flex gap-1 text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="font-bold text-foreground">{heroProduct.name}</p>
                <p className="text-sm text-primary font-medium mt-1">From ${heroProduct.price}</p>
              </div>
              <Button size="icon" asChild className="h-12 w-12 rounded-full flex-shrink-0 min-w-[44px] min-h-[44px]">
                <Link href={`/product/${heroProduct.id}`}>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Extra floating element for depth */}
            <motion.div
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute top-8 -right-4 lg:top-16 lg:right-4 w-20 h-20 bg-primary/10 rounded-[18px] backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-lg"
            >
              <span className="text-primary font-black text-sm">NEW</span>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
