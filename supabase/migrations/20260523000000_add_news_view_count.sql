alter table public.news
add column if not exists view_count integer not null default 0
check (view_count >= 0);

create table if not exists public.news_view_logs (
  id uuid primary key default gen_random_uuid(),
  news_id uuid not null references public.news(id) on delete cascade,
  ip_address inet not null,
  viewed_at timestamptz not null default now(),
  unique (news_id, ip_address)
);

create index if not exists news_view_logs_news_id_idx
on public.news_view_logs (news_id);

alter table public.news_view_logs enable row level security;

create policy "Admin users can read news view logs"
on public.news_view_logs for select
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') in ('manager', 'admin')
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
);

create or replace function public.increment_news_view_once(target_news_id uuid, viewer_ip inet)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_count integer;
  latest_view_count integer;
begin
  insert into public.news_view_logs (news_id, ip_address)
  values (target_news_id, viewer_ip)
  on conflict (news_id, ip_address) do nothing;

  get diagnostics inserted_count = row_count;

  if inserted_count > 0 then
    update public.news
    set view_count = view_count + 1
    where id = target_news_id
      and is_published = true
    returning view_count into latest_view_count;
  else
    select view_count
    into latest_view_count
    from public.news
    where id = target_news_id;
  end if;

  return coalesce(latest_view_count, 0);
end;
$$;

revoke execute on function public.increment_news_view_once(uuid, inet) from public;
grant execute on function public.increment_news_view_once(uuid, inet) to service_role;
