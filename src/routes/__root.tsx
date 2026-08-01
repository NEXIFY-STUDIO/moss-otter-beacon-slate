import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AppProviders } from "@/components/providers";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
      },
      {
        title: "COSY Studio — AI Visual IDE",
      },
      {
        name: "description",
        content:
          "AI-powered visual IDE with multi-agent pipeline, human-in-the-loop diffs, and live preview. Warm Brutalism.",
      },
      { name: "theme-color", content: "#D96B43" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "format-detection", content: "telephone=no" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap",
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/cosy-logo-3d-tight.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/cosy-logo-3d-tight.png" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="sk" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="overflow-hidden bg-cream text-charcoal dark:bg-slate dark:text-cream antialiased">
        <AppProviders>
          <Outlet />
        </AppProviders>
        <Scripts />
      </body>
    </html>
  );
}
