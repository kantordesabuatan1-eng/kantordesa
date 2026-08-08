/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
      {
        source: "/admin/",
        destination: "/admin/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;