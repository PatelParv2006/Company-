import { getSiteSettings, getSiteUrl } from "@/lib/site-content";

export async function generateMetadata() {
  return {
    title: "Privacy Policy",
    description:
      "Read how DevMind Studio collects, uses, stores, and protects personal information.",
    openGraph: {
      title: "DevMind Studio Privacy Policy",
      description:
        "How DevMind Studio handles personal information and website data.",
      url: `${getSiteUrl()}/privacy`,
    },
  };
}

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 text-white">
      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <h1 className="font-heading text-5xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-400">Last updated: April 23, 2026</p>
        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-heading prose-p:text-slate-300 prose-li:text-slate-300">
          <p>
            DevMind Studio respects your privacy and is committed to protecting the personal information you share with us.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect your name, email address, phone number, company information, project details, and any other information you provide when you contact us, use our estimator, or interact with our AI assistant.
          </p>
          <h2>How We Use Information</h2>
          <ul>
            <li>Respond to inquiries and provide proposals.</li>
            <li>Deliver, improve, and support our services.</li>
            <li>Maintain security, analytics, and administrative records.</li>
            <li>Comply with legal obligations and resolve disputes.</li>
          </ul>
          <h2>Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with trusted service providers such as hosting, analytics, communications, and payment partners only as needed to operate our business.
          </p>
          <h2>Retention</h2>
          <p>
            We retain information only for as long as necessary to fulfill business, contractual, legal, or security purposes.
          </p>
          <h2>Your Choices</h2>
          <p>
            You may request access, correction, or deletion of your personal information by contacting us at {settings.email}.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to {settings.email} or by mail to {settings.address}.
          </p>
        </div>
      </div>
    </div>
  );
}
