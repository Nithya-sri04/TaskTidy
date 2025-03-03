import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disabling React Strict Mode for now
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ap-south-1.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Add this for Google-hosted images
      },
    ],
  },
};

export default nextConfig;



