import VideoSkeleton from '@/components/skeletons/VideoSkeleton'

export default function Loading() {
  return (
    <div className="pt-24 w-10/12 mx-auto">
      <VideoSkeleton info={false} />
    </div>
  )
}
