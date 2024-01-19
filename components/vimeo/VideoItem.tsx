import { Link } from '@/navigation'
import type { Video } from '@/types/vimeo'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function VideoItem({ video }: { video: Video }) {
  const id = video.uri.split('/').pop()
  return (
    <Link href={`/video/${id}`} className="">
      <div className="flex flex-col">
        <AspectRatio ratio={16 / 9} className="mb-2">
          <Image
            className="rounded-lg object-cover"
            fill
            sizes="cover"
            loading="lazy"
            src={video.pictures.base_link}
            alt={video.name}
          />
        </AspectRatio>
        <div className="pr-4">
          <h2 className="font-bold text-wrap">{video.name}</h2>
          <p className="text-sm">{video.description}</p>
        </div>
      </div>
    </Link>
  )
}
