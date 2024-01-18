import { AspectRatio } from '../ui/aspect-ratio'
import { Skeleton } from '../ui/skeleton'

export default function VideoSkeleton({ info = true }: { info: boolean }) {
  return (
    <div className="flex flex-col">
      <AspectRatio ratio={16 / 9} className="mb-2">
        <Skeleton className="rounded-lg w-full h-full" />
      </AspectRatio>
      {info && (
        <div className="pr-4">
          <Skeleton className="rounded-lg w-[95%] h-[13px] mb-2" />
          <Skeleton className="rounded-lg w-[80%] h-[13px]" />
        </div>
      )}
    </div>
  )
}
