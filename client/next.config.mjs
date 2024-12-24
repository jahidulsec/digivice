const nextConfig = {
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
