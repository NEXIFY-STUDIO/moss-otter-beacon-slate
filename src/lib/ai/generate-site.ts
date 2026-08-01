/**
 * Multi-page site generator for the mock G0/G1 pipeline.
 * Always emits home + subsections + extra pages so prompts produce a real site,
 * not a single-file hero tweak.
 */

import type { FileLanguage } from "@/types/file";
import type { G0Plan } from "@/lib/validations/ai-schemas";

export type GeneratedFile = {
  path: string;
  content: string;
  language: FileLanguage;
  description: string;
};

export type SiteBlueprint = {
  brand: string;
  tagline: string;
  heroTitle: string;
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  sections: { id: string; title: string; body: string }[];
  pages: {
    id: string;
    title: string;
    path: string;
    headline: string;
    body: string;
    blocks: { title: string; body: string }[];
  }[];
};

function titleCase(s: string): string {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function pickBrand(prompt: string): string {
  if (/\bcosy\b/i.test(prompt)) return "COSY";
  const m = prompt.match(
    /(?:pre|for|called|nazov|názov|brand|app|web|projekt)\s+[\"']?([A-Za-zÀ-ž0-9][\w\s-]{1,24})/i,
  );
  if (m?.[1] && !/^(saas|landing|web|app|strank|stránk)/i.test(m[1])) {
    return titleCase(m[1].trim());
  }
  const stop = new Set([
    "vytvor", "create", "build", "landing", "page", "stranku", "stránku",
    "s", "a", "pre", "with", "saas", "features", "pricing", "about", "contact",
  ]);
  const words = prompt
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stop.has(w.toLowerCase()))
    .slice(0, 2);
  if (words.length) return titleCase(words.join(" "));
  return "COSY Site";
}

function detectTheme(prompt: string): "saas" | "portfolio" | "shop" | "landing" {
  const p = prompt.toLowerCase();
  if (/e-?shop|shop|store|obchod|product|katalog|katalog/.test(p)) return "shop";
  if (/portfolio|cv|designer|fotog|artist|agency/.test(p)) return "portfolio";
  if (/saas|dashboard|app|platform|b2b|crm|todo/.test(p)) return "saas";
  return "landing";
}

/** Derive a multi-page blueprint from free-text prompt. */
export function blueprintFromPrompt(prompt: string): SiteBlueprint {
  const brand = pickBrand(prompt);
  const theme = detectTheme(prompt);
  const short = prompt.trim().slice(0, 120) || "Modern multi-page experience";

  if (theme === "shop") {
    return {
      brand,
      tagline: "Curated goods · Warm Brutalism",
      heroTitle: `Shop ${brand}`,
      heroLead: short,
      primaryCta: "Browse products",
      secondaryCta: "View collection",
      sections: [
        { id: "featured", title: "Featured", body: "Hand-picked items with bold product cards." },
        { id: "categories", title: "Categories", body: "Browse by collection without leaving the page." },
        { id: "trust", title: "Why us", body: "Fast shipping, honest materials, clear returns." },
        { id: "cta", title: "Ready to order?", body: "Jump into the catalog and checkout flow." },
      ],
      pages: [
        {
          id: "products",
          title: "Products",
          path: "src/pages/Products.tsx",
          headline: "All products",
          body: "Grid of products generated from your prompt.",
          blocks: [
            { title: "Starter kit", body: "Essential bundle for first-time buyers." },
            { title: "Pro pack", body: "Extended set with premium finishes." },
            { title: "Gift box", body: "Ready-to-ship gift packaging." },
          ],
        },
        {
          id: "about",
          title: "About",
          path: "src/pages/About.tsx",
          headline: `About ${brand}`,
          body: "Brand story, craft, and values.",
          blocks: [
            { title: "Craft", body: "Small-batch production with care." },
            { title: "Materials", body: "Traceable sources, durable design." },
          ],
        },
        {
          id: "contact",
          title: "Contact",
          path: "src/pages/Contact.tsx",
          headline: "Contact",
          body: "Support and wholesale inquiries.",
          blocks: [
            { title: "Email", body: "hello@example.com" },
            { title: "Hours", body: "Mon–Fri 9:00–17:00" },
          ],
        },
      ],
    };
  }

  if (theme === "portfolio") {
    return {
      brand,
      tagline: "Selected work · Case studies",
      heroTitle: `${brand} — portfolio`,
      heroLead: short,
      primaryCta: "View work",
      secondaryCta: "About me",
      sections: [
        { id: "work", title: "Selected work", body: "Case studies with process and outcomes." },
        { id: "services", title: "Services", body: "Design, product, and brand systems." },
        { id: "process", title: "Process", body: "Research → prototype → ship." },
        { id: "cta", title: "Start a project", body: "Tell me about your next brief." },
      ],
      pages: [
        {
          id: "work",
          title: "Work",
          path: "src/pages/Work.tsx",
          headline: "Case studies",
          body: "Deep dives into recent projects.",
          blocks: [
            { title: "Brand system", body: "Identity, type, and motion guidelines." },
            { title: "Product UI", body: "End-to-end SaaS interface redesign." },
          ],
        },
        {
          id: "about",
          title: "About",
          path: "src/pages/About.tsx",
          headline: "About",
          body: "Background, tools, and collaborators.",
          blocks: [
            { title: "Focus", body: "Product design and brand systems." },
            { title: "Stack", body: "Figma, React, Tailwind, motion." },
          ],
        },
        {
          id: "contact",
          title: "Contact",
          path: "src/pages/Contact.tsx",
          headline: "Let's talk",
          body: "New projects and collaborations.",
          blocks: [{ title: "Inbox", body: "studio@example.com" }],
        },
      ],
    };
  }

  // default + saas
  return {
    brand,
    tagline: theme === "saas" ? "Ship faster with multi-agent AI" : "Design. Diff. Deploy.",
    heroTitle:
      theme === "saas" ? `${brand} that ships` : `Build with ${brand}`,
    heroLead: short,
    primaryCta: "Open Studio",
    secondaryCta: "See features",
    sections: [
      { id: "features", title: "Features", body: "Core capabilities broken into clear cards." },
      { id: "how", title: "How it works", body: "G0 plans · G1 codes · G2 audits · you approve." },
      { id: "proof", title: "Social proof", body: "Teams use this flow to ship safer diffs." },
      { id: "cta", title: "Ready to build?", body: "Start from a prompt and approve the multi-page output." },
    ],
    pages: [
      {
        id: "features",
        title: "Features",
        path: "src/pages/Features.tsx",
        headline: "Feature deep-dive",
        body: "Every capability as its own section and page.",
        blocks: [
          { title: "Multi-agent", body: "Planner, coder, auditor in one pipeline." },
          { title: "HitL diffs", body: "Approve file-by-file with live preview." },
          { title: "Live preview", body: "Static multi-page SPA in the panel." },
        ],
      },
      {
        id: "pricing",
        title: "Pricing",
        path: "src/pages/Pricing.tsx",
        headline: "Simple pricing",
        body: "Free for demos, Pro when you scale.",
        blocks: [
          { title: "Free", body: "Mock pipeline + local projects." },
          { title: "Pro", body: "Higher limits + publish." },
        ],
      },
      {
        id: "about",
        title: "About",
        path: "src/pages/About.tsx",
        headline: `About ${brand}`,
        body: "Why this product exists and who it is for.",
        blocks: [
          { title: "Mission", body: "Make AI code changes reviewable." },
          { title: "Audience", body: "Builders who ship UI every week." },
        ],
      },
      {
        id: "contact",
        title: "Contact",
        path: "src/pages/Contact.tsx",
        headline: "Contact",
        body: "Sales, support, and partnership.",
        blocks: [
          { title: "Support", body: "support@example.com" },
          { title: "Sales", body: "sales@example.com" },
        ],
      },
    ],
  };
}

export function planFromBlueprint(bp: SiteBlueprint, prompt: string): G0Plan {
  const files: G0Plan["files"] = [
    {
      path: "src/App.tsx",
      description: `Home shell + nav + ${bp.sections.length} subsections for ${bp.brand}`,
      language: "tsx",
    },
    ...bp.pages.map((p) => ({
      path: p.path,
      description: `Page: ${p.title} — ${p.headline}`,
      language: "tsx" as const,
    })),
    {
      path: "styles.css",
      description: "Warm Brutalism tokens + multi-page layout",
      language: "css",
    },
    {
      path: "index.html",
      description: "Static multi-page entry with in-preview router (no top navigation)",
      language: "html",
    },
  ];
  return {
    summary: `Multi-page site (${bp.pages.length + 1} routes, ${bp.sections.length} home sections) for: ${prompt.slice(0, 100)}`,
    files,
  };
}

function pageComponent(name: string, headline: string, body: string, blocks: { title: string; body: string }[]): string {
  const cards = blocks
    .map(
      (b) => `        <article className="card">
          <h3>${b.title}</h3>
          <p>${b.body}</p>
        </article>`,
    )
    .join("\n");
  return `export default function ${name}() {
  return (
    <main className="page">
      <p className="eyebrow">Page</p>
      <h1>${headline}</h1>
      <p className="lead">${body}</p>
      <div className="features">
${cards}
      </div>
    </main>
  );
}
`;
}

function appTsx(bp: SiteBlueprint): string {
  const navItems = [
    { id: "home", title: "Home" },
    ...bp.pages.map((p) => ({ id: p.id, title: p.title })),
  ];
  const navJsx = navItems
    .map(
      (n) =>
        `          <a href="#/${n.id}" data-route="${n.id}" className="nav-link">${n.title}</a>`,
    )
    .join("\n");
  const sectionJsx = bp.sections
    .map(
      (s) => `      <section id="${s.id}" className="section">
        <h2>${s.title}</h2>
        <p>${s.body}</p>
      </section>`,
    )
    .join("\n");

  return `export function App() {
  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <header className="nav border-2 border-charcoal shadow-brutal bg-cream-secondary">
        <span className="logo font-serif font-bold">${bp.brand}</span>
        <nav className="nav-links">
${navJsx}
        </nav>
        <a href="#/home" data-route="home" className="btn primary">${bp.primaryCta}</a>
      </header>
      <section className="hero">
        <p className="eyebrow text-terracotta">${bp.tagline}</p>
        <h1 className="font-serif text-5xl">${bp.heroTitle}</h1>
        <p className="lead leading-relaxed">${bp.heroLead}</p>
        <div className="actions">
          <a href="#/home" data-route="home" data-scroll="cta" className="btn primary">${bp.primaryCta}</a>
          <a href="#/${bp.pages[0]?.id ?? "features"}" data-route="${bp.pages[0]?.id ?? "features"}" className="btn ghost">${bp.secondaryCta}</a>
        </div>
      </section>
${sectionJsx}
    </main>
  );
}
`;
}

function stylesCss(): string {
  return `:root {
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
.frame { max-width: 960px; margin: 0 auto; padding: 20px 24px 48px; }
.nav {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;
  padding: 12px 16px; border: 2px solid var(--charcoal);
  box-shadow: 4px 4px 0 0 var(--charcoal); background: var(--secondary);
  margin-bottom: 28px;
}
.logo { font-family: Georgia, serif; font-weight: 700; letter-spacing: 0.04em; }
.nav-links { display: flex; flex-wrap: wrap; gap: 8px 14px; }
.nav-link, a.nav-link {
  color: inherit; text-decoration: none; font-size: 13px; font-weight: 600;
  border-bottom: 2px solid transparent; padding: 2px 0; cursor: pointer;
}
.nav-link.is-active, a.nav-link.is-active { border-bottom-color: var(--terracotta); color: var(--terracotta); }
.hero h1, .page h1 {
  font-family: Georgia, serif; font-size: clamp(2.1rem, 5vw, 3.2rem);
  line-height: 1.08; margin: 8px 0 14px;
}
.eyebrow {
  text-transform: uppercase; letter-spacing: 0.12em; font-size: 12px;
  color: var(--terracotta); font-weight: 600; margin: 0;
}
.lead { max-width: 46ch; color: #3a3b40; line-height: 1.55; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 22px; }
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 16px; border: 2px solid var(--charcoal); font-weight: 600;
  text-decoration: none; color: inherit; background: white;
  box-shadow: 3px 3px 0 0 var(--charcoal); cursor: pointer; font: inherit;
}
.btn.primary { background: var(--terracotta); color: white; }
.btn.ghost { background: transparent; box-shadow: none; }
.section { margin: 36px 0; padding: 20px; border: 2px solid var(--charcoal);
  box-shadow: 4px 4px 0 0 var(--charcoal); background: white; }
.section h2 { font-family: Georgia, serif; margin: 0 0 8px; }
.section p { margin: 0; color: #4a4b50; line-height: 1.5; }
.features {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px; margin: 28px 0;
}
.card {
  border: 2px solid var(--charcoal); padding: 16px;
  box-shadow: 4px 4px 0 0 var(--charcoal); background: white;
}
.card h3 { margin: 0 0 8px; font-family: Georgia, serif; }
.card p { margin: 0; font-size: 14px; color: #4a4b50; }
.page { min-height: 50vh; }
.page-hidden { display: none !important; }
.view { display: none; }
.view.is-active { display: block; }
`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;");
}

/** Self-contained multi-page HTML for srcdoc — never navigates the parent host. */
export function buildMultiPageHtml(bp: SiteBlueprint, css: string): string {
  const nav = [
    { id: "home", title: "Home" },
    ...bp.pages.map((p) => ({ id: p.id, title: p.title })),
  ]
    .map(
      (n) =>
        `<a href="#/${n.id}" data-route="${n.id}" class="nav-link">${escapeHtml(n.title)}</a>`,
    )
    .join("");

  const homeSections = bp.sections
    .map(
      (s) => `<section id="${s.id}" class="section">
      <h2>${escapeHtml(s.title)}</h2>
      <p>${escapeHtml(s.body)}</p>
    </section>`,
    )
    .join("\n");

  const home = `<div class="view is-active" data-view="home">
    <section class="hero">
      <p class="eyebrow">${escapeHtml(bp.tagline)}</p>
      <h1>${escapeHtml(bp.heroTitle)}</h1>
      <p class="lead">${escapeHtml(bp.heroLead)}</p>
      <div class="actions">
        <a href="#/home" data-route="home" data-scroll="cta" class="btn primary">${escapeHtml(bp.primaryCta)}</a>
        <a href="#/${bp.pages[0]?.id ?? "features"}" data-route="${bp.pages[0]?.id ?? "features"}" class="btn ghost">${escapeHtml(bp.secondaryCta)}</a>
      </div>
    </section>
    ${homeSections}
  </div>`;

  const pages = bp.pages
    .map((p) => {
      const blocks = p.blocks
        .map(
          (b) => `<article class="card"><h3>${escapeHtml(b.title)}</h3><p>${escapeHtml(b.body)}</p></article>`,
        )
        .join("");
      return `<div class="view" data-view="${p.id}">
      <main class="page">
        <p class="eyebrow">Page</p>
        <h1>${escapeHtml(p.headline)}</h1>
        <p class="lead">${escapeHtml(p.body)}</p>
        <div class="features">${blocks}</div>
        <p style="margin-top:24px"><a href="#/home" data-route="home" class="btn ghost">← Back home</a></p>
      </main>
    </div>`;
    })
    .join("\n");

  // Inline router: preventDefault on ALL anchors — never leave the iframe / host.
  // Built without nested regex-in-template pitfalls.
  const script = [
    "(function(){",
    "function clean(s){",
    "  s = String(s || 'home');",
    "  while (s.charAt(0) === '#' || s.charAt(0) === '/') s = s.slice(1);",
    "  return s || 'home';",
    "}",
    "function show(route){",
    "  var id = clean(route);",
    "  var pageView = document.querySelector('.view[data-view=\"' + id + '\"]');",
    "  if (pageView) {",
    "    document.querySelectorAll('.view').forEach(function(v){",
    "      v.classList.toggle('is-active', v === pageView);",
    "    });",
    "    document.querySelectorAll('[data-route]').forEach(function(a){",
    "      a.classList.toggle('is-active', a.getAttribute('data-route') === id);",
    "    });",
    "    try { history.replaceState(null, '', '#/' + id); } catch (e) {}",
    "    window.scrollTo(0,0);",
    "    return;",
    "  }",
    "  var section = document.getElementById(id);",
    "  if (section) {",
    "    document.querySelectorAll('.view').forEach(function(v){",
    "      v.classList.toggle('is-active', v.getAttribute('data-view')==='home');",
    "    });",
    "    section.scrollIntoView({behavior:'smooth', block:'start'});",
    "    document.querySelectorAll('[data-route]').forEach(function(a){",
    "      a.classList.toggle('is-active', a.getAttribute('data-route') === 'home');",
    "    });",
    "    return;",
    "  }",
    "  document.querySelectorAll('.view').forEach(function(v){",
    "    v.classList.toggle('is-active', v.getAttribute('data-view')==='home');",
    "  });",
    "  document.querySelectorAll('[data-route]').forEach(function(a){",
    "    a.classList.toggle('is-active', a.getAttribute('data-route') === 'home');",
    "  });",
    "  try { history.replaceState(null, '', '#/home'); } catch (e) {}",
    "  window.scrollTo(0,0);",
    "}",
    "document.addEventListener('click', function(e){",
    "  var t = e.target;",
    "  if (!t || !t.closest) return;",
    "  var a = t.closest('a');",
    "  if (!a) return;",
    "  e.preventDefault();",
    "  e.stopPropagation();",
    "  var scroll = a.getAttribute('data-scroll');",
    "  if (scroll) {",
    "    show('home');",
    "    var el = document.getElementById(scroll);",
    "    if (el) setTimeout(function(){ el.scrollIntoView({behavior:'smooth'}); }, 40);",
    "    return;",
    "  }",
    "  var route = a.getAttribute('data-route');",
    "  if (!route) {",
    "    var href = a.getAttribute('href') || '';",
    "    if (href.charAt(0) === '#') route = clean(href);",
    "  }",
    "  show(route || 'home');",
    "}, true);",
    "show(clean(location.hash || 'home'));",
    "})();",
  ].join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(bp.brand)}</title>
  <style>${css}</style>
</head>
<body>
  <div class="frame">
    <header class="nav">
      <span class="logo">${escapeHtml(bp.brand)}</span>
      <nav class="nav-links">${nav}</nav>
      <a href="#/home" data-route="home" data-scroll="cta" class="btn primary">${escapeHtml(bp.primaryCta)}</a>
    </header>
    ${home}
    ${pages}
  </div>
  <script>${script}</script>
</body>
</html>`;
}

export function generateSiteFiles(prompt: string): {
  blueprint: SiteBlueprint;
  files: GeneratedFile[];
} {
  const bp = blueprintFromPrompt(prompt);
  const css = stylesCss();
  const files: GeneratedFile[] = [
    {
      path: "src/App.tsx",
      language: "tsx",
      description: "Home + sections + nav",
      content: appTsx(bp),
    },
    ...bp.pages.map((p) => {
      const name = p.path.split("/").pop()?.replace(/\.tsx$/, "") ?? "Page";
      return {
        path: p.path,
        language: "tsx" as const,
        description: p.title,
        content: pageComponent(name, p.headline, p.body, p.blocks),
      };
    }),
    {
      path: "styles.css",
      language: "css",
      description: "Styles",
      content: css,
    },
    {
      path: "index.html",
      language: "html",
      description: "Multi-page static entry",
      content: buildMultiPageHtml(bp, css),
    },
  ];
  return { blueprint: bp, files };
}
