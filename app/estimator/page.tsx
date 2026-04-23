import EstimatorPageClient from "@/components/estimator/EstimatorPageClient";
import { getSiteSettings, getSiteUrl } from "@/lib/site-content";

export async function generateMetadata() {
  return {
    title: "Estimator",
    description:
      "Build a custom project estimate for websites, SaaS platforms, e-commerce products, mobile apps, AI solutions, and enterprise software.",
    openGraph: {
      title: "DevMind Studio Estimator",
      description:
        "Configure your product scope and get a live estimate range.",
      url: `${getSiteUrl()}/estimator`,
    },
  };
}

export default async function EstimatorPage() {
  const settings = await getSiteSettings();

  return <EstimatorPageClient defaultCurrency={settings.defaultCurrency} />;
}
