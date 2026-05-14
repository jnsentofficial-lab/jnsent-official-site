alter table public.page_contents enable row level security;
alter table public.banners enable row level security;
alter table public.news enable row level security;
alter table public.inquiries enable row level security;
alter table public.assets enable row level security;

create policy "Public can read published page contents"
on public.page_contents for select
using (is_published = true);

create policy "Admin users can manage page contents"
on public.page_contents for all
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
)
with check (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
);

create policy "Public can read published banners"
on public.banners for select
using (is_published = true);

create policy "Admin users can manage banners"
on public.banners for all
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
)
with check (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
);

create policy "Public can read published news"
on public.news for select
using (is_published = true);

create policy "Admin users can manage news"
on public.news for all
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
)
with check (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
);

create policy "Anyone can submit inquiries"
on public.inquiries for insert
with check (status = 'new');

create policy "Admin users can manage inquiries"
on public.inquiries for all
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
)
with check (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
);

create policy "Public can read assets"
on public.assets for select
using (true);

create policy "Admin users can manage assets"
on public.assets for all
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
)
with check (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  or auth.jwt() ->> 'email' = 'to_before@naver.com'
);

create policy "Public can read storage objects"
on storage.objects for select
using (
  bucket_id = 'public-images'
);

create policy "Admin users can upload storage objects"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'public-images'
  and (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or auth.jwt() ->> 'email' = 'to_before@naver.com'
  )
);

create policy "Admin users can update storage objects"
on storage.objects for update
to authenticated
using (
  bucket_id = 'public-images'
  and (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or auth.jwt() ->> 'email' = 'to_before@naver.com'
  )
)
with check (
  bucket_id = 'public-images'
  and (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or auth.jwt() ->> 'email' = 'to_before@naver.com'
  )
);

create policy "Admin users can delete storage objects"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'public-images'
  and (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or auth.jwt() ->> 'email' = 'to_before@naver.com'
  )
);
