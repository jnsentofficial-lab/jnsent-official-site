create table if not exists public.global_modals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  image_url text,
  col integer not null default 2,
  row integer not null default 2,
  stack_order integer not null default 0,
  dismiss_type text not null default 'none',
  dismiss_days integer,
  starts_at timestamptz,
  ends_at timestamptz,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint global_modals_col_check check (col between 1 and 3),
  constraint global_modals_row_check check (row between 1 and 3),
  constraint global_modals_dismiss_type_check check (dismiss_type in ('none', 'today', 'days')),
  constraint global_modals_dismiss_days_check check (dismiss_days is null or dismiss_days > 0)
);

create trigger set_global_modals_updated_at
before update on public.global_modals
for each row execute function public.set_updated_at();

create index if not exists global_modals_visibility_idx
on public.global_modals (is_visible, starts_at, ends_at, col, row, stack_order);

alter table public.global_modals enable row level security;

create policy "Public can read visible global modals"
on public.global_modals for select
using (
  is_visible = true
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
);

create policy "Admin users can manage global modals"
on public.global_modals for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
