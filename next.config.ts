import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "repository-images.githubusercontent.com",
      },
      {
        hostname: "opengraph.githubassets.com",
      },
      {
        hostname: "cdn-images-1.medium.com",
      },
      {
        hostname: "www.lambdatest.com",
      },
      {
        hostname: "i.ytimg.com",
      },
      {
        hostname: "media.licdn.com",
      },
    ],
  },
};

export default nextConfig;
