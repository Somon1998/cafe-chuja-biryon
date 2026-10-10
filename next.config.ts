import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
