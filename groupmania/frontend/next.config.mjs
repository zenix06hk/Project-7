/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/annoymous_avatar.jpg',
        destination: '/assets/annoymous_avatar.jpg',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
