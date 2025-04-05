import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: true,
  // experimental: {
  //   serverActions: {},  // если вы используете серверные действия
  // },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/projects',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'btnxsdpbklzpvgsqtrpr.supabase.co', 
 
        pathname: '/storage/v1/object/public/uploads/public/**', // Путь к изображениям
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
