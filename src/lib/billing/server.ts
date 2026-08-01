import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type BillingPlan = {
  plan: string;
  status: string;
  tokenLimit: number;
  tokensUsed: number;
  remaining: number;
};

async function ensureBilling(): Promise<void> {
  const sql = await getSql();
  await sql.query(`
    create table if not exists billing_customers (
      user_id text primary key,
      stripe_customer_id text,
      plan text not null default 'free',
      status text not null default 'inactive',
      token_limit integer not null default 50000,
      tokens_used integer not null default 0,
      updated_at timestamptz not null default now()
    )
  `);
  await sql.query(`
    create table if not exists usage_events (
      id text primary key,
      user_id text not null,
      project_id text,
      kind text not null,
      tokens integer not null default 0,
      created_at timestamptz not null default now()
    )
  `);
}

async function getOrCreateBilling(userId: string): Promise<BillingPlan> {
  await ensureBilling();
  const sql = await getSql();
  const rows = await sql<{
    plan: string;
    status: string;
    token_limit: number;
    tokens_used: number;
  }>`
    select plan, status, token_limit, tokens_used
    from billing_customers where user_id = ${userId} limit 1
  `;
  if (rows[0]) {
    const r = rows[0];
    const tokenLimit = Number(r.token_limit);
    const tokensUsed = Number(r.tokens_used);
    return {
      plan: String(r.plan),
      status: String(r.status),
      tokenLimit,
      tokensUsed,
      remaining: Math.max(0, tokenLimit - tokensUsed),
    };
  }
  await sql`
    insert into billing_customers (user_id, plan, status, token_limit, tokens_used)
    values (${userId}, 'free', 'active', 50000, 0)
  `;
  return {
    plan: "free",
    status: "active",
    tokenLimit: 50000,
    tokensUsed: 0,
    remaining: 50000,
  };
}

export const getBillingStatus = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<BillingPlan> => {
    return getOrCreateBilling(context.userId);
  });

export const recordUsage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: unknown) =>
    z
      .object({
        projectId: z.string().optional(),
        kind: z.string().min(1).max(64),
        tokens: z.number().int().min(0).max(1_000_000),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const billing = await getOrCreateBilling(context.userId);
    if (billing.tokensUsed + data.tokens > billing.tokenLimit) {
      throw new Error(
        `Usage limit exceeded (${billing.tokensUsed}/${billing.tokenLimit} tokens). Upgrade plan.`,
      );
    }
    const sql = await getSql();
    const id = crypto.randomUUID();
    await sql`
      insert into usage_events (id, user_id, project_id, kind, tokens)
      values (
        ${id},
        ${context.userId},
        ${data.projectId ?? null},
        ${data.kind},
        ${data.tokens}
      )
    `;
    await sql`
      update billing_customers
      set tokens_used = tokens_used + ${data.tokens}, updated_at = now()
      where user_id = ${context.userId}
    `;
    const next = await getOrCreateBilling(context.userId);
    return { ok: true as const, usage: next };
  });

/**
 * Create Stripe Checkout session URL.
 * Without STRIPE_SECRET_KEY returns a mock checkout URL for demo UX.
 */
export const createCheckoutSession = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data: unknown) =>
    z
      .object({
        priceId: z.string().optional(),
        successUrl: z.string().url().optional(),
        cancelUrl: z.string().url().optional(),
      })
      .parse(data ?? {}),
  )
  .handler(async ({ data, context }) => {
    await ensureBilling();
    const sql = await getSql();
    const secret = process.env.STRIPE_SECRET_KEY?.trim();
    const appUrl =
      process.env.VITE_APP_URL?.trim() ||
      process.env.BETTER_AUTH_URL?.trim() ||
      "http://localhost:8080";

    if (!secret) {
      // Mock checkout — marks user as pro for demo
      await sql`
        insert into billing_customers (user_id, plan, status, token_limit, tokens_used)
        values (${context.userId}, 'pro', 'active', 500000, 0)
        on conflict (user_id) do update set
          plan = 'pro',
          status = 'active',
          token_limit = 500000,
          updated_at = now()
      `;
      return {
        url: `${appUrl}/profile?checkout=mock_success`,
        mock: true as const,
      };
    }

    // Real Stripe path (when key present)
    const successUrl =
      data.successUrl ?? `${appUrl}/profile?checkout=success`;
    const cancelUrl = data.cancelUrl ?? `${appUrl}/profile?checkout=cancel`;
    const body = new URLSearchParams();
    body.set("mode", "subscription");
    body.set("success_url", successUrl);
    body.set("cancel_url", cancelUrl);
    body.set("client_reference_id", context.userId);
    body.set(
      "line_items[0][price]",
      data.priceId ?? process.env.STRIPE_PRICE_ID ?? "price_cosy_pro",
    );
    body.set("line_items[0][quantity]", "1");

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Stripe error: ${text.slice(0, 200)}`);
    }
    const json = (await res.json()) as { id: string; url: string };
    await sql`
      insert into billing_customers (user_id, plan, status, token_limit, tokens_used)
      values (${context.userId}, 'free', 'checkout_pending', 50000, 0)
      on conflict (user_id) do update set
        status = 'checkout_pending',
        updated_at = now()
    `;
    return { url: json.url, mock: false as const, sessionId: json.id };
  });

/**
 * Stripe webhook handler helper — updates plan from checkout.session.completed.
 * Called from route if configured.
 */
export async function applyStripeWebhookEvent(event: {
  type: string;
  data: { object: Record<string, unknown> };
}): Promise<{ ok: boolean }> {
  await ensureBilling();
  const sql = await getSql();
  if (event.type === "checkout.session.completed") {
    const obj = event.data.object;
    const userId = String(obj.client_reference_id ?? "");
    const customerId =
      typeof obj.customer === "string" ? obj.customer : null;
    if (!userId) return { ok: false };
    await sql`
      insert into billing_customers (
        user_id, stripe_customer_id, plan, status, token_limit, tokens_used
      ) values (
        ${userId}, ${customerId}, 'pro', 'active', 500000, 0
      )
      on conflict (user_id) do update set
        stripe_customer_id = coalesce(excluded.stripe_customer_id, billing_customers.stripe_customer_id),
        plan = 'pro',
        status = 'active',
        token_limit = 500000,
        updated_at = now()
    `;
    return { ok: true };
  }
  return { ok: true };
}
