/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '116.68.200.97:6051',
      },
    ],
  },
};

export default nextConfig;
