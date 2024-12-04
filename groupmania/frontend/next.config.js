/** @type {import('next').NextConfig} */

const path = require("path");

// const nextConfig = {
//   reactStriction: true,
//   sassOptions: {
//     includePaths: [path.join(__dirname, "styles")],
//   },
// };

// export default nextConfig;

const nextConfig = {
  reactStriction: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
