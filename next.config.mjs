/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:"https",
        hostname: "cdn.tools.unlayer.com",
      },
      {
        protocol:"https",
        hostname: "fonts.gstatic.com",
      },
      {
        protocol:"https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
