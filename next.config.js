// next.config.js
module.exports = {
  images: {
    domains: ['via.placeholder.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/albums',
        permanent: true,
      },
    ]
  },
}
