/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    NEXT_PUBLIC_PLATFORM: process.env.PLATFORM || 'WEB',
    NEXT_PUBLIC_TARGET: process.env.TARGET || 'MAC'
  }
};

export default nextConfig;
