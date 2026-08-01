# COSY Studio — 25 Super-Promptov (2→1, 300% upgrade)

**Stack reality (tento workspace):** TanStack Start + Vite 8 + React 19 + Tailwind v4 + Zustand + Zod + better-auth + PGLite/Neon — **nie** Next.js 14.  
Každý super-prompt spája **2 originálne prompty**, pridáva edge cases, security, a11y, performance a acceptance bar.

**Ako používať**
1. Foundation (tento kameň) je už v appke.
2. Spúšťaj **S01 → S25** postupne; neskáč.
3. Po každom: `npm run typecheck`, light+dark, mobile ~390px, browser smoke.
4. Strict TS: `0 any`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.
5. Atomic folders: `components/ui|layout|chat|editor|preview|shared`.

---

## S01 · Strict foundation + Warm Brutalism tokens  
**Spojené:** Prompt 01 + 02 · **Fáza:** Foundation

### Cieľ
Produkčný TanStack Start skeleton so strict TypeScript a kompletnými Warm Brutalism tokenmi v Tailwind v4 `@theme`.

### Inštrukcie (upgrade)
1. Over `tsconfig`: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitAny`.
2. `src/lib/utils.ts` → `cn()` (clsx + tailwind-merge); žiadne `any`.
3. V `src/styles.css` `@theme` farby: cream, cream-secondary, slate, slate-card, terracotta, rust, charcoal, diff-*.
4. Box shadows: `shadow-brutal`, `shadow-brutal-sm` (dark mode soft cream shadow).
5. Fonty: Playfair Display (serif), Inter (sans), Fira Code (mono) — load v root head.
6. Dark mode cez `class` na `<html>` (nie media-only).
7. `.env.example` so všetkými kľúčmi (DB, AI, Stripe, app URL).

### Edge cases
- Hydration: `suppressHydrationWarning` na html; theme apply pred first paint ak možné.
- Tokeny **iba** cez utility triedy — žiadne raw hex v JSX.

### Acceptance
- [ ] App bootuje, typecheck 0 errors
- [ ] `bg-cream`, `text-terracotta`, `shadow-brutal` fungujú light+dark
- [ ] `cn()` merge nekonfliktuje s brutal border

---

## S02 · Globals, fonts, UI primitives (Button/Card/Input/Badge)  
**Spojené:** 03 + 04

### Cieľ
CSS variables + base layer + Atomic UI kit s brutal variants.

### Inštrukcie
1. globals: body cream/slate, selection terracotta, thin scrollbars, pointer on buttons.
2. Button CVA: primary/secondary/ghost/destructive/outline · sizes sm/md/lg/icon · brutal shadow + active press translate.
3. Card, Input, Textarea, Badge, Skeleton — všetko s dark variants a focus rings.
4. Prefer `forwardRef` + explicit props interfaces.

### Edge cases
- Disabled opacity + no pointer
- Focus-visible ring offset na cream/slate backgrounds
- Reduced motion: no aggressive press animations

### Acceptance
- [ ] Primary button terracotta + brutal shadow
- [ ] 0 inline styles
- [ ] Story-like usage na landing page

---

## S03 · Providers, theme system, TopBar chrome  
**Spojené:** 05 + 06

### Cieľ
Theme store (persist) + TopBar s agent pipeline dots a brandingom.

### Inštrukcie
1. Zustand theme: light | dark | system + `matchMedia` listener.
2. TopBar h-14: logo COSY, project name, G0→G1→G2 status, Cmd+K trigger, theme toggle, profile placeholder.
3. Aria-labels na všetkých ikonách; status `role="status"`.

### Edge cases
- System theme zmena počas session
- Truncate project name na mobile
- Pipeline dots: idle/running/success/error farby

### Acceptance
- [ ] Theme toggle okamihite prepína
- [ ] TopBar responsive bez overflow
- [ ] Pipeline vizuálne čitateľná

---

## S04 · Resizable 3-pane IDE + Left chat skeleton  
**Spojené:** 07 + 08

### Cieľ
Full-height IDE: Left chat, Center editor, Right preview — `react-resizable-panels` v4 (`Group`/`Panel`/`Separator`).

### Inštrukcie
1. Default sizes ~22 / 45 / 33, min ≥15%.
2. LeftPanel: AgentStatus + ChatThread + PromptInput skeleton.
3. Separators keyboard accessible + hover terracotta.

### Edge cases
- Nested min sizes nesmú rozbiť layout
- Mobile: panely stále resize, content scrollable, no page overflow
- Unmount cleanup žiadne listeners

### Acceptance
- [ ] Drag resize funguje
- [ ] h-dvh minus top/bottom bars
- [ ] Left panel štruktúra hotová

---

## S05 · Center file+diff shell + Right preview shell  
**Spojené:** 09 + 10

### Cieľ
Center: file tree strip + diff container + HitL slot. Right: device switcher + iframe host + inspector badge.

### Inštrukcie
1. CenterPanel dual layout (tree ~200px + editor flex).
2. RightPanel device Mobile/Tablet/Desktop + zoom + refresh + open external.
3. Placeholder inspector badge (non-blocking).

### Edge cases
- Empty file selection
- Device frame aspect + scale transform origin top-left
- iframe sandbox attributes

### Acceptance
- [ ] Tree+editor viditeľné
- [ ] Device switch mení frame
- [ ] Light/dark konzistentné

---

## S06 · BottomBar, a11y keyboard baseline, Cmd+K wiring  
**Spojené:** 11 + 12

### Cieľ
Status bar + theme a11y + global shortcuts foundation.

### Inštrukcie
1. BottomBar h-10: last status log, latency/tokens, ⌘K.
2. Escape/Enter contract dokumentovaný pre HitL.
3. ThemeToggle cycle light→dark→system.
4. Aria + focus rings audit Top/Bottom.

### Edge cases
- Shortcuts ignore when focus in textarea (okrem explicit send)
- Screen reader live region pre status

### Acceptance
- [ ] BottomBar fixný
- [ ] Theme cycle
- [ ] Keyboard targets ≥40px kde ide

---

## S07 · Monaco DiffEditor + Warm Brutalism themes  
**Spojené:** 13 + 14 · **Upgrade foundation DiffView → Monaco**

### Cieľ
`@monaco-editor/react` DiffEditor s custom light/dark themes z tokenov.

### Inštrukcie
1. Lazy load Monaco (dynamic import) — performance.
2. Props: original, modified, language, readOnly original, Fira Code, automaticLayout.
3. Theme register: cream bg, charcoal fg, terracotta accents; diff add/del colors.
4. Sync theme s `useThemeStore.resolved`.
5. Fallback: existujúci `DiffView` ak Monaco failne.

### Edge cases
- SSR: client-only mount
- Dispose models on unmount
- Large files: virtualization default

### Acceptance
- [ ] Sample diff renders
- [ ] Theme switches with app
- [ ] Typecheck clean, no any

---

## S08 · File tree CRUD + typed Zustand file store  
**Spojené:** 15 + 16

### Cieľ
Produkčný file graph so store sync.

### Inštrukcie
1. `FileNode` recursive tree; create/rename/delete.
2. Store: Map path→file, active path, proposal, applyProposal.
3. Zod validate paths (no `..`, no absolute).
4. Optimistic UI + undo toast (sonner) optional.

### Edge cases
- Duplicate path
- Delete active file → select next
- Rename updates proposal path if match

### Acceptance
- [ ] CRUD v state
- [ ] Strict types
- [ ] Tree sort folders first

---

## S09 · Wire tree↔diff + HitL glass card (Framer Motion)  
**Spojené:** 17 + 18

### Cieľ
Select file → content. AI proposal → diff. HitL Approve/Reject floating card.

### Inštrukcie
1. Active file drives editor; proposal overlays when path matches.
2. HitL glass: backdrop-blur, brutal border, Enter approve / Esc reject.
3. AnimatePresence enter/exit.
4. Approve writes store + bumps preview key.

### Edge cases
- Proposal for non-active file: badge “switch to file”
- Double-submit guard
- reduced-motion: opacity only

### Acceptance
- [ ] Click file opens content
- [ ] HitL visible with proposal
- [ ] Approve updates content <150ms UI

---

## S10 · Rejection micro-poll + keyboard HitL hardening  
**Spojené:** 19 + 20

### Cieľ
Reject → modal dôvodov + free text; robust keyboard.

### Inštrukcie
1. Reasons chips + textarea; Zod schema.
2. Persist `lastRejection` do agent store (neskôr AiInteractionLog).
3. Keyboard: only when HitL visible; skip if modal open; trap focus in rejection modal.
4. Esc on modal closes without submit; Esc on HitL opens reject flow.

### Edge cases
- Nested Esc hierarchy
- Focus return to editor after close

### Acceptance
- [ ] Modal opens on Reject
- [ ] Enter/Esc HitL rules hold
- [ ] Data stored in store

---

## S11 · Error boundaries, skeletons, inline hunk actions  
**Spojené:** 21 + 22

### Cieľ
Resilience + partial accept.

### Inštrukcie
1. ErrorBoundary per panel (left/center/right).
2. Skeleton loaders for Monaco boot & preview boot.
3. Inline actions: Accept all / Reject all; stub Accept hunk (line-range merge).
4. Warm Brutalism error card (not browser default).

### Edge cases
- Boundary reset button
- Partial apply recalculates diff

### Acceptance
- [ ] Crash v jednom paneli neruší IDE
- [ ] Loading states neat
- [ ] Accept-all works

---

## S12 · WebContainer boot + mount FS + dev server  
**Spojené:** 23 + 24

### Cieľ
`@webcontainer/api` boot, mount project files, `npm install` + `npm run dev`, capture URL.

### Inštrukcie
1. `lib/webcontainer/index.ts` singleton boot with Abort/timeout.
2. Zustand `useWebContainerStore`: status, url, error, logs.
3. Mount from file store tree; writeFile on changes.
4. COOP/COEP headers notes for deploy; graceful fallback iframe.
5. Cleanup tearDown on unmount.

### Edge cases
- Unsupported browser (Safari older)
- Boot failure retry 1x
- Concurrent boots prevented

### Acceptance
- [ ] Boot + URL or elegant fallback
- [ ] 0 any; memory cleanup
- [ ] Logs stream to BottomBar

---

## S13 · Live preview iframe + device frames  
**Spojené:** 25 + 26

### Cieľ
Preview = WebContainer URL (or srcdoc fallback) vo device frames.

### Inštrukcie
1. iframe src when URL ready; hot path on file write.
2. DeviceFrame: iPhone 15 / iPad / Desktop bezels.
3. Zoom 50–150%; maintain center scroll.

### Edge cases
- Mixed content / blank URL
- Frame overflow mobile IDE

### Acceptance
- [ ] Preview updates after approve
- [ ] Device sizes correct
- [ ] Open-in-new-tab works

---

## S14 · Preview controls, inspector placeholder, WC fallback UX  
**Spojené:** 27 + 28

### Cieľ
Zoom/refresh/external + support detection UX.

### Inštrukcie
1. Capability detect SharedArrayBuffer / crossOriginIsolated.
2. Fallback card: why blocked + CTA open static export.
3. Inspector placeholder panel (DOM tree stub).

### Edge cases
- Firefox vs Chrome feature matrix messaging
- Don’t flash fallback if boot <300ms

### Acceptance
- [ ] Controls wired
- [ ] Fallback pretty + actionable
- [ ] No console errors on fallback path

---

## S15 · HitL → FS sync + agent metrics live  
**Spojené:** 29 + 30

### Cieľ
Approve → write WC FS → reload preview; show G0/G1/G2 latency & tokens.

### Inštrukcie
1. Orchestrate: applyProposal → wc.fs.writeFile → refresh.
2. AgentStatus live colors + ms + token counters.
3. Target UI update <150ms; WC reload async.

### Edge cases
- Approve during streaming blocked
- Partial file write failure rollback toast

### Acceptance
- [ ] Approve updates preview
- [ ] Metrics visible
- [ ] Status log lines append

---

## S16 · AI SDK providers + G0 Planner agent  
**Spojené:** 31 + 32

### Cieľ
Vercel AI SDK providers + G0 structured plan.

### Inštrukcie
1. `lib/ai/providers.ts` OpenAI + Anthropic; model map.
2. G0 system prompt: architecture only, no full code.
3. `generateObject` + `g0PlanSchema` Zod.
4. Server function with auth gate when available; rate limit stub.
5. Never leak API keys to client — server-only.

### Edge cases
- Empty prompt
- Model timeout → friendly error
- Schema parse failure → retry once with repair prompt

### Acceptance
- [ ] Valid G0 JSON plan
- [ ] Zod enforced
- [ ] 0 secrets client-side

---

## S17 · G1 Coder + G2 Auditor agents  
**Spojené:** 33 + 34

### Cieľ
G1 emits path→code; G2 returns issues + cleaned files.

### Inštrukcie
1. G1: React + Tailwind only, design tokens, no any, Warm Brutalism.
2. Stream text per file; validate `g1CodeMapSchema`.
3. G2: security (dangerouslySetInnerHTML, eval), a11y, tailwind token misuse.
4. Output `g2AuditSchema`; block HitL if critical errors unless override.

### Edge cases
- Multi-file plans
- Truncated streams
- Auditor false positives severity levels

### Acceptance
- [ ] Clean code map
- [ ] Issues list actionable
- [ ] Strict TS throughout

---

## S18 · Orchestrator pipeline + live Monaco streaming  
**Spojené:** 35 + 36

### Cieľ
G0→G1→G2 with progress events; token stream into modified buffer.

### Inštrukcie
1. `orchestrator.ts` with AbortController.
2. Progress callbacks → agent store phases.
3. Stream G1 tokens into proposal.modified (throttle rAF).
4. Prepare HitL diffs at end.
5. Log skeleton for AiInteractionLog (latency, tokens, model).

### Edge cases
- Abort mid-G1 cleans partial proposal
- Parallel file generation queue (concurrency 2)

### Acceptance
- [ ] E2E pipeline demo with real or mock providers
- [ ] Live growing diff
- [ ] Zod all outputs

---

## S19 · Abort UX + full chat thread polish  
**Spojené:** 37 + 38

### Cieľ
Stop button; chat bubbles; agent badges; empty/loading states.

### Inštrukcie
1. AbortController.abort + UI reset.
2. ChatThread: user/assistant styles, timestamps optional, attachments.
3. Auto-scroll; aria-live polite.
4. Persist thread in sessionStorage (optional).

### Edge cases
- Abort race with final token
- Long messages collapse

### Acceptance
- [ ] Stop works no leaks
- [ ] Chat usable + pretty
- [ ] Status badges sync

---

## S20 · Prompt images + Zod logging AiInteractionLog  
**Spojené:** 39 + 40

### Cieľ
Image attach in prompt; full Zod + DB log on Approve/Reject.

### Inštrukcie
1. PromptInput multi-image, preview, size limit 2MB, types png/jpeg/webp.
2. Server action `logAiInteraction` with auth + ownership.
3. Migration table AiInteractionLog (align blueprint enums).
4. Log prompt, code, decision, reason, agentType, tokens, latency.

### Edge cases
- Oversized image
- Offline log queue
- PII scrub optional

### Acceptance
- [ ] Images attach & send
- [ ] Zod validates
- [ ] Log row created (PGLite ok)

---

## S21 · Prisma/Kysely schema + Better Auth protected routes  
**Spojené:** 41 + 42 · **Adapt:** migrations + better-auth (nie Clerk)

### Cieľ
DB schema User/Project/File/AiInteractionLog + auth-protected dashboard/studio.

### Inštrukcie
1. `migrations/0002_cosy.sql` tables matching blueprint (uuid, indexes).
2. Server queries scoped by `context.userId` via `authMiddleware`.
3. Login route; gate dashboard/studio.
4. Sync user row on first login.

### Edge cases
- Anonymous demo mode flag for marketing landing only
- Cascade deletes

### Acceptance
- [ ] Migrate ok PGLite
- [ ] Unauthorized blocked
- [ ] Ownership checks

---

## S22 · Project/File CRUD server actions + Stripe billing core  
**Spojené:** 43 + 44

### Cieľ
Secure CRUD + Stripe checkout/portal/webhooks.

### Inštrukcie
1. create/update/delete/list projects & files — Zod + ownership.
2. `lib/stripe.ts`; checkout + portal server fns.
3. Webhook route verify signature; sync planTier fields.
4. Billing button in profile menu.
5. Never expose secret key.

### Edge cases
- Webhook replay
- Plan downgrade mid-session
- Free tier default

### Acceptance
- [ ] CRUD secure
- [ ] Webhook updates user
- [ ] Checkout session URL returned

---

## S23 · Usage metering + global Command Palette power features  
**Spojené:** 45 + 46

### Cieľ
Token quotas by plan; Cmd+K actions complete.

### Inštrukcie
1. FREE/PRO/ENTERPRISE daily token limits; pre-flight check before AI.
2. Command palette: new project, go file fuzzy, theme, publish stub, toggle panels.
3. cmdk + framer motion; recent commands.

### Edge cases
- Quota exceeded UX with upgrade CTA
- Fuzzy match diacritics (sk)

### Acceptance
- [ ] Limits enforced
- [ ] Cmd+K all key actions
- [ ] Mobile open via button

---

## S24 · PWA foundation + 1-click publish skeleton  
**Spojené:** 47 + 48

### Cieľ
Installable PWA + Publish flow skeleton.

### Inštrukcie
1. `public/manifest.webmanifest` + icons (generate simple terracotta C).
2. Basic service worker cache shell (careful with WC).
3. Publish button → zip export or Vercel deploy API stub with clear TODOs.
4. Status toast pipeline.

### Edge cases
- SW not on localhost edge cases
- Publish without auth

### Acceptance
- [ ] Manifest valid
- [ ] Publish skeleton UX clear
- [ ] No broken offline blank screen

---

## S25 · A11y audit + security review + launch checklist  
**Spojené:** 49 + 50

### Cieľ
Production-ready bar.

### Inštrukcie
1. Full keyboard paths: panels, HitL, modals, palette, tree.
2. ARIA roles, focus traps, live regions.
3. Security checklist: authz, Zod, rate limit, CSP headers, secrets server-only, audit log.
4. Performance: lazy Monaco/WC/motion; route code-split.
5. README architecture + env + runbook.
6. `npm run build` + typecheck + browser smoke light/dark/mobile.

### Acceptance
- [ ] High a11y keyboard coverage
- [ ] Security checklist 100%
- [ ] Build+preview render non-blank
- [ ] Launch-ready demo script (3 min)

---

## Mapping originál → super

| Super | Originály |
|------|-----------|
| S01 | 01+02 |
| S02 | 03+04 |
| S03 | 05+06 |
| S04 | 07+08 |
| S05 | 09+10 |
| S06 | 11+12 |
| S07 | 13+14 |
| S08 | 15+16 |
| S09 | 17+18 |
| S10 | 19+20 |
| S11 | 21+22 |
| S12 | 23+24 |
| S13 | 25+26 |
| S14 | 27+28 |
| S15 | 29+30 |
| S16 | 31+32 |
| S17 | 33+34 |
| S18 | 35+36 |
| S19 | 37+38 |
| S20 | 39+40 |
| S21 | 41+42 |
| S22 | 43+44 |
| S23 | 45+46 |
| S24 | 47+48 |
| S25 | 49+50 |

## Foundation coverage (už shipnuté)
S01–S06 väčšinou implementované v demo appke (tokens, layout, panels, HitL demo, preview srcdoc, Cmd+K, theme). Ďalší beh začni **S07**.
