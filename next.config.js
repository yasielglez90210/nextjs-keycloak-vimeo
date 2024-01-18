const withNextIntl = require('next-intl/plugin')()

module.exports = withNextIntl({
  // Other Next.js configuration
  images: {
    domains: ['i.vimeocdn.com'],
  },
})
