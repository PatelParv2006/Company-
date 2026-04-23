-- Seed production-ready content for homepage and listings.
-- Safe to re-run: uses UPSERT on unique slugs.

insert into projects (
  slug,
  title,
  description,
  category,
  tech_stack,
  thumbnail_url,
  hero_image,
  live_url,
  case_study,
  problem,
  solution,
  results,
  metrics,
  screenshots,
  featured
)
values
(
  'billing-web-application',
  'Billing Web Application',
  'A modern invoicing + billing platform with role-based access, payment tracking, and clean operational reporting.',
  'Web App',
  array['Next.js','TypeScript','Supabase','PostgreSQL','Stripe','Tailwind'],
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2200&q=80',
  'https://example.com/billing-web-application',
  'Built an internal-grade billing system that feels like a consumer product: fast search, accurate totals, and audit-friendly exports.',
  'Finance teams needed reliable invoicing and reconciliation without spreadsheet chaos, with strict permissions and a clear audit trail.',
  'We designed a role-aware workflow, implemented invoice lifecycle states, PDF generation, ledger-style tracking, and Stripe payment reconciliation.',
  array[
    'Reduced billing cycle time by streamlining invoice creation and approvals.',
    'Improved collections visibility with payment status + aging views.',
    'Created audit-friendly exports and immutable invoice history.'
  ],
  '[
    {"label":"Invoice creation time","value":"-60%"},
    {"label":"Payment status accuracy","value":"99%+"},
    {"label":"Ops hours saved","value":"10+/week"}
  ]'::jsonb,
  array[
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=80',
    'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1800&q=80'
  ],
  true
),
(
  'ecommerce-platform',
  'E-Commerce Platform',
  'A conversion-focused storefront with a robust admin panel for products, inventory, promotions, and order lifecycle tracking.',
  'E-Commerce',
  array['Next.js','React','TypeScript','PostgreSQL','Supabase','Stripe'],
  'https://images.unsplash.com/photo-1557825835-70d97c4aa567?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1557825835-70d97c4aa567?auto=format&fit=crop&w=2200&q=80',
  'https://example.com/ecommerce-platform',
  'Designed a storefront that loads fast, guides purchasing decisions, and gives operators a clean system for fulfillment.',
  'The business needed a scalable store with reliable checkout, inventory accuracy, and tools for promotions and customer support.',
  'We implemented product/catalog architecture, cart/checkout flows, Stripe payments, and an admin area for inventory + orders.',
  array[
    'Improved cart-to-checkout flow clarity with friction-reducing UI.',
    'Added inventory and order state tooling for reliable fulfillment.',
    'Implemented promotional mechanics with coupon and discount support.'
  ],
  '[
    {"label":"Checkout completion","value":"+18%"},
    {"label":"Page load (p95)","value":"<1.2s"},
    {"label":"Admin time saved","value":"6 hrs/week"}
  ]'::jsonb,
  array[
    'https://images.unsplash.com/photo-1557825835-70d97c4aa567?auto=format&fit=crop&w=1800&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1800&q=80'
  ],
  true
),
(
  'saas-analytics-dashboard',
  'SaaS Analytics Dashboard',
  'A multi-tenant analytics dashboard with fast filters, clear cohort views, and exportable insights for product teams.',
  'SaaS',
  array['Next.js','TypeScript','PostgreSQL','Supabase','Recharts','RLS'],
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2200&q=80',
  'https://example.com/saas-analytics-dashboard',
  'Built a metrics surface that leaders trust: consistent definitions, clean segmentation, and fast drill-downs.',
  'Stakeholders lacked reliable answers to growth and retention questions due to inconsistent metrics and slow reporting.',
  'We aligned metric definitions, implemented multi-tenant data modeling, built interactive dashboards, and added exports for ops workflows.',
  array[
    'Created a single source of truth for product KPIs.',
    'Improved dashboard responsiveness with query + rendering optimizations.',
    'Enabled self-serve reporting with exports and saved filters.'
  ],
  '[
    {"label":"Report turnaround","value":"Hours → Minutes"},
    {"label":"Tenant isolation","value":"RLS enforced"},
    {"label":"Dashboards shipped","value":"12"}
  ]'::jsonb,
  array[
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80'
  ],
  true
),
(
  'hospital-management',
  'Hospital Management System',
  'Operations software for patient intake, scheduling, billing coordination, and role-based staff workflows.',
  'Enterprise',
  array['Next.js','TypeScript','PostgreSQL','Supabase','RBAC','Audit Logs'],
  'https://images.unsplash.com/photo-1580281657527-47f249e8f44f?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1580281657527-47f249e8f44f?auto=format&fit=crop&w=2200&q=80',
  'https://example.com/hospital-management',
  'Delivered a workflow-first system that reduces administrative friction while keeping sensitive data secure.',
  'Staff needed an operational system to unify scheduling, patient records, and billing handoffs without compromising privacy.',
  'We designed role-based flows, built a scheduling core, standardized patient intake, and added audit-friendly change history.',
  array[
    'Streamlined patient intake with structured forms and validations.',
    'Reduced scheduling conflicts with unified availability rules.',
    'Improved accountability via audit history on critical records.'
  ],
  '[
    {"label":"Appointment conflicts","value":"-35%"},
    {"label":"Intake completeness","value":"+25%"},
    {"label":"Roles supported","value":"8"}
  ]'::jsonb,
  array[
    'https://images.unsplash.com/photo-1580281657527-47f249e8f44f?auto=format&fit=crop&w=1800&q=80',
    'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1800&q=80'
  ],
  true
),
(
  'real-estate-portal',
  'Real Estate Portal',
  'A listings platform with advanced search, map-first browsing, lead capture, and agent dashboards.',
  'Web App',
  array['Next.js','TypeScript','PostgreSQL','Supabase','Maps','SEO'],
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2200&q=80',
  'https://example.com/real-estate-portal',
  'Created a fast, search-driven portal that helps buyers discover properties and helps agents qualify leads efficiently.',
  'The business needed reliable search and lead capture with a UI that feels premium and performs on mobile.',
  'We built filtering + saved searches, optimized images and SEO, and added agent tools for lead management and follow-ups.',
  array[
    'Improved mobile browsing experience with faster filtering.',
    'Increased lead capture with clearer intent-driven CTAs.',
    'Built agent workflows to manage incoming leads efficiently.'
  ],
  '[
    {"label":"Search response","value":"<300ms"},
    {"label":"Lead capture","value":"+22%"},
    {"label":"Listings indexed","value":"50k+"}
  ]'::jsonb,
  array[
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80',
    'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1800&q=80'
  ],
  true
),
(
  'ai-content-generator',
  'AI Content Generator',
  'An AI-assisted writing workflow with brand voice controls, review queues, and export-ready outputs for marketing teams.',
  'AI',
  array['Next.js','TypeScript','Python','LLM','Vector DB','Supabase'],
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2200&q=80',
  'https://example.com/ai-content-generator',
  'Built an AI workflow that supports production writing: constraints, review, and repeatable quality.',
  'Teams needed consistent content output without losing brand voice or spending hours on manual rewriting.',
  'We implemented prompt templates, style controls, review queues, and export formats while logging usage for iteration and governance.',
  array[
    'Accelerated first-draft creation while keeping brand consistency.',
    'Added review workflows to keep humans in control.',
    'Improved reuse via templates and saved brand voice settings.'
  ],
  '[
    {"label":"Time to first draft","value":"-70%"},
    {"label":"Editorial iterations","value":"-30%"},
    {"label":"Templates shipped","value":"25+"}
  ]'::jsonb,
  array[
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1800&q=80',
    'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1800&q=80'
  ],
  true
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  tech_stack = excluded.tech_stack,
  thumbnail_url = excluded.thumbnail_url,
  hero_image = excluded.hero_image,
  live_url = excluded.live_url,
  case_study = excluded.case_study,
  problem = excluded.problem,
  solution = excluded.solution,
  results = excluded.results,
  metrics = excluded.metrics,
  screenshots = excluded.screenshots,
  featured = excluded.featured;

