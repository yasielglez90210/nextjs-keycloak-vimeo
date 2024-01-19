'use client' // Error components must be Client Components

import { useTranslations } from 'next-intl'

export default function Error() {
  const t = useTranslations('NotFound')

  return (
    <main className="grid h-screen place-content-center bg-white dark:bg-black px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-black dark:text-white">500</h1>
        <p className="mt-4 text-gray-500 mb-3">{t('Something went wrong')}!</p>
      </div>
    </main>
  )
}
