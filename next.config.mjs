/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backiee.com",
        pathname: "/static/wallpapers/**",
      },
      {
        protocol: "https",
        hostname: "images.alphacoders.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
