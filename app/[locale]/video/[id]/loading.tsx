import Layout from '@/components/layouts/Layout'
import VideoSkeleton from '@/components/skeletons/VideoSkeleton'

export default function Loading() {
  return (
    <Layout>
      <div className="pt-24 px-8 w-full lg:w-9/12 lg:px-0 mx-auto">
        <VideoSkeleton info />
      </div>
    </Layout>
  )
}
