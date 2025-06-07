import type { NextConfig } from "next";
import { URL } from "url";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://repository-images.githubusercontent.com/**"),
      new URL("https://opengraph.githubassets.com/**"),
      new URL("https://cdn-images-1.medium.com/**"),
      new URL("https://www.lambdatest.com/**"),
    ],
  },
};

export default nextConfig;
