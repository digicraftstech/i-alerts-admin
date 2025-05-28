import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['pino', 'pino-pretty'],
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
};

export default nextConfig;
