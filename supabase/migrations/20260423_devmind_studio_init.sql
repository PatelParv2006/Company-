create extension if not exists "pgcrypto";

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  category text not null,
  tech_stack text[] default '{}',
  thumbnail_url text,
  hero_image text,
  live_url text,
  case_study text,
  problem text,
  solution text,
  results text[] default '{}',
  metrics jsonb default '[]'::jsonb,
  screenshots text[] default '{}',
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  timeline text not null,
  deliverables text[] default '{}',
  icon text,
  "order" integer default 0
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  client_name text not null,
  company text not null,
  photo_url text,
  "order" integer default 0
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  project_type text,
  budget text,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text unique not null,
  messages jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists estimator_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  project_type text,
  features text[] default '{}',
  design_quality text,
  timeline text,
  support text,
  estimated_min numeric not null,
  estimated_max numeric not null,
  currency text not null default 'INR',
  created_at timestamptz default now()
);

create table if not exists estimator_subs (
  like estimator_submissions including all
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  thumbnail_url text,
  author text not null,
  tags text[] default '{}',
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists team (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  photo_url text,
  linkedin_url text,
  "order" integer default 0
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  location text not null,
  description text not null,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null
);

insert into settings (key, value)
values
  ('owner_name', '"DevMind Studio"'),
  ('email', '"hello@devmindstudio.com"'),
  ('phone', '"+91 79 4892 1188"'),
  ('address', '"Prahladnagar Corporate Road, Ahmedabad, Gujarat 380015, India"'),
  ('city', '"Ahmedabad"'),
  ('map_query', '"Prahladnagar Ahmedabad Gujarat India"'),
  ('default_currency', '"INR"'),
  ('admin_emails', '["admin@devmindstudio.com"]'::jsonb)
on conflict (key) do nothing;
