insert into public.page_contents (
  slug,
  title,
  description,
  body,
  seo_title,
  seo_description,
  is_published
)
values
  (
    'home',
    '메인',
    '기업/엔터테인먼트 홍보 사이트 메인 페이지',
    '{"sections":[]}'::jsonb,
    '메인',
    '기업/엔터테인먼트 홍보 사이트입니다.',
    true
  ),
  (
    'about',
    '회사소개',
    '회사소개 페이지',
    '{"sections":[]}'::jsonb,
    '회사소개',
    '회사의 소개와 핵심 가치를 안내합니다.',
    true
  ),
  (
    'setupGuide',
    '프로그램 세팅안내',
    '프로그램 세팅안내 페이지',
    '{"sections":[]}'::jsonb,
    '프로그램 세팅안내',
    '방송 및 운영 프로그램 세팅을 안내합니다.',
    true
  ),
  (
    'equipmentRental',
    '장비렌탈',
    '장비렌탈 페이지',
    '{"sections":[]}'::jsonb,
    '장비렌탈',
    '방송 및 콘텐츠 제작 장비 렌탈을 안내합니다.',
    true
  ),
  (
    'studioRental',
    '스튜디오 대여',
    '스튜디오 대여 페이지',
    '{"sections":[]}'::jsonb,
    '스튜디오 대여',
    '콘텐츠 제작을 위한 스튜디오 대여를 안내합니다.',
    true
  ),
  (
    'bjSupport',
    'BJ 지원 및 상담',
    'BJ 지원 및 상담 페이지',
    '{"sections":[]}'::jsonb,
    'BJ 지원 및 상담',
    'BJ 지원과 상담 신청 정보를 안내합니다.',
    true
  ),
  (
    'consulting',
    '엔터창업컨설팅',
    '엔터창업컨설팅 페이지',
    '{"sections":[]}'::jsonb,
    '엔터창업컨설팅',
    '엔터테인먼트 창업 컨설팅 서비스를 안내합니다.',
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  is_published = excluded.is_published;

insert into public.banners (
  title,
  subtitle,
  image_url,
  link_url,
  sort_order,
  is_published
)
values (
  '콘텐츠 비즈니스를 위한 운영 파트너',
  '방송 세팅부터 스튜디오, 장비, 컨설팅까지 한 번에 관리합니다.',
  '/images/placeholders/main-banner.webp',
  null,
  1,
  true
);

insert into public.news (
  slug,
  title,
  summary,
  body,
  thumbnail_url,
  seo_title,
  seo_description,
  is_published,
  published_at
)
values (
  'welcome',
  'NEWS 준비 중입니다',
  '새로운 소식을 곧 업데이트하겠습니다.',
  '{"content":[]}'::jsonb,
  null,
  'NEWS 준비 중입니다',
  '새로운 소식을 곧 업데이트하겠습니다.',
  true,
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  summary = excluded.summary,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  is_published = excluded.is_published;
