import type { ReactNode } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

/**
 * Blocks render until session resolves; redirects signed-out users to /login.
 * Server functions still enforce auth independently.
 */
export function RequireAuth({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}): React.JSX.Element {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <>
        {fallback ?? (
          <div className="flex-1 grid place-items-center p-8 text-sm opacity-60">
            Loading session…
          </div>
        )}
      </>
    );
  }
  if (!user) return <RedirectToSignIn />;
  return <>{children}</>;
}
