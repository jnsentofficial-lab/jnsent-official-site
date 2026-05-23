alter table public.manager_accounts
add column if not exists auth_user_id uuid unique references auth.users(id) on delete set null;

create index if not exists manager_accounts_auth_user_idx
on public.manager_accounts (auth_user_id);
