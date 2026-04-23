import CareersPageClient from "@/components/careers/CareersPageClient";
import { getJobs, getSiteSettings, getSiteUrl } from "@/lib/site-content";

export async function generateMetadata() {
  return {
    title: "Careers",
    description:
      "Explore open positions at DevMind Studio and join a team building premium digital products across web, SaaS, and AI.",
    openGraph: {
      title: "Careers at DevMind Studio",
      description:
        "Open roles across engineering, design, and delivery.",
      url: `${getSiteUrl()}/careers`,
    },
  };
}

export default async function CareersPage() {
  const [jobs, settings] = await Promise.all([getJobs(), getSiteSettings()]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 text-white">
      <div className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Careers</p>
          <h1 className="mt-4 font-heading text-5xl font-bold md:text-6xl">
            Help us build products people actually enjoy using.
          </h1>
        </div>

        <div className="mt-12">
          <CareersPageClient jobs={jobs} fallbackEmail={settings.email} />
        </div>
      </div>
    </div>
  );
}
