/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'], // Existing domain for Firebase Storage
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'blog.drawdownga.org',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
