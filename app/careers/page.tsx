import Link from "next/link";
import { ArrowLeft, ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Careers",
  description: "Join DevMind Studio. We're looking for talented engineers, designers, and product minds to help us build the future.",
};

const jobs = [
  {
    id: "1",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-time",
  },
  {
    id: "2",
    title: "UI/UX Product Designer",
    department: "Design",
    location: "Ahmedabad, Gujarat",
    type: "Full-time",
  },
  {
    id: "3",
    title: "Technical Project Manager",
    department: "Management",
    location: "Remote",
    type: "Contract",
  }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Join the <span className="text-blue-600 dark:text-blue-500">Team</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Help us build world-class digital products for the next generation of visionary companies.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Open Positions</h2>
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium text-sm">
              {jobs.length} Openings
            </span>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="glass-card-light dark:glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500/30 transition-colors group">
                <div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.department}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.type}</span>
                  </div>
                </div>
                <Link href="/contact" className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-colors">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0f1e] dark:to-[#111827] rounded-3xl p-10 text-center border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Don't see a fit?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            We're always looking for exceptional talent. Send your resume and portfolio to us anyway.
          </p>
          <a href="mailto:careers@devmindstudio.com" className="inline-flex items-center gap-2 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            careers@devmindstudio.com <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
