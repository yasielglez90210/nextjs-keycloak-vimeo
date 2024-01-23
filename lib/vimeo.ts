import allVideos from '@/mocks/all-videos.json'
import video from '@/mocks/video.json'
import { APIVimeo, Video } from '@/types/vimeo'

const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN
const VIMEO_USER_ID = process.env.VIMEO_USER_ID
const VIMEO_PER_PAGE = process.env.VIMEO_PER_PAGE

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getAllVideos({
  page,
  query,
}: {
  page: string
  query: string
}) {
  try {
    const path = `/users/${VIMEO_USER_ID}/videos?query=${query}&page=${page}&per_page=${VIMEO_PER_PAGE}`
    const res = await fetch(`https://api.vimeo.com${path}`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${VIMEO_ACCESS_TOKEN}`,
      },
      cache: 'reload',
      next: { tags: ['allVideos'] },
    })

    if (res.status === 400) {
      return { data: [] }
    }

    const json = await res.json()
    return json as APIVimeo
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch all video.')
  }

  // await sleep(1000)
  // const apiVimeo = allVideos as APIVimeo
  // return apiVimeo
}

export async function getVideo({ id }: { id: string }) {
  try {
    const path = `/videos/${id}`
    const res = await fetch(`https://api.vimeo.com${path}`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${VIMEO_ACCESS_TOKEN}`,
      },
      cache: 'reload',
    })

    if (res.status === 404) {
      return null
    }

    const json = await res.json()
    return json as Video
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch video.')
  }

  // await sleep(1000)
  // const apiVimeo = video as Video
  // return apiVimeo
}
