"use client";

import { useState } from "react";
import Image from "next/image";
import { Monitor, Smartphone, Maximize2, X } from "lucide-react";

interface ProjectLivePreviewProps {
  url: string;
  fallbackImage: string;
  title: string;
}

export default function ProjectLivePreview({ url, fallbackImage, title }: ProjectLivePreviewProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  if (!isPreviewMode) {
    return (
      <div className="relative group">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
          <Image
            src={fallbackImage}
            alt={title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          
          <button
            onClick={() => setIsPreviewMode(true)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl flex items-center gap-3 text-white font-bold shadow-2xl scale-95 group-hover:scale-100 transition-transform">
              <Maximize2 className="w-5 h-5" />
              Live Interactive Preview
            </div>
          </button>
        </div>
        
        {/* Optional small label */}
        <p className="mt-4 text-center text-xs text-slate-500">
          Click image to interact with the live project
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4 bg-white/5 border border-white/10 rounded-2xl p-2 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setDevice("desktop")}
            className={`p-2 rounded-lg transition-colors ${device === "desktop" ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-white/5"}`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setDevice("mobile")}
            className={`p-2 rounded-lg transition-colors ${device === "mobile" ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-white/5"}`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 px-4 truncate text-center">
          <span className="text-xs font-mono text-slate-500 bg-black/20 px-3 py-1 rounded-full border border-white/5">
            {url}
          </span>
        </div>

        <button 
          onClick={() => setIsPreviewMode(false)}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          title="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className={`relative transition-all duration-500 mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl ${
        device === "mobile" ? "max-w-[375px] aspect-[9/16]" : "w-full aspect-[16/10]"
      }`}>
        <iframe 
          src={url} 
          title={title}
          className="w-full h-full border-none bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
        
        {/* Loading overlay for iframe */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center bg-[#0a0a0f]">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
      
      <p className="mt-4 text-center text-xs text-slate-500">
        Interactive preview. Some external sites may block embedding.
      </p>
    </div>
  );
}
