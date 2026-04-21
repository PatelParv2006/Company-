import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/demos/ecommerce/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_4_12px_rgba(37,99,235,0.4)] hover:bg-blue-500 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_8_20px_rgba(37,99,235,0.5)]",
        deep:
          "bg-gradient-to-b from-blue-500 to-blue-700 text-white border-t border-white/20 shadow-lg hover:brightness-110",
        outline:
          "border-2 border-blue-600/20 bg-transparent text-blue-600 hover:bg-blue-50 hover:border-blue-600/40",
        secondary:
          "bg-blue-100/80 text-blue-700 backdrop-blur-sm hover:bg-blue-100",
        ghost:
          "text-blue-600 hover:bg-blue-50",
        link:
          "text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-7",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base tracking-tight",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }