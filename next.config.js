const withNextIntl = require('next-intl/plugin')()

module.exports = withNextIntl({
  // Other Next.js configuration
  images: {
    remotePatterns: [
      {
        hostname: 'i.vimeocdn.com',
      },
    ],
  },
})
