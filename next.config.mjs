/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backiee.com",
        pathname: "/static/wallpapers/**",
      },
    ],
  },

};

export default nextConfig;
