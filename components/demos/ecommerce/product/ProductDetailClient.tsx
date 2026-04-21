"use client"

import * as React from "react"
import { type Product } from "@/lib/demos/ecommerce/products"
import { useCartStore } from "@/lib/demos/ecommerce/stores/cartStore"
import { Button } from "@/components/demos/ecommerce/ui/button"
import { Star, Truck, ShieldCheck, ShoppingBag, Zap, Loader2, Check } from "lucide-react"
import { useRouter } from "next/navigation"

type AddState = "idle" | "adding" | "added"

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = React.useState(1)
  const addToCart = useCartStore((s) => s.addToCart)
  const setCartOpen = useCartStore((s) => s.setCartOpen)
  const router = useRouter()
  const [addState, setAddState] = React.useState<AddState>("idle")

  const handleAddToCart = () => {
    if (addState !== "idle") return
    setAddState("adding")

    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      setAddState("added")
      setTimeout(() => setAddState("idle"), 2500)
    }, 600)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    router.push("/checkout")
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="inline-block px-4 py-1.5 rounded-full bg-surface-low text-primary text-sm font-semibold mb-6 w-fit">
        {product.category}
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
        {product.name}
      </h1>
      
      <div className="flex items-center gap-4 mb-8">
        <div className="flex gap-1 text-primary">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
          ))}
        </div>
        <span className="text-foreground tracking-tight font-medium">{product.rating}</span>
        <span className="text-muted-foreground underline cursor-pointer hover:text-foreground transition-colors">({product.reviewCount} Reviews)</span>
      </div>

      <div className="text-3xl font-bold tracking-tight text-foreground mb-8">
        ${product.price.toFixed(2)}
      </div>

      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        {product.description}
      </p>

      <div className="h-px w-full bg-border mb-10" />

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="flex items-center bg-surface-low rounded-full h-14 w-full sm:w-40 justify-between px-4 border border-border/50">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="text-muted-foreground hover:text-foreground text-xl transition-colors min-w-[44px] h-full flex items-center justify-center"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="font-bold text-lg tabular-nums">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)}
            className="text-muted-foreground hover:text-foreground text-xl transition-colors min-w-[44px] h-full flex items-center justify-center"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <Button 
          size="lg" 
          className={`flex-1 h-14 text-lg gap-2 transition-all duration-300 rounded-full shadow-lg hover:shadow-xl w-full ${
            addState === "added" ? "bg-green-600 hover:bg-green-700" : ""
          }`}
          onClick={addState === "added" ? () => setCartOpen(true) : handleAddToCart}
          disabled={addState === "adding"}
        >
          {addState === "adding" && (
            <>
              <Loader2 className="w-5 h-5 animate-spin-fast" />
              Adding…
            </>
          )}
          {addState === "added" && (
            <>
              <Check className="w-5 h-5" />
              Added ✓ — View Cart
            </>
          )}
          {addState === "idle" && (
            <>
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </Button>
      </div>

      <Button
        size="lg"
        variant="outline"
        className="w-full h-14 text-lg gap-2 mb-10 rounded-full border-2 hover:bg-surface-low transition-colors min-h-[56px]"
        onClick={handleBuyNow}
      >
        <Zap className="w-5 h-5" />
        Buy Now
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
        <div className="flex items-center gap-4 p-4 rounded-[22px] bg-surface-low/50 border border-border/30">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-foreground">Free Shipping</h4>
            <p className="text-xs text-muted-foreground">Orders over $200</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-[22px] bg-surface-low/50 border border-border/30">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-foreground">1 Year Warranty</h4>
            <p className="text-xs text-muted-foreground">Full coverage</p>
          </div>
        </div>
      </div>
    </div>
  )
}
