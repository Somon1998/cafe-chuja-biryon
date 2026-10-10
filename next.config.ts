import type { NextConfig } from "next";

const isPreview = process.env.VERCEL_ENV === "preview";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    qualities: [75, 85, 90],
  },
  async headers() {
    if (!isPreview) return [];

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
