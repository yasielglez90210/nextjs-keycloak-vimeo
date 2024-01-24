'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { LogOut, LogIn, UploadCloud, UserRound } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'

export default function Menu({ locale }: { locale: string }) {
  const { data: session } = useSession()
  const t = useTranslations('Menu')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            role="img"
            src={session ? 'https://github.com/shadcn.png' : ''}
          />
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

        <LanguageSwitcher locale={locale} />

        <ThemeSwitcher />

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
