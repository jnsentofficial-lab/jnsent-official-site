alter table public.global_modals
add column if not exists creator_name text not null default '관리자';
