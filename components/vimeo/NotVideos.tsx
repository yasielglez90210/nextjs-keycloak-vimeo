import { Alert, AlertDescription } from '../ui/alert'
import { getTranslations } from 'next-intl/server'

export default async function NotVideos({ query }: { query: string }) {
  const t = await getTranslations('Search')
  return (
    <Alert className="max-w-md mx-auto text-center">
      {query ? (
        <AlertDescription>
          {t('There are no results that match')}: <strong>{query}</strong>
        </AlertDescription>
      ) : (
        <AlertDescription>{t('There are no results')}</AlertDescription>
      )}
    </Alert>
  )
}
