import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'
import { setKeycloakAttribute } from '@/lib/actions'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('Menu')
  const { data: session } = useSession()

  const handleThemeSwitcher = (nextTheme: string) => {
    if (session) {
      setKeycloakAttribute({
        user: session.sub!,
        access_token: session.access_token!,
        attribute: 'theme',
        value: nextTheme,
      })
    }

    setTheme(nextTheme)
  }

  return (
    <DropdownMenuGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          {theme === 'dark' ? (
            <Moon className="mr-2 h-4 w-4" />
          ) : (
            <Sun className="mr-2 h-4 w-4" />
          )}
          <span>{t('Themes')}</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                handleThemeSwitcher('light')
              }}
            >
              <Sun className="mr-2 h-4 w-4" />
              <span>{t('Light')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                handleThemeSwitcher('dark')
              }}
            >
              <Moon className="mr-2 h-4 w-4" />
              <span>{t('Dark')}</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  )
}
