import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[96px] w-full border-2 border-charcoal/20 dark:border-cream/15 bg-cream dark:bg-slate px-3 py-2 text-sm text-charcoal dark:text-cream placeholder:text-charcoal/40 dark:placeholder:text-cream/35 shadow-brutal-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:border-terracotta disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
