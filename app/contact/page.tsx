import ContactPageClient from "@/components/contact/ContactPageClient";
import { getSiteSettings, getSiteUrl } from "@/lib/site-content";

type ContactPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata() {
  return {
    title: "Contact",
    description:
      "Contact DevMind Studio about web apps, SaaS products, mobile builds, AI solutions, and ongoing product support.",
    openGraph: {
      title: "Contact DevMind Studio",
      description:
        "Share your project and we’ll respond within 24 hours.",
      url: `${getSiteUrl()}/contact`,
    },
  };
}

function readString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const settings = await getSiteSettings();

  const prefillMessage = readString(searchParams.message);
  const prefillProjectType = readString(searchParams.projectType) || "Dynamic Web App";

  return (
    <ContactPageClient
      settings={settings}
      prefillMessage={prefillMessage}
      prefillProjectType={prefillProjectType}
    />
  );
}
