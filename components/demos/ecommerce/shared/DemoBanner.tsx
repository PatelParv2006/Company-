"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Monitor } from "lucide-react"

export function DemoBanner() {
  const [dismissed, setDismissed] = React.useState(true) // start hidden to avoid flash

  React.useEffect(() => {
    const wasDismissed = sessionStorage.getItem("demo-banner-dismissed")
    setDismissed(wasDismissed === "true")
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem("demo-banner-dismissed", "true")
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-primary/90 via-primary to-blue-500 text-white relative z-[60] overflow-hidden"
        >
          <div className="container mx-auto px-6 py-2.5 flex items-center justify-center gap-3 text-sm font-medium">
            <Monitor className="w-4 h-4 flex-shrink-0 opacity-80" />
            <span className="text-center">
              <span className="hidden sm:inline">🔒 </span>
              This is a live demo — All changes are saved only in your browser.
            </span>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0 ml-2"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
