import VideoListSkeleton from '@/components/skeletons/VideoListSkeleton'
import VideoList from '@/components/vimeo/VideoList'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <div className="min-h-screen pt-24 px-8">
      <Suspense fallback={<VideoListSkeleton />}>
        <VideoList />
      </Suspense>
    </div>
  )
}
