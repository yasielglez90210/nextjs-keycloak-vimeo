'use client'

import { Video } from '@/types/vimeo'
import React from 'react'
import dynamic from 'next/dynamic'
import { AspectRatio } from '../ui/aspect-ratio'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export default function VideoPlayer({ video }: { video: Video }) {
  return (
    <>
      <AspectRatio ratio={16 / 9} className="mb-2">
        <ReactPlayer
          url={video.link}
          width="100%"
          height="100%"
          controls={false}
          muted
          playing
          loop
        />
      </AspectRatio>
      <div className="pr-4 mb-10 pl-2">
        <h2 className="font-bold text-wrap">{video.name}</h2>
        {/* <p className="text-sm">{video.description}</p> */}
      </div>
    </>
  )
}
