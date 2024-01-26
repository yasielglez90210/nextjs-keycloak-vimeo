import Layout from '@/components/layouts/Layout'
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
    <Layout>
      <div className="pt-24 px-8 w-full lg:w-9/12 lg:px-0 mx-auto">
        <VideoPlayer video={video} />
      </div>
    </Layout>
  )
}
