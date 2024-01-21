'use server'

import { redirect } from '@/navigation'
import { writeFile } from 'fs/promises'
import { revalidateTag } from 'next/cache'
import { join } from 'path'

let Vimeo = require('@vimeo/vimeo').Vimeo

export async function uploadFileAction(formData: FormData) {
  const name = formData.get('name')
  const file = formData.get('file') as File

  const client = new Vimeo(
    process.env.VIMEO_CLIENT_ID,
    process.env.VIMEO_CLIENT_SECRET,
    process.env.VIMEO_ACCESS_TOKEN
  )

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join('/', 'tmp', file.name)
  await writeFile(path, buffer)

  let uri: string = ''

  try {
    uri = await new Promise<string>((resolve, reject) => {
      client.upload(
        path,
        {
          name: name,
        },
        function (uri: string) {
          resolve(uri)
        },
        function (bytesUploaded: number, bytesTotal: number) {
          var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
          console.log(bytesUploaded, bytesTotal, percentage + '%')
        },
        function (error: any) {
          reject('Failed because: ' + error)
        }
      )
    })

    const message = await new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const { body } = await client.request(
            uri + '?fields=transcode.status'
          )
          if (body.transcode.status === 'complete') {
            clearInterval(interval)
            resolve('Your video finished transcoding.')
          } else if (body.transcode.status !== 'in_progress') {
            clearInterval(interval)
            reject('Your video encountered an error during transcoding.')
          }
        } catch (error) {
          clearInterval(interval)
          reject(error)
        }
      }, 5000)
    })

    console.log(message)
  } catch (error) {
    console.log(error)
    throw new Error('Error uploading video')
  }

  const id = uri.split('/').pop()
  revalidateTag('allVideos')
  redirect(`/video/${id}`)
}
