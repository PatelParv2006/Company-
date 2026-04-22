import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
          Terms of Service
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-12">Last updated: April 2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <p>
            Welcome to DevMind Studio!
          </p>
          <p>
            These terms and conditions outline the rules and regulations for the use of DevMind Studio's Website, located at devmindstudio.vercel.app.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use DevMind Studio if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">License</h2>
          <p>
            Unless otherwise stated, DevMind Studio and/or its licensors own the intellectual property rights for all material on DevMind Studio. All intellectual property rights are reserved. You may access this from DevMind Studio for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">Disclaimer</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.
          </p>
        </div>
      </div>
    </div>
  );
}
