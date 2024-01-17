import { Link } from '@/navigation'
import Menu from './Menu'
import { getLocale } from 'next-intl/server'
import vimeoLogo from '@/public/vimeo.svg'
import Image from 'next/image'

export default async function Header() {
  const locale = await getLocale()
  return (
    <header className="fixed w-full bg-white dark:bg-black">
      <nav aria-label="Top" className="px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <Image alt="Logo de Vimeo" src={vimeoLogo} width={34} height={34} />
          </Link>
          <Menu locale={locale} />
        </div>
      </nav>
    </header>
  )
}
