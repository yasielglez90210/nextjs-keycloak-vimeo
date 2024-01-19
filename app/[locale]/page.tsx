import VideoListSkeleton from '@/components/skeletons/VideoListSkeleton'
import VideoList from '@/components/vimeo/VideoList'
import { Suspense } from 'react'

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string; query: string }
}) {
  const page = searchParams.page ? searchParams.page : '1'
  const query = searchParams.query ? searchParams.query : ''

  return (
    <div className="min-h-screen pt-24 px-8">
      <Suspense key={query} fallback={<VideoListSkeleton />}>
        <VideoList page={page} query={query} />
      </Suspense>
    </div>
  )
}
