import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border-2 border-charcoal/15 dark:border-cream/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-cream-secondary text-charcoal dark:bg-slate-card dark:text-cream",
        accent: "bg-terracotta/15 text-rust border-terracotta/30 dark:text-terracotta",
        success:
          "bg-diff-add-bg text-diff-add-text border-diff-add-text/30",
        danger: "bg-diff-del-bg text-diff-del-text border-diff-del-text/30",
        outline: "bg-transparent text-charcoal dark:text-cream",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  className,
  variant,
  ...props
}: BadgeProps): React.JSX.Element {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
