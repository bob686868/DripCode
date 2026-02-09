import type { NextConfig } from "next";

const nextConfig:NextConfig= {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // If you are using Supabase storage, add it here too!
      {
        protocol: 'https',
        hostname: 'your-project-id.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.example.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
