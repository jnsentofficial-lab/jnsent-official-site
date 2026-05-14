create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.page_contents (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  body jsonb not null default '{}'::jsonb,
  seo_title text,
  seo_description text,
  og_image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_page_contents_updated_at
before update on public.page_contents
for each row execute function public.set_updated_at();

create table public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_url text not null,
  link_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_banners_updated_at
before update on public.banners
for each row execute function public.set_updated_at();

create table public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  body jsonb not null default '{}'::jsonb,
  thumbnail_url text,
  seo_title text,
  seo_description text,
  is_published boolean not null default true,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_news_updated_at
before update on public.news
for each row execute function public.set_updated_at();

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  category text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inquiries_status_check check (status in ('new', 'in_progress', 'done', 'spam'))
);

create trigger set_inquiries_updated_at
before update on public.inquiries
for each row execute function public.set_updated_at();

create table public.assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  url text not null,
  mime_type text not null,
  size_bytes integer not null,
  alt text,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);

create index page_contents_published_idx on public.page_contents (is_published, slug);
create index banners_published_sort_idx on public.banners (is_published, sort_order);
create index news_published_at_idx on public.news (is_published, published_at desc);
create index inquiries_status_created_idx on public.inquiries (status, created_at desc);
