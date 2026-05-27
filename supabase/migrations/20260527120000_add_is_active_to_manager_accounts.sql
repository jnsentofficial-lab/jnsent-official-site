alter table public.manager_accounts
add column if not exists is_active boolean not null default true;