insert into blog_posts (
  slug,
  title,
  excerpt,
  content,
  thumbnail_url,
  author,
  tags,
  published
)
values
(
  'how-to-scope-a-saas-mvp-in-2025',
  'How to scope a SaaS MVP in 2025',
  'A practical scoping playbook for founders: what to ship first, what to postpone, and how to avoid costly rebuilds.',
  $$Scoping is the difference between “we shipped” and “we shipped something users adopt.”

This guide is written for founders and product leads planning a SaaS MVP in 2025. The goal is not to build less—it’s to build the right surface area first, with architecture that won’t paint you into a corner.

## 1) Start with the workflow, not the feature list
Write the primary user journey end to end (one job to be done). If you can’t describe the workflow in 10 sentences, your feature list is premature.

## 2) Define “MVP” as the minimum *valuable* product
An MVP should solve a real problem for a narrow set of users. If you need “everyone” to love it, it’s not an MVP.

## 3) Choose constraints deliberately
- One persona first
- One payment model (if any)
- One analytics truth source
- One admin workflow

## 4) Include the unsexy production essentials
Authentication, audit trails (where needed), safe data models, basic monitoring, and clean error states. These are the features that protect velocity.

## 5) Plan for iteration
Ship a reliable v1, measure adoption, then expand. You’ll move faster by learning than by guessing.

If you want a fast range, use our estimator and we’ll validate scope in a free consultation.$$,
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
  'DevMind Studio',
  array['SaaS','Product','MVP'],
  true
),
(
  'nextjs-vs-remix-which-for-your-startup',
  'Next.js vs Remix: Which for your startup?',
  'Both are excellent. The right choice depends on team shape, routing needs, data patterns, and deployment constraints.',
  $$Choosing between Next.js and Remix is less about hype and more about how your product fetches data, renders pages, and evolves.

## When Next.js is the better fit
- You want a broad ecosystem and hosting flexibility
- You need hybrid rendering patterns (static + dynamic)
- You value conventions that scale across larger teams

## When Remix shines
- You want “web platform first” primitives (forms, loaders, actions)
- Your app leans heavily on server-driven UI and progressive enhancement
- You want very explicit data dependencies per route

## The practical recommendation
For most startups building marketing + app surfaces in one repo, Next.js is the default choice. If your app is heavily form-driven and server-centric, Remix can be a great fit.

Either way, architecture and delivery discipline matter more than framework choice.$$,
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1600&q=80',
  'DevMind Studio',
  array['Next.js','Remix','Architecture'],
  true
),
(
  'the-real-cost-of-custom-software-development',
  'The real cost of custom software development',
  'Custom software pricing isn’t just code—it’s risk management, delivery systems, QA, design, and long-term maintainability.',
  $$When people ask “How much does custom software cost?”, the honest answer is: it depends on the *risk* you’re paying to remove.

## What actually drives cost
- Scope: features, integrations, edge cases
- Quality bar: UX polish, accessibility, performance
- Security: auth, permissions, compliance needs
- Data complexity: multi-tenancy, reporting, migrations
- Delivery: QA, environments, monitoring, support

## How to get a reliable estimate
Use a range, then narrow it with discovery. A high-quality team will surface assumptions and trade-offs early.

If you want a fast starting range, use our estimator—then we’ll confirm scope in a free consultation.$$,
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
  'DevMind Studio',
  array['Pricing','Delivery','Engineering'],
  true
)
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  thumbnail_url = excluded.thumbnail_url,
  author = excluded.author,
  tags = excluded.tags,
  published = excluded.published;

