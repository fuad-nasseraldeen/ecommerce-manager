/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fuad-next-s3-upload-ecommerce.s3.il-central-1.amazonaws.com'],
  },
  experimental: {
    appDir: true,
  },
  api: {
    bodyParser: false, // Disable body parser for all API routes
  },
}

module.exports = nextConfig
