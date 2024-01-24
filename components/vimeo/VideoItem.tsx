'use client'

import { Link } from '@/navigation'
import type { Video } from '@/types/vimeo'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export default function VideoItem({ video }: { video: Video }) {
  const id = video.uri.split('/').pop()
  const [isHovered, setIsHovered] = useState(false)
  const [play, setPlay] = useState(false)

  const onPlay = () => {
    setPlay((prev) => !prev)
  }

  const onMouseEnter = () => {
    setIsHovered((prev) => !prev)
  }

  const onMouseLeave = () => {
    if (play) setPlay((prev) => !prev)
    setIsHovered((prev) => !prev)
  }

  return (
    <Link
      href={`/video/${id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col">
        <AspectRatio ratio={16 / 9} className="mb-2">
          {!play && (
            <Image
              className="rounded-lg object-cover"
              fill
              priority
              sizes="cover"
              src={video.pictures.base_link}
              alt={video.name}
            />
          )}

          {isHovered && (
            <ReactPlayer
              url={video.link}
              width="100%"
              height="100%"
              controls={false}
              muted
              playing
              loop
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
              }}
              onPlay={onPlay}
            />
          )}
        </AspectRatio>
        <div className="pr-4">
          <h2 className="font-bold text-wrap">{video.name}</h2>
          {/* <p className="text-sm">{video.description}</p> */}
        </div>
      </div>
    </Link>
  )
}
