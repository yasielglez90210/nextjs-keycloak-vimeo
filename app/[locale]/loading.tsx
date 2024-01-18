import VideoSkeleton from '@/components/skeletons/VideoSkeleton'

export default function Loading() {
  return (
    <div className="min-h-screen pt-24 px-8">
      <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mb-10">
        {Array.from({ length: 16 }).map((_, index) => (
          <VideoSkeleton info key={index} />
        ))}
      </div>
    </div>
  )
}
