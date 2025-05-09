/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Add fallbacks for Node.js core modules that might be imported by dependencies
            // for client-side builds where these modules are not available.
            config.resolve.fallback = {
                ...(config.resolve.fallback || {}), // Preserve existing fallbacks
                fs: false,
                tls: false,
                net: false,
                http2: false,
                dns: false,
                async_hooks: false, // Fallback for 'async_hooks'
                'node:async_hooks': false, // Explicitly handle the 'node:async_hooks' prefix
            };
        }

        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
