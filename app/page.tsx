import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BrainCircuit, CheckCircle2, Clock3, Code2, LineChart, MessageSquareText, ShieldCheck, Sparkles, Zap } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import ParticleGrid from "@/components/ParticleGrid";
import TechMarquee from "@/components/TechMarquee";
import FaqAccordion from "@/components/FaqAccordion";
import FaqOrbScene from "@/components/FaqOrbScene";
import { getBlogPosts, getFeaturedProjects, getSiteSettings, getSiteUrl } from "@/lib/site-content";

export async function generateMetadata() {
  return {
    title: "DevMind Studio | Premium Web, SaaS & AI Product Development",
    description:
      "DevMind Studio builds production-ready web apps, SaaS platforms, AI solutions, and polished digital products for ambitious teams.",
    openGraph: {
      title: "DevMind Studio | Premium Web, SaaS & AI Product Development",
      description:
        "Production-ready software design and engineering for web, mobile, SaaS, and AI-powered products.",
      url: getSiteUrl(),
    },
  };
}

export default async function Home() {
  const [settings, featuredProjects, posts] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getBlogPosts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DevMind Studio",
    description:
      "Custom software development agency specializing in premium web apps, SaaS platforms, mobile apps, and AI solutions.",
    url: getSiteUrl(),
    email: settings.email,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: settings.city,
      addressCountry: "IN",
    },
  };

  const latestPosts = posts.slice(0, 3);

  return (
    <div className="adaptive-theme overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28">
        <ParticleGrid />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.16),transparent_28%),linear-gradient(180deg,#0a0a0f_0%,#070912_100%)]" />
        <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200">
              <Sparkles className="h-4 w-4" />
              Product strategy, engineering, and delivery under one roof
            </div>
            <h1 className="mt-8 font-heading text-5xl font-bold leading-[1.02] text-white md:text-7xl">
              Premium software for teams that need more than a template.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              We build polished web apps, SaaS platforms, AI-powered workflows, and mobile products that are ready for real users, real scale, and real operations.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/estimator"
                className="btn-glow inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-7 py-4 text-base font-semibold text-white"
              >
                Estimate Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-semibold text-slate-100 backdrop-blur transition hover:bg-white/10"
              >
                See Our Work
              </Link>
            </div>

            <div className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
              <LineChart className="mt-1 h-5 w-5 text-blue-300" />
              <div>
                <p className="font-semibold text-white">Data-Driven UX</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  We combine analytics, product sense, and careful interface design to improve adoption, conversions, and operational clarity.
                </p>
              </div>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
              {[
                { label: "Clients", value: 50, suffix: "+" },
                { label: "Projects", value: 100, suffix: "+" },
                { label: "Years", value: 5, suffix: "" },
                { label: "Satisfaction", value: 99, suffix: "%" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-heading font-bold text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-2xl">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#0b1020] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-blue-300">Delivery Snapshot</p>
                    <h2 className="mt-2 text-2xl font-heading font-bold text-white">
                      Strategy-led execution
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-blue-500/15 p-3 text-blue-300">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  {[
                    { icon: Code2, title: "Modern stack", copy: "Next.js, TypeScript, Supabase, and dependable cloud tooling." },
                    { icon: ShieldCheck, title: "Production standards", copy: "Security, observability, QA, and launch-readiness built in." },
                    { icon: Clock3, title: "Clear delivery rhythm", copy: "Focused milestones, transparent updates, and fast feedback loops." },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-white/10 p-2 text-blue-200">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-300">{item.copy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#070914] py-8">
        <TechMarquee />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Why Choose Us</p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">
            Built for serious product teams
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            We help founders and operators move from vague requirements to production-ready software with less chaos and more clarity.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: Zap,
              title: "Fast without cutting corners",
              copy: "We move quickly by narrowing scope intelligently, not by ignoring quality.",
            },
            {
              icon: MessageSquareText,
              title: "Communication you can trust",
              copy: "Expect clear decisions, honest tradeoffs, and no disappearing acts mid-project.",
            },
            {
              icon: CheckCircle2,
              title: "Polish that supports outcomes",
              copy: "We care about UI because it directly shapes conversions, adoption, and trust.",
            },
            {
              icon: LineChart,
              title: "Business-aware engineering",
              copy: "Architecture, analytics, and operations are designed around how your product grows.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="inline-flex rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 p-3 text-blue-200">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-heading font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#070914] py-8">
        <TechMarquee reverse />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Our Featured Projects</p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">
              Six case studies, one shared delivery standard
            </h2>
          </div>
          <Link href="/projects" className="inline-flex items-center text-sm font-semibold text-blue-300">
            Browse all projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.slice(0, 6).map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 backdrop-blur-xl transition hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {project.liveUrl ? (
                  <div className="absolute inset-0 z-0">
                    <iframe 
                      src={project.liveUrl} 
                      className="w-[125%] h-[125%] origin-top-left scale-[0.8] border-none pointer-events-none grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                      title={project.title}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060c] via-[#05060c]/40 to-transparent z-10" />
                <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-semibold text-blue-100 backdrop-blur">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">FAQ</p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">
              Questions we hear all the time
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
              If you&apos;re still comparing options or refining scope, these answers should help you move forward with more confidence.
            </p>
            <FaqOrbScene />
          </div>

          <FaqAccordion
            items={[
              {
                question: "How much does a SaaS project cost?",
                answer:
                  "It depends on the scope, but most SaaS builds vary based on roles, billing, analytics, integrations, and the quality bar. Our estimator gives a fast starting range.",
              },
              {
                question: "How long does a typical project take?",
                answer:
                  "Simple websites can launch in a few weeks. Most custom web apps and SaaS products land in the 6 to 16 week range depending on complexity and feedback cycles.",
              },
              {
                question: "Do you handle design as well as engineering?",
                answer:
                  "Yes. We handle product strategy, UX, interface design, frontend, backend, QA, and launch support so the experience stays cohesive end to end.",
              },
              {
                question: "Can you improve an existing product instead of rebuilding it?",
                answer:
                  "Absolutely. We often step into existing codebases to stabilize delivery, improve UX, or modernize architecture without a full rewrite.",
              },
              {
                question: "Do you build mobile apps too?",
                answer:
                  "Yes. We build mobile experiences when they are the right product surface, especially for operational tools, customer apps, and companion products.",
              },
              {
                question: "What happens after launch?",
                answer:
                  "We can support ongoing iteration, performance tuning, analytics review, and roadmap delivery through structured support plans.",
              },
            ]}
          />
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#070914] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Recent Blog Posts</p>
              <h2 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">
                Ideas from the studio
              </h2>
            </div>
            <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-blue-300">
              View all posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 transition hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.thumbnailUrl}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 text-2xl font-heading font-bold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Start the Conversation</p>
        <h2 className="mt-4 font-heading text-4xl font-bold text-white md:text-6xl">
          Let&apos;s scope the right build, not just the fastest one.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Use the estimator for a fast range, talk to the AI assistant for quick answers, or reach out directly if you already know what you want to build.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="btn-glow inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-7 py-4 font-semibold text-white"
          >
            Contact Us
          </Link>
          <Link
            href="/estimator"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-slate-100 transition hover:bg-white/10"
          >
            Use Estimator
          </Link>
        </div>
      </section>
    </div>
  );
}
