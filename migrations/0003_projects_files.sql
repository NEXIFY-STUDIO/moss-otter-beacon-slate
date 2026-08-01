-- Projects + files with ownership (user_id TEXT matches Better Auth / dev-user).

create table if not exists projects (
  id text primary key,
  user_id text not null,
  title text not null,
  description text not null default '',
  is_public boolean not null default false,
  settings_json text not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_user_id_idx on projects (user_id);
create index if not exists projects_updated_at_idx on projects (updated_at desc);

create table if not exists project_files (
  id text primary key,
  project_id text not null references projects (id) on delete cascade,
  user_id text not null,
  path text not null,
  content text not null default '',
  language text not null default 'txt',
  updated_at timestamptz not null default now(),
  unique (project_id, path)
);

create index if not exists project_files_project_id_idx on project_files (project_id);
create index if not exists project_files_user_id_idx on project_files (user_id);

create table if not exists usage_events (
  id text primary key,
  user_id text not null,
  project_id text,
  kind text not null,
  tokens integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists usage_events_user_id_idx on usage_events (user_id);
create index if not exists usage_events_created_at_idx on usage_events (created_at desc);

create table if not exists billing_customers (
  user_id text primary key,
  stripe_customer_id text,
  plan text not null default 'free',
  status text not null default 'inactive',
  token_limit integer not null default 50000,
  tokens_used integer not null default 0,
  updated_at timestamptz not null default now()
);
