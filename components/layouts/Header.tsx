import Link from 'next/link'
import Menu from './Menu'

export default function Header() {
  return (
    <header className="relative">
      <nav aria-label="Top" className="px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="ml-4 flex lg:ml-0">
            <Link href="/">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
          </div>

          <Menu />
        </div>
      </nav>
    </header>
  )
}
