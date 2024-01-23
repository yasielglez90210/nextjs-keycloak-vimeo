import { Languages, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useRouter, usePathname } from '@/navigation'
import { useTranslations } from 'next-intl'

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('Menu')

  const handleLocaleSwitcher = (nexLocale: string) => {
    const params = new URLSearchParams(searchParams)
    router.push(`${pathname}?${params.toString()}`, { locale: nexLocale })
  }
  return (
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
  )
}
