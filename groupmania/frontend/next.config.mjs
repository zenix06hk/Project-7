/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;

// module.exports = {
//   experimental: {
//     serverAction: true,
//   },
// };
