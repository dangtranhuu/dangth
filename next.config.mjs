/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      config.cache = false
    }
    return config
  }
}

export default nextConfig
