import type { NextConfig } from "next";
import { URL } from "url";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://repository-images.githubusercontent.com/**"),
    ],
  },
};

export default nextConfig;
