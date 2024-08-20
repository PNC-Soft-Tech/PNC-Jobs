/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ENV: process.env.ENV,
    API_PROD_URL: process.env.API_PROD_URL,
    API_DEV_URL: process.env.API_DEV_URL,
    API_STAGING_URL: process.env.API_STAGING_URL,
  }
};

export default nextConfig;
