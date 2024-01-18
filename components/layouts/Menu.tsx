'use client'

import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { Link, useRouter, usePathname } from '@/navigation'
import { useTransition } from 'react'
import {
  LogOut,
  Moon,
  Sun,
  LogIn,
  UploadCloud,
  UserRound,
  Languages,
  Check,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export default function Menu({ locale }: { locale: string }) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const t = useTranslations('Menu')
  const router = useRouter()
  const [_, startTransition] = useTransition()
  const pathname = usePathname()

  const handleLocaleSwitcher = (nexLocale: string) => {
    startTransition(() => {
      router.push(pathname, { locale: nexLocale })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={session ? 'https://github.com/shadcn.png' : ''} />
          <AvatarFallback>
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {session ? session.user?.name : t('My Account')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={'/video/create'}>
          <DropdownMenuItem className="cursor-pointer">
            <UploadCloud className="mr-2 h-4 w-4" />
            <span>{t('Upload video')}</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages className="mr-2 h-4 w-4" />
              <span>{t('Language')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    handleLocaleSwitcher('en')
                  }}
                >
                  {locale === 'en' && <Check className="mr-2 h-4 w-4" />}
                  <span className={cn({ 'pl-6': locale !== 'en' })}>
                    {t('English')}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    handleLocaleSwitcher('es')
                  }}
                >
                  {locale === 'es' && <Check className="mr-2 h-4 w-4" />}
                  <span className={cn({ 'pl-6': locale !== 'es' })}>
                    {t('Spanish')}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
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
                    setTheme('light')
                  }}
                >
                  <Sun className="mr-2 h-4 w-4" />
                  <span>{t('Light')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setTheme('dark')
                  }}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  <span>{t('Dark')}</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {session ? (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('Log out')}</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signIn('keycloak')}
          >
            <LogIn className="mr-2 h-4 w-4" />
            <span>{t('Log in')}</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
