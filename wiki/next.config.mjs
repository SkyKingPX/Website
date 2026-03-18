import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home/',
        permanent: true,
      }
    ]
  },
  serverExternalPackages: ['@takumi-rs/image-response'],
};

export default withMDX(config);
