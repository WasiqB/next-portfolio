import { withPayload } from '@payloadcms/next/withPayload';
import withPlaiceholder from '@plaiceholder/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
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
    ],
  },
};

export default withPayload(withPlaiceholder(nextConfig));
