import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@wb/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'repository-images.githubusercontent.com',
      },
      {
        hostname: 'opengraph.githubassets.com',
      },
      {
        hostname: 'cdn-images-1.medium.com',
      },
      {
        hostname: 'www.lambdatest.com',
      },
      {
        hostname: 'i.ytimg.com',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
