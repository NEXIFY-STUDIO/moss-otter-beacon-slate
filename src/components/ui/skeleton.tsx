import * as React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn(
        "animate-pulse bg-charcoal/10 dark:bg-cream/10 border border-charcoal/5 dark:border-cream/5",
        className,
      )}
      {...props}
    />
  );
}
