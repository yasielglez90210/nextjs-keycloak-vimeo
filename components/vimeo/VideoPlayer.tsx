'use client'

import { Video } from '@/types/vimeo'
import { AspectRatio } from '../ui/aspect-ratio'

export default function VideoPlayer({ video }: { video: Video }) {
  return (
    <>
      <AspectRatio ratio={16 / 9} className="mb-2 rounded-md bg-muted">
        <iframe
          src={`${video.player_embed_url}?portrait=0&transparent=0&title=0&byline=0`}
        ></iframe>
      </AspectRatio>
      <div className="pr-4 mb-10">
        <h2 className="font-bold text-wrap">{video.name}</h2>
        {/* <p className="text-sm">{video.description}</p> */}
      </div>
    </>
  )
}
