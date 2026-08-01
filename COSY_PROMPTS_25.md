# COSY Studio — 25 Super-Promptov (2→1, 300% upgrade)

**Stack reality (tento workspace):** TanStack Start + Vite 8 + React 19 + Tailwind v4 + Zustand + Zod + better-auth + PGLite/Neon — **nie** Next.js 14.  
Každý super-prompt spája **2 originálne prompty**, pridáva edge cases, security, a11y, performance a acceptance bar.

**Ako používať**
1. Foundation (tento kameň) je už v appke.
2. Spúšťaj **S01 → S25** postupne; neskáč.
3. Po každom: `npm run typecheck`, light+dark, mobile ~390px, browser smoke.
4. Strict TS: `0 any`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.
5. Atomic folders: `components/ui|layout|chat|editor|preview|shared`.

**Workflow:** po prompte → typecheck 0 errors → smoke → `[x]` v tomto súbore.

---

## Progress

| Super | Stav | Dátum |
|------|------|-------|
| S01–S06 | ✅ foundation | 2026-08-01 |
| S07 | ✅ Monaco DiffEditor | 2026-08-01 |
| S08 | ✅ File CRUD + Zod paths | 2026-08-01 |
| S09 | ✅ HitL + tree↔diff | 2026-08-01 |
| S10 | ✅ Rejection poll + keyboard | 2026-08-01 |
| S11 | ✅ ErrorBoundary + DiffActions | 2026-08-01 |
| S12 | ✅ WC detect + fallback boot | 2026-08-01 |
| S13 | ✅ Device frames + iframe | 2026-08-01 |
| S14 | ✅ Controls + inspector + fallback UX | 2026-08-01 |
| S15 | ✅ HitL→preview + G0/G1/G2 metrics | 2026-08-01 |
| S16 | ✅ AI providers + G0 Planner | 2026-08-01 |
| S17 | ✅ G1 Coder + G2 Auditor | 2026-08-01 |
| S18 | ✅ Orchestrator + live streaming | 2026-08-01 |
| S19 | ✅ Abort UX + chat polish | 2026-08-01 |
| S20 | ✅ Images + AiInteractionLog | 2026-08-01 |
| S21 | ✅ Schema + auth protected routes | 2026-08-01 |
| S22 | ✅ Project/File CRUD + Stripe core | 2026-08-01 |
| S23 | ✅ Usage metering + Cmd+K power | 2026-08-01 |
| S24 | ✅ PWA + publish skeleton | 2026-08-01 |
| **S25** | ✅ A11y + security + launch | 2026-08-01 |

---

## S01 · Strict foundation + Warm Brutalism tokens  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] App bootuje, typecheck 0 errors
- [x] `bg-cream`, `text-terracotta`, `shadow-brutal` fungujú light+dark
- [x] `cn()` merge nekonfliktuje s brutal border

---

## S02 · Globals, fonts, UI primitives (Button/Card/Input/Badge)  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Primary button terracotta + brutal shadow
- [x] 0 inline styles
- [x] Story-like usage na landing page

---

## S03 · Providers, theme system, TopBar chrome  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Theme toggle okamihite prepína
- [x] TopBar responsive bez overflow
- [x] Pipeline vizuálne čitateľná

---

## S04 · Resizable 3-pane IDE + Left chat skeleton  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Drag resize funguje
- [x] h-dvh minus top/bottom bars
- [x] Left panel štruktúra hotová

---

## S05 · Center file+diff shell + Right preview shell  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Tree+editor viditeľné
- [x] Device switch mení frame
- [x] Light/dark konzistentné

---

## S06 · BottomBar, a11y keyboard baseline, Cmd+K wiring  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] BottomBar fixný
- [x] Theme cycle
- [x] Keyboard targets ≥40px kde ide

---

## S07 · Monaco DiffEditor + Warm Brutalism themes  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Sample diff renders (Monaco DiffEditor + demo proposal)
- [x] Theme switches with app (`cosy-brutal-light` / `cosy-brutal-dark`)
- [x] Typecheck clean, no any

---

## S08 · File tree CRUD + typed Zustand file store  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] CRUD v state (create/rename/delete + Undo toast)
- [x] Strict types + Zod path validation (`src/lib/validations/file-path.ts`)
- [x] Tree sort folders first

---

## S09 · Wire tree↔diff + HitL glass card (Framer Motion)  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Click file opens content
- [x] HitL visible with proposal
- [x] Approve updates content <150ms UI (+ double-submit guard)

---

## S10 · Rejection micro-poll + keyboard HitL hardening  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Modal opens on Reject
- [x] Enter/Esc HitL rules hold (Esc hierarchy + focus trap)
- [x] Data stored in store (`lastRejection` + Zod schema)

---

## S11 · Error boundaries, skeletons, inline hunk actions  
**Spojené:** 21 + 22 · **Status:** ✅ 2026-08-01

### Acceptance
- [x] Crash v jednom paneli neruší IDE (`ErrorBoundary` left/center/right)
- [x] Loading states neat (Monaco + preview skeletons)
- [x] Accept-all works (`DiffActions` + `applyHunk` stub)

**Súbory:** `ResizableIDE.tsx`, `DiffActions.tsx`, `lib/diff.ts`

---

## S12 · WebContainer boot + mount FS + dev server  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Boot + URL or elegant fallback (`lib/webcontainer` + store)
- [x] 0 any; memory cleanup (`tearDown` + abort)
- [x] Logs stream to BottomBar

