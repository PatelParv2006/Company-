import { getSiteSettings, getSiteUrl } from "@/lib/site-content";

export async function generateMetadata() {
  return {
    title: "Terms of Service",
    description:
      "Read the terms that govern the use of DevMind Studio's website, services, and proposals.",
    openGraph: {
      title: "DevMind Studio Terms of Service",
      description:
        "Terms governing your use of DevMind Studio's website and services.",
      url: `${getSiteUrl()}/terms`,
    },
  };
}

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 text-white">
      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <h1 className="font-heading text-5xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-400">Last updated: April 23, 2026</p>
        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-heading prose-p:text-slate-300 prose-li:text-slate-300">
          <p>
            These Terms of Service govern your access to and use of DevMind Studio&apos;s website, proposals, software delivery services, and related communications.
          </p>
          <h2>Use of the Website</h2>
          <p>
            You agree to use this website lawfully and not to interfere with the website&apos;s functionality, security, or availability.
          </p>
          <h2>Proposals and Services</h2>
          <p>
            Any project proposal, timeline, or estimate is non-binding until both parties execute a written agreement. Final pricing, scope, milestones, and deliverables are defined in that agreement.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            Unless otherwise agreed in writing, DevMind Studio retains ownership of its pre-existing materials, processes, tooling, and frameworks. Client ownership and licensing terms for deliverables will be defined in the governing agreement.
          </p>
          <h2>Payments</h2>
          <p>
            Fees, billing schedules, and reimbursement obligations are set out in the applicable proposal or contract. Late payments may pause delivery until accounts are brought current.
          </p>
          <h2>Disclaimers</h2>
          <p>
            The website and informational materials are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, to the fullest extent permitted by law.
          </p>
          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, DevMind Studio will not be liable for indirect, incidental, special, or consequential damages arising from the use of the website or services.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms may be sent to {settings.email} or mailed to {settings.address}.
          </p>
        </div>
      </div>
    </div>
  );
}
