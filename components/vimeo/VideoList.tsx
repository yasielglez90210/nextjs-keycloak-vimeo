import type { Video } from '@/types/vimeo'
import VideoItem from '@/components/vimeo/VideoItem'

export default function VideoList({ videos }: { videos: Video[] }) {
  return (
    <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mb-10">
      {videos.map((video: Video) => (
        <VideoItem key={video.resource_key} video={video} />
      ))}
    </div>
  )
}
