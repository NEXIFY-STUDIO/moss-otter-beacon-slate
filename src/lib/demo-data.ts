import type { ProjectFile } from "@/types/file";
import type { ProjectRecord } from "@/types/project";

export const DEMO_PROJECT_ID = "cosy-demo-landing";

export const DEMO_PROJECTS: ProjectRecord[] = [
  {
    id: DEMO_PROJECT_ID,
    title: "Warm Landing",
    description: "Landing page s Warm Brutalism – hero, features, CTA.",
    updatedAt: new Date().toISOString(),
    isPublic: false,
    fileCount: 4,
    lastAgent: "G1 Coder",
    ownerName: "You",
    settings: { defaultDevice: "desktop", theme: "system" },
  },
  {
    id: "cosy-todo-saas",
    title: "Focus Todo",
    description: "Minimal todo SaaS s glass panelmi a brutal buttons.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    isPublic: true,
    fileCount: 6,
    lastAgent: "G2 Auditor",
    ownerName: "You",
    settings: { defaultDevice: "mobile", theme: "dark" },
  },
  {
    id: "cosy-dashboard",
    title: "Metrics Pulse",
    description: "Dashboard pre AI usage metrics a plan tiers.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    isPublic: false,
    fileCount: 8,
    lastAgent: "G0 Planner",
    ownerName: "You",
    settings: { defaultDevice: "desktop", theme: "light" },
  },
];

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Warm Landing</title>
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <div class="frame">
    <header class="nav">
      <span class="logo">COSY</span>
      <nav>
        <a href="#features">Features</a>
        <a href="#cta" class="btn">Get started</a>
      </nav>
    </header>
    <main>
      <section class="hero">
        <p class="eyebrow">AI Visual IDE</p>
        <h1>Design. Diff. Deploy.</h1>
        <p class="lead">
          Multi-agent pipeline with live preview — no context switching,
          no blind code merges.
        </p>
        <div class="actions">
          <a class="btn primary" href="#cta">Open Studio</a>
          <a class="btn ghost" href="#features">See how it works</a>
        </div>
      </section>
      <section id="features" class="features">
        <article class="card">
          <h3>G0 Planner</h3>
          <p>Architecture from a single prompt.</p>
        </article>
        <article class="card">
          <h3>G1 Coder</h3>
          <p>Streaming React + Tailwind output.</p>
        </article>
        <article class="card">
          <h3>G2 Auditor</h3>
          <p>Security, a11y, and design checks.</p>
        </article>
      </section>
      <section id="cta" class="cta">
        <h2>Ready for human-in-the-loop?</h2>
        <button class="btn primary" type="button">Approve the future</button>
      </section>
    </main>
  </div>
