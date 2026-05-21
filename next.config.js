/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/gym_website',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
