alter table public.inquiries
add column if not exists message_body jsonb;

alter table public.inquiry_comments
add column if not exists message_body jsonb;
