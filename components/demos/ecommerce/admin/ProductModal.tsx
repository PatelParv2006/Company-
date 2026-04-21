"use client"

import * as React from "react"
import { Button } from "@/components/demos/ecommerce/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/demos/ecommerce/ui/dialog"
import { UploadCloud, Link2 } from "lucide-react"
import { type Product } from "@/lib/demos/ecommerce/data/products"
import { useProductStore } from "@/lib/demos/ecommerce/stores/productStore"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product?: Product | null
}

const CATEGORIES = ["Headphones", "Watches", "Gadgets", "Shoes", "Bags", "Computers", "Mobiles", "Accessories", "Components", "Laptop"]

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const addProduct = useProductStore((s) => s.addProduct)
  const updateProduct = useProductStore((s) => s.updateProduct)
  
  const defaultForm = {
    name: "",
    price: 0,
    category: "Headphones",
    description: "",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    reviews: 0,
    tags: [] as string[],
  }

  const [formData, setFormData] = React.useState(defaultForm)
  const [imageInputMode, setImageInputMode] = React.useState<"preview" | "url">("preview")

  React.useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        tags: product.tags,
      })
    } else {
      setFormData(defaultForm)
    }
  }, [product, isOpen])

  const handleSave = () => {
    if (product) {
      updateProduct({ ...formData, id: product.id })
    } else {
      addProduct(formData)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-surface-lowest sm:rounded-[32px] border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          
          <div className="space-y-4">
            <div className="aspect-square bg-surface-low rounded-[28px] border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:bg-surface-highest transition-colors cursor-pointer group overflow-hidden relative">
              {formData.image ? (
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <UploadCloud className="w-10 h-10 mb-4 group-hover:text-primary transition-colors" />
                  <p className="font-semibold text-sm">Click or drag image to upload</p>
                  <p className="text-xs mt-1">SVG, PNG, JPG (max. 800x400px)</p>
                </>
              )}
            </div>
            
            {/* Image URL input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Link2 className="w-4 h-4" /> Image URL
              </label>
              <input 
                type="text" 
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full h-10 bg-surface-low rounded-[12px] px-4 text-sm border-transparent focus:ring-1 focus:ring-primary outline-none transition-all" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className="w-full h-12 bg-surface-low rounded-[16px] px-4 border-transparent focus:ring-1 focus:ring-primary outline-none transition-all" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Price ($)</label>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full h-12 bg-surface-low rounded-[16px] px-4 border-transparent focus:ring-1 focus:ring-primary outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                <input 
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                  className="w-full h-12 bg-surface-low rounded-[16px] px-4 border-transparent focus:ring-1 focus:ring-primary outline-none transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-12 bg-surface-low rounded-[16px] px-4 border-transparent focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the product..."
                className="w-full bg-surface-low rounded-[16px] p-4 border-transparent focus:ring-1 focus:ring-primary outline-none transition-all resize-none" 
              />
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" className="rounded-full px-8" onClick={onClose}>Cancel</Button>
          <Button className="rounded-full px-8" onClick={handleSave}>
            {product ? 'Update Details' : 'Add to Collection'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
