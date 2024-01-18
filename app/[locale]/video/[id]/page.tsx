import VideoPlayer from '@/components/vimeo/VideoPlayer'
import { getVideo } from '@/lib/vimeo'

export default async function VideoViewPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id
  const video = await getVideo({ id })

  return (
    <div className="pt-24 w-10/12 mx-auto">
      <VideoPlayer video={video} />
    </div>
  )
}
