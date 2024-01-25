import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import useKeycloakAttributes from '@/hooks/useKeycloakAttributes'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'

export default function ThemeSwitcher() {
  const { theme } = useTheme()
  const t = useTranslations('Menu')
  const { handleThemeSwitcher } = useKeycloakAttributes()

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
