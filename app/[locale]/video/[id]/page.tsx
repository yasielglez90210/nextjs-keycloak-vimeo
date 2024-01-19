import VideoPlayer from '@/components/vimeo/VideoPlayer'
import { getVideo } from '@/lib/vimeo'
import { notFound } from 'next/navigation'

export default async function VideoViewPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id
  const video = await getVideo({ id })

  if (!video) notFound()

  return (
    <div className="pt-24 w-10/12 mx-auto">
      <VideoPlayer video={video} />
    </div>
  )
}
