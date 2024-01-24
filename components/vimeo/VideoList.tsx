import type { APIVimeo, Video } from '@/types/vimeo'
import VideoItem from '@/components/vimeo/VideoItem'
import { getAllVideos } from '@/lib/vimeo'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getTranslations } from 'next-intl/server'
import MyPagination from '@/components/MyPagination'

export default async function VideoList({
  page,
  query,
}: {
  page: string
  query: string
}) {
  const response = await getAllVideos({ page, query })
  const { data: videos, total, per_page } = response as APIVimeo
  const t = await getTranslations('Search')
  const totalPages = Math.ceil(total / per_page)

  if (videos.length > 0) {
    return (
      <>
        <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mb-10">
          {videos?.map(
            (video: Video) =>
              video.status === 'available' && (
                <VideoItem key={video.resource_key} video={video} />
              )
          )}
        </div>
        {total > per_page && (
          <MyPagination
            totalPages={totalPages}
            className="self-center lg:self-end mt-auto mb-10"
          />
        )}
      </>
    )
  } else {
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
}
