import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        keepChangesEditProfile: "bg-primary text-[11px] text-white md:font-bold lg:text-[16px]",
        cancelEditProfile: "bg-gray-50 text-[11px] font-bold text-gray-500 lg:text-[16px] border shadow-sm",
        tag: "bg-white px-3 py-1 font-semibold border-2 border-gray-400 rounded-[12px] text-gray-500 text-[11px] lg:text-[14px] lg:rounded-[17px]",
        none: "bg-none !pl-6 flex align-middle rounded-none md:!pl-10 lg:!px-6 lg:w-auto h-10 lg:rounded-full lg:!py-0.5 ",
        verification: "bg-primary text-primary-foreground rounded-[12px] lg:hover:bg-chart-1 hover:border-0 hover:border-white",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-none hover:border-0 hover:border-white",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: 
          "text-primary underline-offset-4 hover:underline",
        azul:
          "bg-[#1e40af] text-white hover:bg-white hover:text-[#1e40af]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        tag: "h-5.5 w-min px-4 lg:h-9",
        buttonEditProfile: "py-1 px-4 lg:py-1 lg:px-7 lg:h-10",
        addQuality: "h-5! w-9 lg:h-9!",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }