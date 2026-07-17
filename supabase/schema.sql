-- Agentory schema: categories + tools, matching lib/types.ts (Category, Tool).
-- Run this once in the Supabase SQL Editor, then run seed.sql.

create table if not exists public.categories (
  slug text primary key,
  name text not null,
  description text not null,
  icon text not null
);

create table if not exists public.tools (
  slug text primary key,
  name text not null,
  tagline text not null,
  description text not null,
  category_slugs text[] not null default '{}',
  pricing text not null check (pricing in ('free', 'freemium', 'paid', 'open-source')),
  price_from text,
  website text not null,
  features text[] not null default '{}',
  featured boolean not null default false,
  rating numeric,
  review_count integer
);

create index if not exists tools_category_slugs_idx on public.tools using gin (category_slugs);

-- This is a public directory with no auth — every row is readable by anyone
-- with the anon key. Enable RLS and explicitly allow public SELECT only;
-- there are no insert/update/delete policies, so writes require the
-- Supabase dashboard or a service-role key, never the anon client.
alter table public.categories enable row level security;
alter table public.tools enable row level security;

drop policy if exists "Public read access" on public.categories;
create policy "Public read access" on public.categories
  for select using (true);

drop policy if exists "Public read access" on public.tools;
create policy "Public read access" on public.tools
  for select using (true);
