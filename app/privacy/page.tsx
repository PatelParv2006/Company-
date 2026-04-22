import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-12">Last updated: April 2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <p>
            At DevMind Studio, accessible from devmindstudio.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by DevMind Studio and how we use it.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">Information we collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">How we use your information</h2>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
