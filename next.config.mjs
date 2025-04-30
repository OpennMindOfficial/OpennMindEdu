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
         hostname: 'surveys.opennmind.com', // Added this domain
         port: '',
         pathname: '/wp-content/uploads/**',
       },
    ],
  },
};

export default nextConfig;
