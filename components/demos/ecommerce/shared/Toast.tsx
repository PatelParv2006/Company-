"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Undo2 } from "lucide-react"
import { useCartStore } from "@/lib/demos/ecommerce/stores/cartStore"

export function ToastContainer() {
  const lastAddedItem = useCartStore((s) => s.lastAddedItem)
  const clearLastAdded = useCartStore((s) => s.clearLastAdded)
  const undoLastAdd = useCartStore((s) => s.undoLastAdd)
  const [visible, setVisible] = React.useState(false)
  const [currentItem, setCurrentItem] = React.useState(lastAddedItem)
  const [progress, setProgress] = React.useState(100)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)
  const progressRef = React.useRef<NodeJS.Timeout | null>(null)
  const TOAST_DURATION = 4000

  React.useEffect(() => {
    if (lastAddedItem) {
      setCurrentItem(lastAddedItem)
      setVisible(true)
      setProgress(100)

      // Clear existing timers
      if (timerRef.current) clearTimeout(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)

      // Progress bar countdown
      const startTime = Date.now()
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, 100 - (elapsed / TOAST_DURATION) * 100)
        setProgress(remaining)
        if (remaining <= 0) {
          if (progressRef.current) clearInterval(progressRef.current)
        }
      }, 30)

      // Auto-dismiss
      timerRef.current = setTimeout(() => {
        setVisible(false)
        clearLastAdded()
      }, TOAST_DURATION)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [lastAddedItem, clearLastAdded])

  const handleDismiss = () => {
    setVisible(false)
    clearLastAdded()
    if (timerRef.current) clearTimeout(timerRef.current)
    if (progressRef.current) clearInterval(progressRef.current)
  }

  const handleUndo = () => {
    undoLastAdd()
    setVisible(false)
    if (timerRef.current) clearTimeout(timerRef.current)
    if (progressRef.current) clearInterval(progressRef.current)
  }

  return (
    <AnimatePresence>
      {visible && currentItem && (
        <motion.div
          initial={{ opacity: 0, y: -30, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
          className="fixed top-24 right-6 z-[200] max-w-sm w-full"
        >
          <div className="bg-card/95 border border-border/60 rounded-[22px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] backdrop-blur-xl overflow-hidden">
            <div className="p-4 flex items-center gap-4">
              {/* Product Image */}
              <div className="w-14 h-14 rounded-[14px] bg-surface-highest overflow-hidden flex-shrink-0 ring-2 ring-green-500/20">
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.15 }}
                    className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                    Added to Cart
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground truncate">
                  {currentItem.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ${currentItem.price.toFixed(2)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={handleUndo}
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors text-primary"
                  title="Undo"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDismiss}
                  className="p-1.5 rounded-full hover:bg-surface-low transition-colors text-muted-foreground flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-[3px] bg-surface-low w-full">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
