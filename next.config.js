/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    // Add any environment variables you want to expose to the browser here
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Note: The server port is now set in package.json scripts
  // But we can also set it here alternatively
  // serverRuntimeConfig: {
  //   port: process.env.PORT || 4000
  // }
};

export default nextConfig;
