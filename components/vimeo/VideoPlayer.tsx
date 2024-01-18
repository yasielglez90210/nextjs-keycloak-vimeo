'use client'

import { Video } from '@/types/vimeo'
import React from 'react'
import dynamic from 'next/dynamic'
import { AspectRatio } from '../ui/aspect-ratio'
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

export default function VideoPlayer({ video }: { video: Video }) {
  return (
    <AspectRatio ratio={16 / 9}>
      <ReactPlayer url={video.link} width="100%" height="100%" controls />
    </AspectRatio>
  )
}