</body>
</html>`;

const STYLES_CSS = `:root {
  --cream: #F4F1EA;
  --slate: #0D0E11;
  --terracotta: #D96B43;
  --charcoal: #1C1D21;
  --secondary: #EAE6DF;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
  background: var(--cream);
  color: var(--charcoal);
}
.frame { max-width: 960px; margin: 0 auto; padding: 24px; }
.nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; border: 2px solid var(--charcoal);
  box-shadow: 4px 4px 0 0 var(--charcoal); background: var(--secondary);
  margin-bottom: 32px;
}
.logo { font-family: Georgia, serif; font-weight: 700; letter-spacing: 0.04em; }
.nav a { color: inherit; text-decoration: none; margin-left: 16px; font-size: 14px; }
.hero h1 {
  font-family: Georgia, serif; font-size: clamp(2.4rem, 6vw, 3.6rem);
  line-height: 1.05; margin: 8px 0 16px;
}
.eyebrow {
  text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px;
  color: var(--terracotta); font-weight: 600; margin: 0;
}
.lead { max-width: 42ch; color: #3a3b40; line-height: 1.55; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 16px; border: 2px solid var(--charcoal); font-weight: 600;
  text-decoration: none; color: inherit; background: white;
  box-shadow: 3px 3px 0 0 var(--charcoal); cursor: pointer;
}
.btn.primary { background: var(--terracotta); color: white; }
.btn.ghost { background: transparent; box-shadow: none; }
.features {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px; margin: 40px 0;
}
.card {
  border: 2px solid var(--charcoal); padding: 16px;
  box-shadow: 4px 4px 0 0 var(--charcoal); background: white;
}
.card h3 { margin: 0 0 8px; font-family: Georgia, serif; }
.card p { margin: 0; font-size: 14px; color: #4a4b50; }
.cta {
  border: 2px solid var(--charcoal); padding: 28px;
  box-shadow: 4px 4px 0 0 var(--charcoal); background: var(--secondary);
  text-align: center;
}
.cta h2 { font-family: Georgia, serif; margin: 0 0 16px; }`;

const APP_TSX = `export function App() {
  return (
    <main className="min-h-screen bg-cream text-charcoal p-8">
      <header className="border-2 border-charcoal shadow-brutal bg-cream-secondary px-4 py-3 flex justify-between">
        <span className="font-serif font-bold tracking-wide">COSY</span>
        <a className="text-sm font-medium" href="#cta">Get started</a>
      </header>
      <section className="mt-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.14em] text-terracotta font-semibold">
          AI Visual IDE
        </p>
        <h1 className="font-serif text-5xl leading-tight mt-2">
          Design. Diff. Deploy.
        </h1>
        <p className="mt-4 text-charcoal/70 leading-relaxed">
          Multi-agent pipeline with live preview — no context switching.
        </p>
      </section>
    </main>
  );
}
`;

const PACKAGE_JSON = `{
  "name": "warm-landing",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
`;

export const DEMO_FILES: ProjectFile[] = [
  {
    id: "f-index",
    path: "index.html",
    content: INDEX_HTML,
    language: "html",
    version: 1,
  },
  {
    id: "f-styles",
    path: "styles.css",
    content: STYLES_CSS,
    language: "css",
    version: 1,
  },
  {
    id: "f-app",
    path: "src/App.tsx",
    content: APP_TSX,
    language: "tsx",
    version: 1,
  },
  {
    id: "f-pkg",
    path: "package.json",
    content: PACKAGE_JSON,
    language: "json",
    version: 1,
  },
];

/** Sample AI proposal shown in the foundation HitL flow */
export const DEMO_PROPOSAL_MODIFIED = `export function App() {
  return (
    <main className="min-h-screen bg-cream text-charcoal p-8">
      <header className="border-2 border-charcoal shadow-brutal bg-cream-secondary px-4 py-3 flex justify-between items-center">
        <span className="font-serif font-bold tracking-wide">COSY Studio</span>
        <div className="flex gap-3 items-center">
          <span className="text-xs uppercase tracking-widest text-terracotta">
            Live
          </span>
          <a
            className="text-sm font-semibold border-2 border-charcoal px-3 py-1 shadow-brutal-sm bg-terracotta text-white"
            href="#cta"
          >
            Open Studio
          </a>
        </div>
      </header>
      <section className="mt-12 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.14em] text-terracotta font-semibold">
          Multi-Agent Visual IDE
        </p>
        <h1 className="font-serif text-5xl leading-tight mt-2">
          Write less. Approve more.
        </h1>
        <p className="mt-4 text-charcoal/70 leading-relaxed max-w-prose">
          G0 plans architecture, G1 streams code into a diff, G2 audits —
          you stay in the loop with one keystroke.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="border-2 border-charcoal bg-terracotta text-white px-4 py-2 font-semibold shadow-brutal"
          >
            Start building
          </button>
          <button
            type="button"
            className="border-2 border-charcoal bg-transparent px-4 py-2 font-semibold"
          >
            Watch pipeline
          </button>
        </div>
      </section>
    </main>
  );
}
`;

export function buildPreviewHtml(
  files: Map<string, string>,
  deviceNote?: string,
): string {
  const html = files.get("index.html") ?? INDEX_HTML;
  const css = files.get("styles.css") ?? STYLES_CSS;
  // Inline CSS so srcdoc preview works without a server
  const inlined = html
    .replace(
      /<link rel="stylesheet" href="\.\/styles\.css" \/>/,
      `<style>${css}</style>`,
    )
    .replace(
      "</body>",
      `${deviceNote ? `<!-- ${deviceNote} -->` : ""}</body>`,
    );
  return inlined;
}
