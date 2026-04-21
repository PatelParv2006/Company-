"use client"

import * as React from "react"
import Link from "next/link"
import { Globe, Mail, Info, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = React.useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }
    setStatus("loading")
    // Mock API call
    setTimeout(() => {
      setStatus("success")
      setMessage("You're subscribed!")
      setEmail("")
    }, 800)
  }

  const disabledLinkStyles = "pointer-events-none opacity-50 cursor-not-allowed"

  return (
    <footer className="bg-surface-lowest pt-16 sm:pt-20 pb-8 sm:pb-10 border-t border-border mt-20 sm:mt-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <Link href="/projects/ecommerce-demo" className="text-xl font-bold tracking-tight text-foreground mb-4 block min-h-[44px] flex items-center">
              Digital Curator.
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              A meticulously curated selection of premium products for the modern aesthete.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://digitalcurator.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-surface-low flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors min-w-[44px] min-h-[44px]"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a 
                href="mailto:hello@digitalcurator.com" 
                className="w-11 h-11 rounded-full bg-surface-low flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors min-w-[44px] min-h-[44px]"
              >
                <Mail className="w-5 h-5" />
              </a>
              <Link 
                href="/projects/ecommerce-demo/shop" 
                className="w-11 h-11 rounded-full bg-surface-low flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors min-w-[44px] min-h-[44px]"
              >
                <Info className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/projects/ecommerce-demo/shop" className="hover:text-primary transition-colors min-h-[44px] flex items-center">All Products</Link></li>
              <li><Link href="/projects/ecommerce-demo/shop" className="hover:text-primary transition-colors min-h-[44px] flex items-center">New Arrivals</Link></li>
              <li><Link href="/projects/ecommerce-demo/shop" className="hover:text-primary transition-colors min-h-[44px] flex items-center">Accessories</Link></li>
              <li><Link href="/projects/ecommerce-demo/shop" className="hover:text-primary transition-colors min-h-[44px] flex items-center">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><span aria-disabled="true" tabIndex={-1} className={`hover:text-primary transition-colors min-h-[44px] flex items-center ${disabledLinkStyles}`}>FAQ</span></li>
              <li><span aria-disabled="true" tabIndex={-1} className={`hover:text-primary transition-colors min-h-[44px] flex items-center ${disabledLinkStyles}`}>Shipping & Returns</span></li>
              <li><span aria-disabled="true" tabIndex={-1} className={`hover:text-primary transition-colors min-h-[44px] flex items-center ${disabledLinkStyles}`}>Contact Us</span></li>
              <li><span aria-disabled="true" tabIndex={-1} className={`hover:text-primary transition-colors min-h-[44px] flex items-center ${disabledLinkStyles}`}>Terms of Service</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status !== "idle") setStatus("idle")
                  }}
                  placeholder="Enter your email" 
                  className={`w-full h-12 bg-surface-low rounded-[22px] px-6 text-sm focus:outline-none focus:bg-surface-lowest focus:ring-2 transition-all ${status === "error" ? "ring-destructive/50 border-destructive" : "focus:ring-primary/20"}`}
                  required
                />
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-1 top-1 bottom-1 px-4 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-primary transition-colors min-h-[44px] min-w-[44px] disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  {status === "loading" ? (
                    <div className="w-4 h-4 border-2 border-background/20 border-t-background rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {status === "error" && (
                <p className="text-[10px] font-bold text-destructive flex items-center gap-1.5 px-2">
                  <AlertCircle className="w-3 h-3" /> {message}
                </p>
              )}
              {status === "success" && (
                <p className="text-[10px] font-bold text-green-600 dark:text-green-400 flex items-center gap-1.5 px-2">
                  <CheckCircle2 className="w-3 h-3" /> {message}
                </p>
              )}
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Digital Curator. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/projects/ecommerce-demo/shop" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/projects/ecommerce-demo/shop" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
