import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:focus-visible:ring-offset-slate disabled:pointer-events-none disabled:opacity-50 border-2 border-charcoal dark:border-cream/20 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none",
  {
    variants: {
      variant: {
        primary:
          "bg-terracotta text-white shadow-brutal hover:bg-rust dark:shadow-[4px_4px_0px_0px_rgba(244,241,234,0.15)]",
        secondary:
          "bg-cream-secondary text-charcoal shadow-brutal hover:bg-cream dark:bg-slate-card dark:text-cream dark:shadow-[4px_4px_0px_0px_rgba(244,241,234,0.12)]",
        ghost:
          "border-transparent bg-transparent shadow-none text-charcoal hover:bg-charcoal/5 dark:text-cream dark:hover:bg-cream/5",
        destructive:
          "bg-diff-del-text text-white shadow-brutal hover:bg-red-800 dark:shadow-[4px_4px_0px_0px_rgba(244,241,234,0.12)]",
        outline:
          "bg-transparent text-charcoal shadow-brutal-sm hover:bg-cream-secondary dark:text-cream dark:hover:bg-slate-card",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
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
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
