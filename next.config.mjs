/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
    AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY
  }
};

export default nextConfig;
