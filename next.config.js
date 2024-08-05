/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fuad-next-s3-upload-ecommerce.s3.il-central-1.amazonaws.com'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
