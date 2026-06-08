alter table public.inquiries
add column if not exists ip_hash text,
add column if not exists payload_hash text;

create index if not exists inquiries_phone_category_created_idx on public.inquiries (phone, category, created_at desc);
create index if not exists inquiries_ip_hash_created_idx on public.inquiries (ip_hash, created_at desc);
create index if not exists inquiries_payload_hash_created_idx on public.inquiries (payload_hash, created_at desc);