---

## S13 · Live preview iframe + device frames  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Preview updates after approve (`previewKey`)
- [x] Device sizes correct (mobile/tablet/desktop frames)
- [x] Open-in-new-tab works (blob export)

---

## S14 · Preview controls, inspector placeholder, WC fallback UX  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Controls wired (zoom/refresh/device/external)
- [x] Fallback pretty + actionable (banner + COOP/COEP note)
- [x] No console errors on fallback path

---

## S15 · HitL → FS sync + agent metrics live  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Approve updates preview
- [x] Metrics visible (G0/G1/G2 ms + tokens in BottomBar)
- [x] Status log lines append

---

## S16 · AI SDK providers + G0 Planner agent  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Valid G0 JSON plan
- [x] Zod enforced (`g0PlanSchema` + repair path)
- [x] 0 secrets client-side (`providers.ts` public model ids only)

**Súbory:** `lib/ai/providers.ts`, `lib/ai/g0-planner.ts`, `lib/validations/ai-schemas.ts`

---

## S17 · G1 Coder + G2 Auditor agents  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Clean code map (`g1CodeMapSchema`, concurrency 2 stream)
- [x] Issues list actionable (severity + suggestion)
- [x] Strict TS throughout

**Súbory:** `lib/ai/g1-coder.ts`, `lib/ai/g2-auditor.ts`

---

## S18 · Orchestrator pipeline + live Monaco streaming  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] E2E pipeline demo with mock providers
- [x] Live growing diff (DiffView stream + settled Monaco)
- [x] Zod all outputs

**Súbory:** `lib/ai/orchestrator.ts`, `MonacoDiffEditor.tsx` (no TextModel dispose)

---

## S19 · Abort UX + full chat thread polish  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Stop works no leaks (`AbortController` + throttle cleanup)
- [x] Chat usable + pretty (`ChatThread` + attachments)
- [x] Status badges sync (`AgentStatus`)

**Súbory:** `stores/use-agent-store.ts`, `chat/*`

---

## S20 · Prompt images + Zod logging AiInteractionLog  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Images attach & send (png/jpeg/webp ≤2MB, max 4)
- [x] Zod validates (`promptInputSchema` + `aiInteractionLogInputSchema`)
- [x] Log row created (PGLite `ai_interaction_log` via `logAiInteraction`)

**Súbory:** `migrations/0002_ai_interaction_log.sql`, `lib/ai/log-interaction.ts`

---

## S21 · Prisma/Kysely schema + Better Auth protected routes  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Migrate ok PGLite (`0003_projects_files.sql` + ensure helpers)
- [x] Unauthorized blocked (`authMiddleware` + `/login` + `/api/auth/$`)
- [x] Ownership checks (`assertOwnsProject`)

**Súbory:** `lib/projects/server.ts`, `routes/api/auth/$.ts`, `routes/login.tsx`, `RequireAuth.tsx`

---

## S22 · Project/File CRUD server actions + Stripe billing core  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] CRUD secure (create/update/delete project + upsert/delete file)
- [x] Webhook updates user (`applyStripeWebhookEvent`)
- [x] Checkout session URL returned (mock Pro when no Stripe key)

**Súbory:** `lib/projects/server.ts`, `lib/billing/server.ts`, dashboard New + profile Upgrade

---

## S23 · Usage metering + global Command Palette power features  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Limits enforced (`recordUsage` + token_limit on billing_customers)
- [x] Cmd+K all key actions (nav, approve, stop, publish, device, theme)
- [x] Mobile open via button (TopBar icon)

**Súbory:** `CommandPalette.tsx`, `lib/billing/server.ts`

---

## S24 · PWA foundation + 1-click publish skeleton  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] Manifest valid (`/manifest.webmanifest` linked in root)
- [x] Publish skeleton UX clear (`PublishDialog` + TopBar Publish)
- [x] No broken offline blank screen (`public/sw.js` shell cache)

---

## S25 · A11y audit + security review + launch checklist  
**Status:** ✅ 2026-08-01

### Acceptance
- [x] High a11y keyboard coverage (HitL Enter/Esc, Cmd+K, ≥44px targets)
- [x] Security checklist 100% (no client secrets, ownership, parameterized SQL)
- [x] Build+preview render non-blank (typecheck + smoke all routes)
- [x] Launch-ready demo script (3 min) — `/launch`

---

## Mapping originál → super

| Super | Originály | Stav |
|------|-----------|------|
| S01–S06 | 01–12 | ✅ |
| S07 | 13+14 | ✅ |
| S08 | 15+16 | ✅ |
| S09 | 17+18 | ✅ |
| S10 | 19+20 | ✅ |
| S11 | 21+22 | ✅ |
| S12 | 23+24 | ✅ |
| S13 | 25+26 | ✅ |
| S14 | 27+28 | ✅ |
| S15 | 29+30 | ✅ |
| S16 | 31+32 | ✅ |
| S17 | 33+34 | ✅ |
| S18 | 35+36 | ✅ |
| S19 | 37+38 | ✅ |
| S20 | 39+40 | ✅ |
| S21 | 41+42 | ✅ |
| S22 | 43+44 | ✅ |
| S23 | 45+46 | ✅ |
| S24 | 47+48 | ✅ |
| S25 | 49+50 | ✅ |

**Všetkých 25 super-promptov je hotových.** 🎉
