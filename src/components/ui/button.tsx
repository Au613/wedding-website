import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-[0.14em] uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-burgundy text-cream-soft shadow-soft hover:-translate-y-0.5 hover:bg-burgundy-light hover:shadow-lift",
        secondary:
          "border border-cream-soft/70 bg-transparent text-cream-soft hover:bg-cream-soft/10",
        outline:
          "border border-burgundy/30 bg-transparent text-burgundy hover:border-burgundy hover:bg-burgundy-mist",
        gold: "border border-gold/50 bg-transparent text-gold-ink hover:bg-gold/10",
        ghost: "text-burgundy hover:bg-burgundy-mist",
      },
      size: {
        sm: "px-4 py-2 text-[0.7rem]",
        md: "px-6 py-3",
        lg: "px-8 py-3.5 text-[0.8rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
