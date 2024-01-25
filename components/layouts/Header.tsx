import { Link } from '@/navigation'
import Menu from './Menu'
import vimeoLogo from '@/public/vimeo.svg'
import Image from 'next/image'
import Search from '../Search'

export default function Header() {
  return (
    <header className="fixed w-full bg-white dark:bg-black shadow-sm z-10 dark:shadow-sm dark:shadow-zinc-800">
      <nav aria-label="Top" className="px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <Image alt="Logo de Vimeo" src={vimeoLogo} width={34} height={34} />
          </Link>
          <Search />
          <Menu />
        </div>
      </nav>
    </header>
  )
}
