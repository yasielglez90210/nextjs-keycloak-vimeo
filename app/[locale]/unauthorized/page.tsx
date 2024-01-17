import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Unauthorized() {
  const t = useTranslations('NotFound')

  return (
    <main className="grid h-screen place-content-center bg-white dark:bg-black px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-black dark:text-white">401</h1>
        <p className="mt-4 text-gray-500 mb-3">{t('Unauthorized')}.</p>
        <Button asChild>
          <Link href="/">{t('Go Back Home')}</Link>
        </Button>
      </div>
    </main>
  )
}
