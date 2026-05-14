create table public.inquiry_comments (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.inquiries(id) on delete cascade,
  manager_name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index inquiry_comments_inquiry_created_idx
on public.inquiry_comments (inquiry_id, created_at desc);

alter table public.inquiry_comments enable row level security;

create policy "Admin users can manage inquiry comments"
on public.inquiry_comments for all
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
)
with check (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
);
