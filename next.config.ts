import withPlaiceholder from '@plaiceholder/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  experimental: {
    useTypeScriptCli: true,
  },
  turbopack: {},
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
        protocol: 'https',
      },
      {
        hostname: 'assets.testmuai.com',
      },
      {
        hostname: 'i.ytimg.com',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'placehold.net',
      },
      {
        hostname: 'w8wm6ag6dp.ufs.sh',
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
