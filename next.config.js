// next.config.js
module.exports = {
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
