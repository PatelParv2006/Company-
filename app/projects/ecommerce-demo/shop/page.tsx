"use client"

import * as React from "react"
import { Navbar } from "@/components/demos/ecommerce/layout/navbar"
import { Footer } from "@/components/demos/ecommerce/layout/footer"
import { ProductCard } from "@/components/demos/ecommerce/shared/ProductCard"
import { SkeletonGrid } from "@/components/demos/ecommerce/shared/SkeletonCard"
import { Search, ChevronDown, SlidersHorizontal, Grid3X3, List, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/demos/ecommerce/ui/button"
import { PageTransition } from "@/components/demos/ecommerce/shared/PageTransition"
import { PRODUCTS } from "@/lib/demos/ecommerce/products"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortBy, setSortBy] = React.useState("Featured")
  const [minPrice, setMinPrice] = React.useState(0)
  const absoluteMaxPrice = Math.max(...PRODUCTS.map(p => p.price))
  const [maxPrice, setMaxPrice] = React.useState(absoluteMaxPrice)
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false)
  const [isSortOpen, setIsSortOpen] = React.useState(false)

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))]

  const filteredProducts = PRODUCTS
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(p => p.price >= minPrice && p.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price
      if (sortBy === "Price: High to Low") return b.price - a.price
      if (sortBy === "Rating") return b.rating - a.rating
      return 0 // Featured / Default
    })

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(parseInt(e.target.value) || 0, maxPrice - 50)
    setMinPrice(Math.max(0, value))
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(parseInt(e.target.value) || 0, minPrice + 50)
    setMaxPrice(Math.min(absoluteMaxPrice * 2, value))
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <PageTransition>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                  The Collection
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Explore our full catalog of meticulously crafted goods. Use the filters to curate your view.
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-64 flex-shrink-0 space-y-10 hidden lg:block">
                <div>
                  <h3 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                  </h3>
                  
                  <div className="space-y-8">
                    {/* Category Filter */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Category</h4>
                      <div className="flex flex-col gap-2">
                        {categories.map((cat) => (
                          <label 
                            key={cat} 
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => setSelectedCategory(cat)}
                          >
                            <div className={`w-5 h-5 rounded-[6px] border ${selectedCategory === cat ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'} flex items-center justify-center transition-colors`}>
                              {selectedCategory === cat && <span className="w-2 h-2 rounded-sm bg-white" />}
                            </div>
                            <span className={`text-sm ${selectedCategory === cat ? 'text-primary font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                              {cat}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex justify-between items-center text-sm">
                        Price Range
                        <span className="text-[10px] font-black uppercase tracking-tighter text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          Range Mode
                        </span>
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">Min</span>
                            <input 
                              type="number" 
                              value={minPrice}
                              onChange={(e) => setMinPrice(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full h-10 bg-surface-lowest border border-border/50 rounded-xl px-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase mb-1 block">Max</span>
                            <input 
                              type="number" 
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full h-10 bg-surface-lowest border border-border/50 rounded-xl px-3 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                          </div>
                        </div>
                        
                        <div className="px-1 relative h-6 flex items-center">
                          <div className="absolute left-0 right-0 h-1.5 bg-surface-highest rounded-full" />
                          <div 
                             className="absolute h-1.5 bg-primary rounded-full transition-all duration-75"
                             style={{
                                left: `${(minPrice / absoluteMaxPrice) * 100}%`,
                                right: `${100 - (maxPrice / absoluteMaxPrice) * 100}%`
                             }}
                          />
                          <input 
                            type="range"
                            min="0"
                            max={absoluteMaxPrice}
                            step="10"
                            value={minPrice}
                            onChange={handleMinChange}
                            className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer accent-primary pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                          />
                          <input 
                            type="range"
                            min="0"
                            max={absoluteMaxPrice}
                            step="10"
                            value={maxPrice}
                            onChange={handleMaxChange}
                            className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer accent-primary pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Availability Filter */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Availability</h4>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded-[6px] border border-border group-hover:border-primary transition-colors bg-primary border-primary flex items-center justify-center">
                          <span className="w-2 h-2 rounded-sm bg-white" />
                        </div>
                        <span className="text-sm text-foreground">In Stock Only</span>
                      </label>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-surface-lowest p-4 rounded-[22px] ambient-shadow">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search collection..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 bg-surface-low rounded-[16px] pl-11 pr-4 text-sm focus:outline-none focus:bg-surface-highest transition-colors"
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="lg:hidden flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl"
                      >
                        <SlidersHorizontal className="w-4 h-4" /> Filters
                      </button>
                      <div className="text-sm text-muted-foreground hidden sm:block">
                        Showing {filteredProducts.length} results
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border-l border-border pl-4">
                      <div className="relative">
                        <button 
                          onClick={() => setIsSortOpen(!isSortOpen)}
                          className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-surface-low rounded-lg transition-colors"
                        >
                          Sort by: {sortBy} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`absolute right-0 top-full mt-2 w-48 bg-surface-lowest border border-border rounded-[16px] shadow-xl transition-all z-[60] p-2 ${isSortOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                          {["Featured", "Price: Low to High", "Price: High to Low", "Rating"].map(option => (
                            <button 
                              key={option}
                              onClick={() => {
                                setSortBy(option)
                                setIsSortOpen(false)
                              }}
                              className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-surface-low transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 border-l border-border pl-2">
                        <button 
                          onClick={() => setViewMode('grid')}
                          className={`p-2 rounded-[12px] transition-colors ${viewMode === 'grid' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-surface-low hover:text-foreground'}`}
                        >
                          <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setViewMode('list')}
                          className={`p-2 rounded-[12px] transition-colors ${viewMode === 'list' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-surface-low hover:text-foreground'}`}
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={viewMode === 'grid' 
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" 
                      : "flex flex-col gap-6"
                    }
                  >
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} viewMode={viewMode} />
                    ))}
                  </motion.div>
                ) : (
                  <div className="py-24 text-center">
                    <div className="w-20 h-20 rounded-full bg-surface-low flex items-center justify-center mx-auto mb-6">
                      <Search className="w-8 h-8 text-muted-foreground opacity-30" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-8">Try adjusting your filters or search terms.</p>
                    <Button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setMinPrice(0); setMaxPrice(absoluteMaxPrice); }} variant="outline" className="rounded-full">
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </PageTransition>
      </main>
      <Footer />

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-surface-lowest border-l border-border z-[101] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold text-foreground">Filters</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-surface-low rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-10">
                {/* Category Filter */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Category</h4>
                  <div className="flex flex-col gap-3">
                    {categories.map((cat) => (
                      <label 
                        key={cat} 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setSelectedCategory(cat)}
                      >
                        <div className={`w-5 h-5 rounded-[6px] border ${selectedCategory === cat ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'} flex items-center justify-center transition-colors`}>
                          {selectedCategory === cat && <span className="w-2 h-2 rounded-sm bg-white" />}
                        </div>
                        <span className={`text-sm ${selectedCategory === cat ? 'text-primary font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Price Range</h4>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block">Min</span>
                        <input 
                          type="number" 
                          value={minPrice}
                          onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
                          className="w-full h-11 bg-surface-low border border-border/50 rounded-xl px-4 text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block">Max</span>
                        <input 
                          type="number" 
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
                          className="w-full h-11 bg-surface-low border border-border/50 rounded-xl px-4 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full h-12 rounded-full mt-8"
                >
                  Show Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
