/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/seed/**',
      },
       {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // Allow any path on picsum.photos
      },
       {
         protocol: 'https',
         hostname: 'surveys.opennmind.com',
         port: '',
         pathname: '/wp-content/uploads/**',
       },
    ],
     // Add support for SVG images if needed (optional)
     dangerouslyAllowSVG: true,
     contentDispositionType: 'attachment',
     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
