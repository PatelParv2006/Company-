"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { type Product } from "@/lib/demos/ecommerce/products"
import { useFavoriteStore } from "@/lib/demos/ecommerce/stores/favoriteStore"
import Image from "next/image"

export function ProductGallery({ product }: { product: Product }) {
  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite)
  const isFavorite = useFavoriteStore((s) => s.isFavorite)
  const favorited = isFavorite(product.id)
  const [activeImage, setActiveImage] = React.useState(product.image)

  // In a real app, product would have an array of image URLs. 
  // For this demo, we'll simulate views by adding a 'sig' parameter to the Unsplash URL.
  const getSimulatedImage = (index: number) => {
    if (product.image.includes('unsplash.com')) {
      const separator = product.image.includes('?') ? '&' : '?'
      return `${product.image}${separator}sig=${index}`
    }
    return product.image
  }

  const galleryImages = [
    product.image,
    getSimulatedImage(1),
    getSimulatedImage(2),
    getSimulatedImage(3),
  ]

  return (
    <div className="space-y-6">
      <div className="aspect-square bg-surface-highest rounded-[40px] overflow-hidden relative shadow-2xl">
        <Image 
          src={activeImage} 
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-opacity duration-500"
        />
        <button 
          onClick={() => toggleFavorite(product)}
          className={`absolute top-6 right-6 w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center transition-all z-10 ${favorited ? 'bg-primary text-white shadow-lg' : 'bg-surface-lowest/80 text-muted-foreground hover:text-primary hover:bg-surface-lowest'} min-w-[44px] min-h-[44px]`}
        >
          <Heart className={`w-6 h-6 ${favorited ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {galleryImages.map((img, i) => (
          <button 
            key={i} 
            onClick={() => setActiveImage(img)}
            className={`aspect-square rounded-[22px] overflow-hidden transition-all duration-300 relative ${activeImage === img ? 'ring-2 ring-primary ring-offset-4' : 'hover:opacity-80 scale-95 hover:scale-100'} min-w-[44px] min-h-[44px]`}
          >
            <Image 
              src={img} 
              alt={`${product.name} view ${i}`}
              fill
              sizes="100px"
              className="object-cover bg-surface-highest"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
