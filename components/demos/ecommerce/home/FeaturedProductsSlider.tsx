"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { PRODUCTS } from "@/lib/demos/ecommerce/products"
import { ProductCard } from "@/components/demos/ecommerce/shared/ProductCard"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function FeaturedProductsSlider() {
  // Use requested featured subset
  const featuredIds = ["p13", "p14", "p16", "p17", "p18", "p21"]
  const products = PRODUCTS.filter(p => featuredIds.includes(p.id))
    
  const containerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollOffset = 400
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollOffset : scrollOffset,
        behavior: 'smooth'
      })
    }
  }

  if (products.length === 0) return null

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">Curated Collection</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Our most sought-after pieces, representing the pinnacle of design and engineering.
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface-low hover:border-primary/30 transition-all active:scale-95 group min-w-[48px] min-h-[48px]"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 group-hover:text-primary transition-colors" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface-low hover:border-primary/30 transition-all active:scale-95 group min-w-[48px] min-h-[48px]"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={containerRef}
          className="flex gap-8 overflow-x-auto pb-12 px-6 md:px-[calc((100vw-1440px)/2+1.5rem)] snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="min-w-[300px] max-w-[300px] md:min-w-[420px] md:max-w-[420px] snap-start shrink-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
          <div className="min-w-[100px] shrink-0" />
        </div>
        
        {/* Edge Gradients for premium feel */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 hidden lg:block" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 hidden lg:block" />
      </div>
    </section>
  )
}
