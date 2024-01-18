import type { Video } from '@/types/vimeo'
import VideoItem from '@/components/vimeo/VideoItem'
import { getAllVideos } from '@/lib/vimeo'

export default async function VideoList() {
  const response = await getAllVideos()
  const { data: videos } = response

  return (
    <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mb-10">
      {videos.map((video: Video) => (
        <VideoItem key={video.resource_key} video={video} />
      ))}
    </div>
  )
}
