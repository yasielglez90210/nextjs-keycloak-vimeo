import VideoList from '@/components/vimeo/VideoList'
import { getAllVideos } from '@/lib/vimeo'

export default async function Home() {
  const response = await getAllVideos()
  const { data: videos } = response

  return (
    <div className="min-h-screen pt-24 px-8">
      <VideoList videos={videos} />
    </div>
  )
}
