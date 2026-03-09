// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.pexels.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;


// new code
// components/property/PropertyCard.tsx

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
    // Serve modern formats for smaller payloads
    formats: ['image/avif', 'image/webp'],
    // Keep optimised images in cache longer (default 60s is too low)
    minimumCacheTTL: 2592000, // 30 days
  },
  // Increase body size limit for file uploads (50MB)
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  // Compress responses
  compress: true,
  // Power-save: don't generate source maps in production
  productionBrowserSourceMaps: false,
  // Aggressive code splitting
  modularizeImports: {
    '@heroicons/react/24/outline': {
      transform: '@heroicons/react/24/outline/{{member}}',
    },
    '@heroicons/react/24/solid': {
      transform: '@heroicons/react/24/solid/{{member}}',
    },
  },
  // HTTP headers for caching static assets
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
};

export default nextConfig;