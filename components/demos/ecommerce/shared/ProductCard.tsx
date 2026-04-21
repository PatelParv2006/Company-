"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Star, Plus, Minus, Loader2, Check } from "lucide-react"
import { type Product } from "@/lib/demos/ecommerce/products"
import { Button } from "@/components/demos/ecommerce/ui/button"
import { useCartStore } from "@/lib/demos/ecommerce/stores/cartStore"
import { useFavoriteStore } from "@/lib/demos/ecommerce/stores/favoriteStore"
import { useFlyToCartStore } from "@/lib/demos/ecommerce/stores/flyToCartStore"

type AddState = "idle" | "adding" | "added"

export function ProductCard({ product, viewMode = 'grid' }: { product: Product, viewMode?: 'grid' | 'list' }) {
  const { items, addToCart, updateQuantity, removeFromCart, setCartOpen } = useCartStore()
  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite)
  const isFavorite = useFavoriteStore((s) => s.isFavorite)
  const triggerFly = useFlyToCartStore((s) => s.triggerFly)
  const favorited = isFavorite(product.id)
  const [heartBurst, setHeartBurst] = React.useState(false)
  const [addState, setAddState] = React.useState<AddState>("idle")
  const containerRef = React.useRef<HTMLDivElement>(null)

  const itemInCart = items.find(i => i.id === product.id)
  const quantity = itemInCart ? itemInCart.quantity : 0

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
    if (!favorited) {
      setHeartBurst(true)
      setTimeout(() => setHeartBurst(false), 500)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (addState !== "idle") return

    setAddState("adding")

    // Trigger fly-to-cart animation
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      triggerFly({
        image: product.image,
        startX: rect.left,
        startY: rect.top,
        startWidth: rect.width,
        startHeight: rect.height,
      })
    }

    setTimeout(() => {
      addToCart(product)
      setAddState("added")
      setTimeout(() => setAddState("idle"), 2000)
    }, 500)
  }

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1)
    } else {
      removeFromCart(product.id)
    }
  }

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const renderAddButton = (size: "sm" | "default" = "sm") => {
    const isCompact = size === "sm"

    if (addState === "adding") {
      return (
        <Button
          size={isCompact ? "icon" : "default"}
          disabled
          className={isCompact
            ? "rounded-full w-9 h-9 shrink-0"
            : "rounded-full px-4 h-9 text-xs font-bold gap-2 min-w-[100px]"
          }
        >
          <Loader2 className={`${isCompact ? "w-4 h-4" : "w-3.5 h-3.5"} animate-spin-fast`} />
          {!isCompact && "Adding…"}
        </Button>
      )
    }

    if (addState === "added") {
      return (
        <Button
          size={isCompact ? "icon" : "default"}
          className={isCompact
            ? "rounded-full w-9 h-9 shrink-0 bg-green-600 hover:bg-green-700"
            : "rounded-full px-4 h-9 text-xs font-bold gap-2 min-w-[100px] bg-green-600 hover:bg-green-700"
          }
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setCartOpen(true)
          }}
        >
          <Check className={`${isCompact ? "w-4 h-4" : "w-3.5 h-3.5"}`} />
          {!isCompact && "Added ✓"}
        </Button>
      )
    }

    if (quantity > 0) {
      return (
        <div className="flex items-center bg-surface-low rounded-full p-0.5 border border-border/50 shadow-sm">
          <Button
            onClick={handleDecrease}
            size="icon"
            variant="ghost"
            className="rounded-full w-7 h-7 shrink-0 hover:bg-surface-lowest transition-colors min-w-[28px] min-h-[28px]"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <motion.span
            key={quantity}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-7 text-center text-xs font-black text-foreground"
          >
            {quantity}
          </motion.span>
          <Button
            onClick={handleIncrease}
            size="icon"
            variant="ghost"
            className="rounded-full w-7 h-7 shrink-0 hover:bg-surface-lowest transition-colors min-w-[28px] min-h-[28px]"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      )
    }

    return (
      <Button
        onClick={handleAddToCart}
        size="icon"
        variant="secondary"
        className="rounded-full w-9 h-9 shrink-0 min-w-[36px] min-h-[36px]"
      >
        <Plus className="w-4.5 h-4.5" />
      </Button>
    )
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        className="group bg-surface-lowest rounded-[28px] p-4 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center ambient-shadow transition-all duration-300 w-full"
      >
        <div ref={containerRef} className="relative w-full sm:w-48 aspect-square rounded-[22px] bg-surface-highest overflow-hidden shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${heartBurst ? 'heart-burst' : ''} ${favorited ? 'bg-primary text-white shadow-lg' : 'bg-surface-lowest/80 text-muted-foreground hover:text-primary hover:bg-surface-lowest'} min-w-[44px] min-h-[44px]`}
          >
            <Heart className={`w-5 h-5 transition-transform duration-200 ${favorited ? 'fill-current scale-110' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col flex-1 justify-between py-2 w-full sm:pr-4">
          <div>
            <div className="flex items-center gap-1 text-xs text-primary mb-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest">{product.category}</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{product.description}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xl sm:text-2xl font-black text-foreground">${product.price.toFixed(2)}</span>
            <div className="flex flex-wrap items-center gap-2">
              {renderAddButton("default")}
              <Button asChild className="rounded-full px-6 h-10 min-h-[40px] w-full sm:w-auto mt-2 sm:mt-0">
                <Link href={`/projects/ecommerce-demo/product/${product.id}`}>Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-surface-lowest rounded-[28px] p-4 flex flex-col h-full ambient-shadow transition-all duration-300"
    >
      <div ref={containerRef} className="relative aspect-square rounded-[22px] bg-surface-highest overflow-hidden mb-4 sm:mb-6">
        <Link href={`/projects/ecommerce-demo/product/${product.id}`} className="absolute inset-0 z-0">
          <span className="sr-only">View product</span>
        </Link>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={handleToggleFavorite}
            className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${heartBurst ? 'heart-burst' : ''} ${favorited ? 'bg-primary text-white shadow-lg' : 'bg-surface-lowest/80 text-muted-foreground hover:text-primary hover:bg-surface-lowest'} min-w-[44px] min-h-[44px]`}
          >
            <Heart className={`w-5 h-5 transition-transform duration-200 ${favorited ? 'fill-current scale-110' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 px-2">
        <div className="flex items-center gap-1 text-sm text-primary mb-2">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviewCount})</span>
        </div>

        <Link href={`/projects/ecommerce-demo/product/${product.id}`} className="group-hover:text-primary transition-colors min-h-[44px] flex items-center">
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300">
            {renderAddButton()}
            <Button size="sm" asChild className="hidden sm:inline-flex rounded-full px-4 h-9 text-xs font-bold w-auto shadow-none hover:shadow-none min-h-[36px]">
              <Link href={`/projects/ecommerce-demo/product/${product.id}`}>Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
