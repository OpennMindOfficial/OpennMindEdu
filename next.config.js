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
                http2: false, // Add http2 fallback
            };
        }

        return config;
    }
};

module.exports = nextConfig;
