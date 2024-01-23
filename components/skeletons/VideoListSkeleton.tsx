import VideoSkeleton from './VideoSkeleton'

export default function VideoListSkeleton() {
  return (
    <div className="grid gap-x-6 gap-y-10 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] mb-10">
      {Array.from({ length: 8 }).map((_, index) => (
        <VideoSkeleton info key={index} />
      ))}
    </div>
  )
}
