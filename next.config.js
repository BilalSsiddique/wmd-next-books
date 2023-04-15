/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    BASE_URL: "https://simple-book-store-bilal-siddique.vercel.app/", //production
  
  },
};

module.exports = nextConfig;
