import allVideos from '@/mocks/all-videos.json'
import video from '@/mocks/video.json'
import { APIVimeo, Video } from '@/types/vimeo'

const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN
const VIMEO_USER_ID = process.env.VIMEO_USER_ID
const VIMEO_PROJECT_ID = process.env.VIMEO_PROJECT_ID

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getAllVideos() {
  // const path = `/users/${VIMEO_USER_ID}/projects/${VIMEO_PROJECT_ID}/videos?per_page=8`
  // const response = await fetch(`https://api.vimeo.com${path}`, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: `bearer ${VIMEO_ACCESS_TOKEN}`,
  //   },
  // })
  // const json = await response.json()
  // return json as APIVimeo

  await sleep(1000)
  const apiVimeo = allVideos as APIVimeo
  return apiVimeo
}

export async function getVideo({ id }: { id: string }) {
  // const path = `/videos/${id}`
  // const response = await fetch(`https://api.vimeo.com${path}`, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: `bearer ${VIMEO_ACCESS_TOKEN}`,
  //   },
  // })
  // const json = await response.json()
  // return json as Video

  await sleep(1000)
  const apiVimeo = video as Video
  return apiVimeo
}
