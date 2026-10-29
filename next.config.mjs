/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Old/alternate URLs people may have bookmarked or found on Google
    const moved = {
      '/gallery': '/#gallery',
      '/home': '/',
      '/about-us': '/about',
      '/our-story': '/about',
      '/our-team': '/team',
      '/programs': '/services',
      '/contact-us': '/contact',
      '/register': '/#registration',
    }
    return Object.entries(moved).map(([source, destination]) => ({ source, destination, permanent: true }))
  },
  images: {
    localPatterns: [
      { pathname: '/api/uploads/**' },
      { pathname: '/**' },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    // Allow large multipart uploads through middleware to route handlers
    middlewareClientMaxBodySize: 10 * 1024 * 1024,
  },
  serverExternalPackages: ['argon2'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fallback for Node.js modules that shouldn't be in client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        path: false,
        os: false,
        'node:crypto': false,
        'node:stream': false,
      }
      
      // Make sure argon2 is not bundled on client side
      config.externals = [...(config.externals || []), 'argon2']
    }

    return config
  },
}

export default nextConfig
