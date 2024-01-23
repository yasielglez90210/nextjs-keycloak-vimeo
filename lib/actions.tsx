'use server'

import { redirect } from '@/navigation'
import { writeFile } from 'fs/promises'
import { revalidateTag } from 'next/cache'
import { join } from 'path'
import { uploadVideo } from './vimeo'

export async function uploadFileAction(formData: FormData) {
  const name = formData.get('name')
  const file = formData.get('file') as File

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join('/', 'tmp', file.name)
  await writeFile(path, buffer)

  const uri = await uploadVideo({ path })

  const id = uri.split('/').pop()
  revalidateTag('allVideos')
  redirect(`/video/${id}`)
}
