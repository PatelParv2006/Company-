import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProjectBySlug, getProjects, getSiteUrl } from "@/lib/site-content";
import { notFound } from "next/navigation";
import ProjectLivePreview from "@/components/ProjectLivePreview";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | DevMind Studio`,
      description: project.description,
      url: `${getSiteUrl()}/projects/${project.slug}`,
      images: [project.heroImage],
    },
  };
}

function stackColor(label: string) {
  const value = label.toLowerCase();

  if (value.includes("next")) return "from-slate-700 to-slate-900";
  if (value.includes("react")) return "from-cyan-500 to-sky-600";
  if (value.includes("postgres")) return "from-blue-500 to-indigo-600";
  if (value.includes("supabase")) return "from-emerald-500 to-teal-600";
  if (value.includes("stripe")) return "from-violet-500 to-purple-600";
  if (value.includes("anthropic")) return "from-fuchsia-500 to-violet-600";
  return "from-blue-500 to-violet-500";
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 text-white">
      <section className="relative overflow-hidden border-b border-white/10 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_25%),radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.16),transparent_24%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 py-8 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-blue-200">
                {project.category}
              </span>
              <h1 className="mt-5 font-heading text-5xl font-bold md:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                {project.description}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glow inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 font-semibold text-white"
                >
                  Live Demo
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-100 transition hover:bg-white/10"
                >
                  Start a Similar Project
                </Link>
              </div>
            </div>

            <ProjectLivePreview 
              url={project.liveUrl || ""} 
              fallbackImage={project.heroImage} 
              title={project.title} 
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Problem</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{project.problem}</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Solution</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{project.solution}</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Tech Stack</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {project.techStack.map((item) => (
                  <div
                    key={item}
                    className={`rounded-2xl bg-gradient-to-r ${stackColor(item)} px-4 py-3 text-sm font-semibold text-white`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Results</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-[#0d1120] p-5">
                  <div className="text-3xl font-heading font-bold text-white">{metric.value}</div>
                  <div className="mt-2 text-sm text-slate-300">{metric.label}</div>
                </div>
              ))}
            </div>
            <ul className="mt-8 space-y-4">
              {project.results.map((result) => (
                <li
                  key={result}
                  className="rounded-2xl border border-white/10 bg-[#0d1120] px-5 py-4 text-sm leading-7 text-slate-300"
                >
                  {result}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#0d1120] p-5">
              <p className="text-sm leading-7 text-slate-300">{project.caseStudy}</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Screenshot Gallery</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {project.screenshots.map((shot) => (
              <div
                key={shot}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={shot}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
