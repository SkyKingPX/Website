import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-white/50 text-white",
        secondary:
          "border-white/50 text-white",
        destructive:
          "border-red-500/50 text-red-400",
        outline: "border-white/50 text-white",
        green: "border-green-500/50 text-green-400",
        minecraft: "border-emerald-500/50 text-emerald-400",
        vintageStory: "border-amber-500/50 text-amber-400",
        game: "border-purple-500/50 text-purple-400",
        unrealEngine: "border-cyan-500/50 text-cyan-400"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
