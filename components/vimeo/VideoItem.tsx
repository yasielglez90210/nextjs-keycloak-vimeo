'use client'

import { Link } from '@/navigation'
import type { Video } from '@/types/vimeo'
import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { LegacyRef, useEffect, useRef, useState } from 'react'
import Player from '@vimeo/player'

export default function VideoItem({ video }: { video: Video }) {
  const id = video.uri.split('/').pop()
  const [isHovered, setIsHovered] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const playerRef = useRef<HTMLElement | null>(null)

  const onMouse = () => {
    setIsHovered((prev) => !prev)
  }

  useEffect(() => {
    if (isHovered && playerRef.current) {
      const player = new Player(playerRef.current)

      if (imageRef.current) imageRef.current.classList.add('rounded-none')

      player.on('play', () => {
        if (playerRef.current) playerRef.current.classList.remove('opacity-0')
      })
    } else {
      if (imageRef.current) imageRef.current.classList.remove('rounded-none')
    }
  }, [isHovered])

  return (
    <Link href={`/video/${id}`} onMouseEnter={onMouse} onMouseLeave={onMouse}>
      <div className="flex flex-col">
        <AspectRatio ratio={16 / 9} className="mb-2">
          <Image
            ref={imageRef}
            className="rounded-lg object-cover transition-all duration-300 ease-in-out"
            fill
            priority
            sizes="cover"
            src={video.pictures.base_link}
            alt={video.name}
          />

          {isHovered && (
            <iframe
              className="opacity-0"
              ref={playerRef as LegacyRef<HTMLIFrameElement>}
              src={`${video.player_embed_url}?portrait=0&transparent=0&autoplay=1&muted=1&background=1&autopause=1&loop=1&quality=auto&responsive=1`}
            ></iframe>
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
