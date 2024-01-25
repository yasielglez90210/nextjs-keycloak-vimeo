import Layout from '@/components/layouts/Layout'
import VideoSkeleton from '@/components/skeletons/VideoSkeleton'

export default function Loading() {
  return (
    <Layout>
      <div className="pt-24 w-9/12 mx-auto">
        <VideoSkeleton info />
      </div>
    </Layout>
  )
}
