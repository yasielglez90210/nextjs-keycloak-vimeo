import type { Video } from '@/types/vimeo'
import VideoItem from '@/components/vimeo/VideoItem'
import { getAllVideos } from '@/lib/vimeo'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getTranslations } from 'next-intl/server'

export default async function VideoList({
  page,
  query,
}: {
  page: string
  query: string
}) {
  const response = await getAllVideos({ page, query })
  const { data: videos } = response
  const t = await getTranslations('Search')

  if (videos.length > 0) {
    return (
      <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mb-10">
        {videos?.map((video: Video) => (
          <VideoItem key={video.resource_key} video={video} />
        ))}
      </div>
    )
  } else {
    return (
      <Alert className="max-w-md mx-auto text-center">
        <AlertDescription>
          {t('There are no results that match')}: <strong>{query}</strong>
        </AlertDescription>
      </Alert>
    )
  }
}
