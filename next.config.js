/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com', 'arweave.net', 'www.arweave.net'],
  },
}

module.exports = nextConfig
