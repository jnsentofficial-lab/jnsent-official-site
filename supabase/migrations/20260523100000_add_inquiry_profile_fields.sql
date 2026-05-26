alter table public.inquiries
  add column if not exists gender text,
  add column if not exists age text,
  add column if not exists region text,
  add column if not exists available_time text,
  add column if not exists support_label text,
  add column if not exists source text not null default 'bj_support';
