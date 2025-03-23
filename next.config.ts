import type { NextConfig } from "next";

const nextConfig: NextConfig = {
//   reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arbetsformedlingen.se",
      }
    ]
  }
};

export default nextConfig;
