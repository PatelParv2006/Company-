-- Update settings table with new keys
insert into settings (key, value)
values
  ('company_tagline', '"Premium software for teams that need more than a template."'),
  ('chatbot_system_prompt', '"You are DevMind Studio''s AI assistant. You help potential clients understand our services, estimate project costs, and get in touch with our team. Always be professional, friendly, and helpful. If asked for contact info, provide the owner''s phone and email from settings. If unsure, say ''Let me connect you with our team'' and show the contact form link."'),
  ('social_links', '{"github": "https://github.com/devmindstudio", "linkedin": "https://linkedin.com/company/devmindstudio", "twitter": "https://twitter.com/devmindstudio", "instagram": "https://instagram.com/devmindstudio"}'::jsonb)
on conflict (key) do nothing;

-- Ensure all required tables exist (based on request)
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  category text not null,
  tech_stack text[] default '{}',
  thumbnail_url text,
  live_url text,
  case_study text,
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
  message text not null,
  created_at timestamptz default now()
);

create table if not exists chat_logs (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  messages jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists estimator_submissions (
  id uuid primary key default gen_random_uuid(),
  project_type text,
  features text[] default '{}',
  design_quality text,
  timeline text,
  support_plan text,
  total_estimate numeric,
  currency text,
  contact_info jsonb,
  created_at timestamptz default now()
);

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  photo_url text,
  linkedin_url text,
  "order" integer default 0
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  thumbnail_url text,
  published boolean default false,
  created_at timestamptz default now()
);
