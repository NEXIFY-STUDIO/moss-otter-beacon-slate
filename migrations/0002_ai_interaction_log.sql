-- AiInteractionLog: one row per G0/G1/G2 (or orchestrator) call.
-- user_id is TEXT to match Better Auth user ids and the preview 'dev-user'.

create table if not exists ai_interaction_log (
  id text primary key,
  user_id text not null,
  project_id text not null,
  agent_type text not null,
  model text not null,
  prompt text not null,
  response_summary text,
  latency_ms integer not null default 0,
  tokens integer not null default 0,
  image_count integer not null default 0,
  status text not null default 'ok',
  created_at timestamptz not null default now()
);

create index if not exists ai_interaction_log_user_id_idx
  on ai_interaction_log (user_id);

create index if not exists ai_interaction_log_project_id_idx
  on ai_interaction_log (project_id);

create index if not exists ai_interaction_log_created_at_idx
  on ai_interaction_log (created_at desc);
