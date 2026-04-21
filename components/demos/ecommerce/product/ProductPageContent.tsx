"use client"

import * as React from "react"
import { Star, Search, ChevronRight, ArrowLeft } from "lucide-react"
import { PRODUCTS } from "@/lib/demos/ecommerce/products"
import { ProductGallery } from "@/components/demos/ecommerce/product/ProductGallery"
import { ProductDetailClient } from "@/components/demos/ecommerce/product/ProductDetailClient"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/demos/ecommerce/ui/tabs"
import { PageTransition } from "@/components/demos/ecommerce/shared/PageTransition"
import Link from "next/link"

export function ProductPageContent({ id }: { id: string }) {
  const product = PRODUCTS.find(p => p.id === id)

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 bg-surface-low rounded-full flex items-center justify-center mb-6">
          <Search className="w-10 h-10 text-muted-foreground opacity-20" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The product you are looking for doesn&apos;t exist or has been removed.
        </p>
        <Link 
          href="/projects/ecommerce-demo/shop"
          className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity uppercase tracking-wider text-sm inline-block min-h-[44px]"
        >
          Return to Shop
        </Link>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/projects/ecommerce-demo" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link href="/projects/ecommerce-demo/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          
          {/* Gallery (Left) */}
          <ProductGallery product={product} />

          {/* Product Info (Right) */}
          <ProductDetailClient product={product} />
        </div>

        {/* Tabs Section */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-surface-low/50 p-1 rounded-2xl">
              <TabsTrigger value="description" className="rounded-xl px-8 h-12">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-xl px-8 h-12">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-xl px-8 h-12">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-8 mt-6 bg-surface-low rounded-[32px] ambient-shadow">
              <h3 className="text-2xl font-bold text-foreground mb-4">The Ideal Companion</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Every detail of the {product.name} has been engineered to exact standards. 
                Designed to fade into the background while providing an unparalleled experience. 
                The material choices reflect our commitment to sustainable luxury, utilizing 
                recycled elements where possible without sacrificing structural integrity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The {product.category.toLowerCase()} market has evolved, and this iteration stands 
                as an apex expression of what happens when aesthetics meet uncompromising functionality.
              </p>
            </TabsContent>
            
            <TabsContent value="specifications" className="p-8 mt-6 bg-surface-low rounded-[32px] ambient-shadow">
              <div className="space-y-4">
                <div className="grid grid-cols-3 py-4 border-b border-border">
                  <span className="font-medium text-foreground">Material</span>
                  <span className="col-span-2 text-muted-foreground">Premium composite and aerospace-grade aluminum</span>
                </div>
                <div className="grid grid-cols-3 py-4 border-b border-border">
                  <span className="font-medium text-foreground">Weight</span>
                  <span className="col-span-2 text-muted-foreground">240g</span>
                </div>
                <div className="grid grid-cols-3 py-4 border-b border-border">
                  <span className="font-medium text-foreground">Dimensions</span>
                  <span className="col-span-2 text-muted-foreground">7.5&quot; x 6.2&quot; x 2.1&quot;</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-8 mt-6 bg-surface-low rounded-[32px] ambient-shadow">
              <div className="flex items-center gap-6 mb-8">
                <div className="text-5xl font-bold text-foreground">{product.rating}</div>
                <div>
                  <div className="flex gap-1 text-primary mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-muted-foreground text-sm">Based on {product.reviewCount} reviews</p>
                </div>
              </div>
              
              {/* Sample Review */}
              <div className="py-6 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-highest flex items-center justify-center font-bold text-muted-foreground">
                      JD
                    </div>
                    <span className="font-semibold text-foreground">J. Doe</span>
                  </div>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex gap-1 text-primary mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Absolutely phenomenal build quality. The tactile feel is exactly as described and it fits 
                  perfectly into my minimalist workflow. Worth every penny.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-16 mb-8">
          <Link 
            href="/projects/ecommerce-demo/shop" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
