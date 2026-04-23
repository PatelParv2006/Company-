import { cache } from "react";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export type SiteSettings = {
  ownerName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  mapQuery: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  aiSystemPrompt: string;
  defaultCurrency: "INR" | "USD" | "EUR" | "GBP";
  googleAnalyticsId: string;
  adminEmails: string[];
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Web App" | "SaaS" | "Mobile" | "Admin" | "AI";
  techStack: string[];
  thumbnailUrl: string;
  heroImage: string;
  liveUrl: string;
  featured: boolean;
  problem: string;
  solution: string;
  results: string[];
  metrics: ProjectMetric[];
  screenshots: string[];
  caseStudy: string;
  createdAt: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnailUrl: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  linkedinUrl: string;
  order: number;
};

export type JobListing = {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  active: boolean;
  createdAt: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  timeline: string;
  deliverables: string[];
  icon: string;
  order: number;
};

export type TestimonialItem = {
  id: string;
  quote: string;
  clientName: string;
  company: string;
  photoUrl: string;
  order: number;
};

type SettingsRow = {
  key: string;
  value: unknown;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://devmindstudio.vercel.app";

function encodeSvg(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createGradientImage(
  title: string,
  subtitle: string,
  colors: [string, string]
) {
  const safeTitle = title.replace(/&/g, "&amp;");
  const safeSubtitle = subtitle.replace(/&/g, "&amp;");

  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${colors[0]}" />
          <stop offset="100%" stop-color="${colors[1]}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="720" rx="48" fill="url(#bg)" />
      <circle cx="1040" cy="140" r="140" fill="rgba(255,255,255,0.12)" />
      <circle cx="170" cy="590" r="120" fill="rgba(255,255,255,0.10)" />
      <rect x="86" y="84" width="1028" height="552" rx="36" fill="rgba(10,10,15,0.22)" stroke="rgba(255,255,255,0.18)" />
      <text x="110" y="210" fill="#e5efff" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="8">${safeSubtitle}</text>
      <text x="110" y="330" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="800">${safeTitle}</text>
      <text x="110" y="412" fill="rgba(255,255,255,0.72)" font-family="Arial, Helvetica, sans-serif" font-size="28">DevMind Studio Case Study</text>
    </svg>
  `);
}

const defaultSettings: SiteSettings = {
  ownerName: "DevMind Studio",
  tagline: "Premium software for teams that need more than a template.",
  email: "hello@devmindstudio.com",
  phone: "+91 79 4892 1188",
  address: "Prahladnagar Corporate Road, Ahmedabad, Gujarat 380015, India",
  city: "Ahmedabad",
  mapQuery: "Prahladnagar Ahmedabad Gujarat India",
  socialLinks: {
    github: "https://github.com/devmindstudio",
    linkedin: "https://www.linkedin.com/company/devmindstudio",
    twitter: "https://twitter.com/devmindstudio",
    instagram: "https://www.instagram.com/devmindstudio",
  },
  aiSystemPrompt:
    "You are DevMind Studio's AI assistant. You help potential clients understand our services, estimate project costs, and get in touch with our team. Always be professional, friendly, and helpful. If asked for contact info, provide the owner's phone and email from settings. If unsure, say 'Let me connect you with our team' and show the contact form link.",
  defaultCurrency: "INR",
  googleAnalyticsId: "",
  adminEmails: ["admin@devmindstudio.com"],
};

const projectFallbacks: ProjectItem[] = [];

const blogFallbacks: BlogPost[] = [];

const teamFallbacks: TeamMember[] = [];

const jobFallbacks: JobListing[] = [];

const serviceFallbacks: ServiceItem[] = [
  {
    id: "service-1",
    title: "SaaS Web Application Development",
    description: "Custom SaaS web applications built with modern technologies. Includes authentication, dashboards, billing systems, and scalable architecture.",
    timeline: "2–6 weeks",
    deliverables: ["UI Design", "Frontend", "Backend API", "Database", "Authentication", "Deployment"],
    icon: "sparkles",
    order: 1,
  },
  {
    id: "service-2",
    title: "Business Website Development",
    description: "Professional websites for businesses to showcase services, generate leads, and improve online presence.",
    timeline: "1–2 weeks",
    deliverables: ["Responsive UI", "SEO Setup", "Contact Forms", "Deployment"],
    icon: "globe",
    order: 2,
  },
  {
    id: "service-3",
    title: "Billing & Invoice System",
    description: "Custom billing software for managing invoices, customers, payments, and reports.",
    timeline: "2–4 weeks",
    deliverables: ["Dashboard", "Invoice Generator", "Payment Integration", "Reports"],
    icon: "file-text",
    order: 3,
  },
  {
    id: "service-4",
    title: "Booking System Application",
    description: "Online booking systems for appointments, services, or events with real-time availability.",
    timeline: "2–3 weeks",
    deliverables: ["Booking UI", "Admin Panel", "Notifications", "Database"],
    icon: "calendar",
    order: 4,
  },
  {
    id: "service-5",
    title: "Admin Dashboard Development",
    description: "Modern admin panels with analytics, user management, and data visualization.",
    timeline: "1–3 weeks",
    deliverables: ["Dashboard UI", "Charts", "User Management", "API Integration"],
    icon: "layout",
    order: 5,
  },
  {
    id: "service-6",
    title: "E-commerce Web Application",
    description: "Complete online store with product management, cart system, and payment integration.",
    timeline: "3–5 weeks",
    deliverables: ["Product Pages", "Cart", "Payment Gateway", "Admin Panel"],
    icon: "shopping-cart",
    order: 6,
  },
  {
    id: "service-7",
    title: "API Development & Integration",
    description: "Secure and scalable APIs for web and mobile applications, including third-party integrations.",
    timeline: "1–2 weeks",
    deliverables: ["REST API", "Documentation", "Authentication", "Testing"],
    icon: "database",
    order: 7,
  },
  {
    id: "service-8",
    title: "Landing Page for Lead Generation",
    description: "High-converting landing pages designed to capture leads and increase sales.",
    timeline: "3–7 days",
    deliverables: ["UI Design", "Responsive Page", "Form Integration", "Deployment"],
    icon: "zap",
    order: 8,
  },
];

const testimonialFallbacks: TestimonialItem[] = [];

function safeJsonParse<T>(value: unknown, fallback: T): T {
  if (value == null) {
    return fallback;
  }

  if (typeof value === "object") {
    return value as T;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }

  return fallback;
}

function normalizeProject(input: Record<string, unknown>): ProjectItem {
  const inputSlug = String(input.slug || "");
  const inputTitle = String(input.title || "");
  const generatedSlug = inputTitle.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  
  const slug = inputSlug || generatedSlug || String(input.id || "temp-slug");
  const fallbackFound = projectFallbacks.find((project) => project.slug === slug);

  return {
    id: String(input.id || (fallbackFound?.id ?? "temp-id")),
    slug: slug,
    title: String(input.title || (fallbackFound?.title ?? "Untitled Project")),
    description: String(input.description || (fallbackFound?.description ?? "")),
    category: (input.category as ProjectItem["category"]) || (fallbackFound?.category ?? "Web App"),
    techStack: safeJsonParse<string[]>(
      input.tech_stack || input.techStack,
      fallbackFound?.techStack ?? []
    ),
    thumbnailUrl: String(
      input.thumbnail_url || input.thumbnailUrl || input.image_url || (fallbackFound?.thumbnailUrl ?? "")
    ),
    heroImage: String(
      input.hero_image || input.heroImage || input.image_url || (fallbackFound?.heroImage ?? "")
    ),
    liveUrl: String(input.live_url || input.liveUrl || (fallbackFound?.liveUrl ?? "")),
    featured: Boolean(
      input.featured ?? input.is_featured ?? input.featured_project ?? (fallbackFound?.featured ?? false)
    ),
    problem: String(input.problem || (fallbackFound?.problem ?? "")),
    solution: String(input.solution || (fallbackFound?.solution ?? "")),
    results: safeJsonParse<string[]>(input.results, fallbackFound?.results ?? []),
    metrics: safeJsonParse<ProjectMetric[]>(input.metrics, fallbackFound?.metrics ?? []),
    screenshots: safeJsonParse<string[]>(input.screenshots, fallbackFound?.screenshots ?? []),
    caseStudy: String(input.case_study || input.caseStudy || input.case_study_content || (fallbackFound?.caseStudy ?? "")),
    createdAt: String(input.created_at || (fallbackFound?.createdAt ?? new Date().toISOString())),
  };
}

function normalizeBlogPost(input: Record<string, unknown>): BlogPost {
  const slug = String(input.slug || "");
  const fallbackFound = blogFallbacks.find((post) => post.slug === slug);

  return {
    id: String(input.id || (fallbackFound?.id ?? "temp-id")),
    slug: String(input.slug || (fallbackFound?.slug ?? "temp-slug")),
    title: String(input.title || (fallbackFound?.title ?? "Untitled Post")),
    excerpt: String(input.excerpt || (fallbackFound?.excerpt ?? "")),
    content: String(input.content || (fallbackFound?.content ?? "")),
    thumbnailUrl: String(
      input.thumbnail_url || input.cover_image || input.thumbnailUrl || (fallbackFound?.thumbnailUrl ?? "")
    ),
    author: String(input.author || input.author_name || (fallbackFound?.author ?? "DevMind Team")),
    tags: safeJsonParse<string[]>(input.tags, fallbackFound?.tags ?? []),
    published: Boolean(input.published ?? input.is_published ?? (fallbackFound?.published ?? false)),
    createdAt: String(input.created_at || input.published_at || (fallbackFound?.createdAt ?? new Date().toISOString())),
  };
}

function normalizeTeamMember(input: Record<string, unknown>): TeamMember {
  return {
    id: String(input.id || ""),
    name: String(input.name || ""),
    role: String(input.role || ""),
    photoUrl: String(input.photo_url || input.image_url || ""),
    linkedinUrl: String(input.linkedin_url || ""),
    order: Number(input.order || 0),
  };
}

function normalizeJob(input: Record<string, unknown>): JobListing {
  return {
    id: String(input.id || ""),
    title: String(input.title || ""),
    type: String(input.type || ""),
    location: String(input.location || ""),
    description: String(input.description || ""),
    active: Boolean(input.active ?? false),
    createdAt: String(input.created_at || new Date().toISOString()),
  };
}

function normalizeService(input: Record<string, unknown>): ServiceItem {
  const fallback = serviceFallbacks[0];

  return {
    id: String(input.id || fallback.id),
    title: String(input.title || fallback.title),
    description: String(input.description || fallback.description),
    timeline: String(input.timeline || fallback.timeline),
    deliverables: safeJsonParse<string[]>(input.deliverables, fallback.deliverables),
    icon: String(input.icon || fallback.icon),
    order: Number(input.order || fallback.order),
  };
}

function normalizeTestimonial(input: Record<string, unknown>): TestimonialItem {
  return {
    id: String(input.id || ""),
    quote: String(input.quote || ""),
    clientName: String(input.client_name || ""),
    company: String(input.company || ""),
    photoUrl: String(input.photo_url || ""),
    order: Number(input.order || 0),
  };
}

async function queryFirstTable<T>(
  tableNames: string[],
  run: (tableName: string) => Promise<T | null>
) {
  for (const tableName of tableNames) {
    try {
      const result = await run(tableName);
      if (result != null) {
        return result;
      }
    } catch {
      // Try the next table alias.
    }
  }

  return null;
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSupabaseConfigured()) {
    return defaultSettings;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return defaultSettings;
  }

  const rows = await queryFirstTable<SettingsRow[]>(["settings", "site_settings"], async (tableName) => {
    const { data, error } = await supabase.from(tableName).select("key, value");
    if (error || !data) {
      return null;
    }
    return data as SettingsRow[];
  });

  if (!rows || rows.length === 0) {
    return defaultSettings;
  }

  const map = rows.reduce<Record<string, unknown>>((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});

  const socialLinks = safeJsonParse<SiteSettings["socialLinks"]>(
    map.social_links,
    defaultSettings.socialLinks
  );

  const adminEmailsValue = map.admin_emails;
  const adminEmails =
    Array.isArray(adminEmailsValue)
      ? adminEmailsValue.map(String)
      : typeof adminEmailsValue === "string"
        ? adminEmailsValue.split(",").map((item) => item.trim()).filter(Boolean)
        : defaultSettings.adminEmails;

  return {
    ownerName: String(map.owner_name || defaultSettings.ownerName),
    tagline: String(map.company_tagline || map.tagline || defaultSettings.tagline),
    email: String(map.email || map.contact_email || defaultSettings.email),
    phone: String(map.phone || map.contact_phone || defaultSettings.phone),
    address: String(map.address || map.office_address || defaultSettings.address),
    city: String(map.city || defaultSettings.city),
    mapQuery: String(map.map_query || defaultSettings.mapQuery),
    socialLinks: {
      github: String(socialLinks.github || defaultSettings.socialLinks.github),
      linkedin: String(socialLinks.linkedin || defaultSettings.socialLinks.linkedin),
      twitter: String(socialLinks.twitter || defaultSettings.socialLinks.twitter),
      instagram: String(socialLinks.instagram || defaultSettings.socialLinks.instagram),
    },
    aiSystemPrompt: String(map.chatbot_system_prompt || map.ai_system_prompt || defaultSettings.aiSystemPrompt),
    defaultCurrency:
      (String(map.default_currency || defaultSettings.defaultCurrency).toUpperCase() as SiteSettings["defaultCurrency"]),
    googleAnalyticsId: String(map.google_analytics_id || defaultSettings.googleAnalyticsId),
    adminEmails,
  };
});

export const getProjects = cache(async (): Promise<ProjectItem[]> => {
  if (!isSupabaseConfigured()) {
    return [...projectFallbacks].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return projectFallbacks;
  }

  const rows = await queryFirstTable<Record<string, unknown>[]>(
    ["projects"],
    async (tableName) => {
      const { data, error } = await supabase.from(tableName).select("*");
      if (error || !data) {
        return null;
      }
      return data as Record<string, unknown>[];
    }
  );

  if (!rows || rows.length === 0) {
    return [...projectFallbacks].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }

  const merged = rows.map(normalizeProject);
  const missingFallbacks = projectFallbacks.filter(
    (fallback) => !merged.some((project) => project.slug === fallback.slug)
  );

  return [...merged, ...missingFallbacks].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
});

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 6);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  if (!isSupabaseConfigured()) {
    return blogFallbacks;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return blogFallbacks;
  }

  const rows = await queryFirstTable<Record<string, unknown>[]>(
    ["blog_posts", "posts"],
    async (tableName) => {
      const { data, error } = await supabase.from(tableName).select("*");
      if (error || !data) {
        return null;
      }
      return data as Record<string, unknown>[];
    }
  );

  if (!rows || rows.length === 0) {
    return blogFallbacks;
  }

  const merged = rows.map(normalizeBlogPost);
  const missingFallbacks = blogFallbacks.filter(
    (fallback) => !merged.some((post) => post.slug === fallback.slug)
  );

  return [...merged, ...missingFallbacks]
    .filter((post) => post.published)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
});

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  if (!isSupabaseConfigured()) {
    return teamFallbacks;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return teamFallbacks;
  }

  const rows = await queryFirstTable<Record<string, unknown>[]>(
    ["team"],
    async (tableName) => {
      const { data, error } = await supabase.from(tableName).select("*");
      if (error || !data) {
        return null;
      }
      return data as Record<string, unknown>[];
    }
  );

  if (!rows || rows.length === 0) {
    return teamFallbacks;
  }

  return rows.map(normalizeTeamMember).sort((a, b) => a.order - b.order);
});

export const getJobs = cache(async (): Promise<JobListing[]> => {
  if (!isSupabaseConfigured()) {
    return jobFallbacks.filter((job) => job.active);
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return jobFallbacks.filter((job) => job.active);
  }

  const rows = await queryFirstTable<Record<string, unknown>[]>(
    ["jobs"],
    async (tableName) => {
      const { data, error } = await supabase.from(tableName).select("*");
      if (error || !data) {
        return null;
      }
      return data as Record<string, unknown>[];
    }
  );

  if (!rows || rows.length === 0) {
    return jobFallbacks.filter((job) => job.active);
  }

  return rows
    .map(normalizeJob)
    .filter((job) => job.active)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
});

export const getServices = cache(async (): Promise<ServiceItem[]> => {
  return serviceFallbacks;
});

export const getTestimonials = cache(async (): Promise<TestimonialItem[]> => {
  if (!isSupabaseConfigured()) {
    return testimonialFallbacks;
  }

  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return testimonialFallbacks;
  }

  const rows = await queryFirstTable<Record<string, unknown>[]>(
    ["testimonials"],
    async (tableName) => {
      const { data, error } = await supabase.from(tableName).select("*");
      if (error || !data) {
        return null;
      }
      return data as Record<string, unknown>[];
    }
  );

  if (!rows || rows.length === 0) {
    return testimonialFallbacks;
  }

  return rows.map(normalizeTestimonial).sort((a, b) => a.order - b.order);
});

export function getSiteUrl() {
  return BASE_URL;
}
