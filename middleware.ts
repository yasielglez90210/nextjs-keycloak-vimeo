import createMiddleware from 'next-intl/middleware'
import { locales, localePrefix } from './navigation'

export default createMiddleware({
  defaultLocale: 'es',
  localePrefix,
  locales,
})

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(es|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
}
