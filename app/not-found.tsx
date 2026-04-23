import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-24 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-xl w-full text-center relative z-10">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
          <Search className="w-10 h-10 text-blue-400" />
        </div>
        
        <h1 className="text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 mb-4">
          404
        </h1>
        
        <h2 className="text-3xl font-heading font-bold text-white mb-6">
          Lost in the digital void?
        </h2>
        
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          The page you're looking for has moved to a new dimension or never existed in this one. Let's get you back to reality.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto btn-glow inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-8 py-4 font-bold text-white transition-all hover:scale-105 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-slate-100 backdrop-blur-xl transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            View Projects
          </Link>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 text-slate-500 text-sm">
          Think this is a mistake? <Link href="/contact" className="text-blue-400 hover:underline">Report it to us</Link>
        </div>
      </div>
    </div>
  );
}
