"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { JobListing } from "@/lib/site-content";

type CareersPageClientProps = {
  jobs: JobListing[];
  fallbackEmail: string;
};

export default function CareersPageClient({
  jobs,
  fallbackEmail,
}: CareersPageClientProps) {
  const [activeJob, setActiveJob] = useState<JobListing | null>(null);

  if (jobs.length === 0) {
    return (
      <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-8 text-center text-slate-300">
        No openings right now, but send your CV to{" "}
        <a href={`mailto:${fallbackEmail}`} className="text-blue-300 hover:text-white">
          {fallbackEmail}
        </a>
        .
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">{job.title}</h2>
                <p className="mt-2 text-sm text-slate-300">
                  {job.type} · {job.location}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{job.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveJob(job)}
                className="btn-glow inline-flex rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 font-semibold text-white"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-[1.8rem] border border-white/10 bg-[#0a0a0f] p-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-3xl font-bold">{activeJob.title}</h3>
                <p className="mt-2 text-sm text-slate-300">
                  {activeJob.type} · {activeJob.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveJob(null)}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-300">{activeJob.description}</p>

            <form className="mt-6 grid gap-4">
              <input
                placeholder="Your name"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
              />
              <input
                type="email"
                placeholder="Your email"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
              />
              <input
                placeholder="LinkedIn or portfolio URL"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
              />
              <textarea
                rows={5}
                placeholder="Tell us why you're a fit for this role."
                className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
              />
              <a
                href={`mailto:${fallbackEmail}?subject=${encodeURIComponent(`Application: ${activeJob.title}`)}`}
                className="btn-glow inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 font-semibold text-white"
              >
                Send Application via Email
              </a>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
