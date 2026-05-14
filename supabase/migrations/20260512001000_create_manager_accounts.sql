create table public.manager_accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default 'manager',
  login_id text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint manager_accounts_role_check check (role in ('manager', 'admin', 'viewer'))
);

create trigger set_manager_accounts_updated_at
before update on public.manager_accounts
for each row execute function public.set_updated_at();

create index manager_accounts_role_created_idx on public.manager_accounts (role, created_at desc);

alter table public.manager_accounts enable row level security;

create policy "Admin users can manage manager accounts"
on public.manager_accounts for all
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
)
with check (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
);
