import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance: Enable React strict mode for catching bugs early
  reactStrictMode: true,

  // Performance: Compress responses with gzip
  compress: true,

  // Security: Add production headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],

  // Performance: Disable source maps in production to reduce bundle size
  productionBrowserSourceMaps: false,
};

export default nextConfig;
