import { setKeycloakAttribute } from '@/lib/actions'
import { usePathname, useRouter } from '@/navigation'
import { useSession } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { useSearchParams } from 'next/navigation'

export default function useKeycloakAttributes() {
  const router = useRouter()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const locale = useLocale()

  const handleThemeSwitcher = (nextTheme: string) => {
    if (session) {
      const attributes = {
        locale,
        theme: nextTheme,
      }
      setKeycloakAttribute({
        user: session.sub!,
        access_token: session.access_token!,
        attributes,
      })
    }

    setTheme(nextTheme)
  }

  const handleLocaleSwitcher = (nexLocale: string) => {
    const params = new URLSearchParams(searchParams)

    if (session) {
      const attributes = {
        locale: nexLocale,
        theme: theme || 'light',
      }

      setKeycloakAttribute({
        user: session.sub!,
        access_token: session.access_token!,
        attributes,
      })
    }

    router.push(`${pathname}?${params.toString()}`, { locale: nexLocale })
  }

  return { locale, handleLocaleSwitcher, handleThemeSwitcher }
}
