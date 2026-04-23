"use client";

import { useMemo, useState } from "react";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import toast from "react-hot-toast";
import type { SiteSettings } from "@/lib/site-content";

type ContactPageClientProps = {
  settings: SiteSettings;
  prefillMessage?: string;
  prefillProjectType?: string;
};

const budgetOptions = [
  "Under $5k",
  "$5k - $10k",
  "$10k - $25k",
  "$25k - $50k",
  "$50k+",
];

const projectTypes = [
  "Static Website",
  "Dynamic Web App",
  "E-Commerce",
  "SaaS Platform",
  "Mobile App",
  "AI/ML Solution",
  "Enterprise Software",
];

export default function ContactPageClient({
  settings,
  prefillMessage = "",
  prefillProjectType = "Dynamic Web App",
}: ContactPageClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: prefillProjectType,
    budget: "",
    message: prefillMessage,
  });

  const telHref = useMemo(
    () => `tel:${settings.phone.replace(/\s+/g, "")}`,
    [settings.phone]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        toast.error(data.error || "Failed to send your inquiry.");
        return;
      }

      toast.success("Thanks! We received your message.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: prefillProjectType,
        budget: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong while sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Contact</p>
          <h1 className="mt-4 font-heading text-5xl font-bold md:text-6xl">
            Let&apos;s talk about your next build.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Share the shape of your project and we&apos;ll get back to you with the right next step. We respond within 24 hours.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-6">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="font-heading text-2xl font-bold text-white">Reach us directly</h2>
              <div className="mt-6 space-y-5 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 text-blue-300" />
                  <a href={`mailto:${settings.email}`} className="transition hover:text-white">
                    {settings.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 text-blue-300" />
                  <a href={telHref} className="transition hover:text-white">
                    {settings.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-blue-300" />
                  <span>{settings.address}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="font-heading text-2xl font-bold text-white">Ahmedabad Office</h2>
              <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-white/10">
                <iframe
                  title="DevMind Studio office map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(settings.mapQuery)}&output=embed`}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">Name</span>
                  <input
                    required
                    value={formData.name}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, name: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#0d1120] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/40"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, email: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#0d1120] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/40"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">Phone</span>
                  <input
                    value={formData.phone}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, phone: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#0d1120] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/40"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">Project Type</span>
                  <select
                    value={formData.projectType}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, projectType: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#0d1120] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/40"
                  >
                    {projectTypes.map((projectType) => (
                      <option key={projectType} value={projectType}>
                        {projectType}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Budget Range</span>
                <select
                  value={formData.budget}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, budget: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#0d1120] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/40"
                >
                  <option value="">Select budget range</option>
                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Message</span>
                <textarea
                  required
                  rows={7}
                  value={formData.message}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, message: event.target.value }))
                  }
                  className="w-full rounded-[1.4rem] border border-white/10 bg-[#0d1120] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/40"
                  placeholder="Tell us what you're building, your timeline, and any constraints we should know about."
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Inquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
