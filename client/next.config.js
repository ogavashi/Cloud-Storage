/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [{ source: "/", destination: "/dashboard" }],
};

module.exports = nextConfig;
