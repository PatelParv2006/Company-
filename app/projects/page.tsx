import ProjectsExplorer from "@/components/ProjectsExplorer";
import { getProjects, getSiteUrl } from "@/lib/site-content";

export async function generateMetadata() {
  return {
    title: "Projects",
    description:
      "Explore DevMind Studio case studies across web apps, SaaS platforms, admin systems, mobile products, and AI solutions.",
    openGraph: {
      title: "DevMind Studio Projects",
      description:
        "Six production-grade case studies covering modern product design and engineering.",
      url: `${getSiteUrl()}/projects`,
    },
  };
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Selected Work</p>
          <h1 className="mt-4 font-heading text-5xl font-bold text-white md:text-7xl">
            Case studies built for real-world delivery.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Every project here comes from the same product mindset: make the user journey clear, keep the architecture practical, and ship with operational confidence.
          </p>
        </div>

        <div className="mt-14">
          <ProjectsExplorer projects={projects} />
        </div>
      </div>
    </div>
  );
}
