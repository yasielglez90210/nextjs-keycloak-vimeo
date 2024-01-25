'use server'

import { redirect } from '@/navigation'
import { writeFile } from 'fs/promises'
import { revalidateTag } from 'next/cache'
import { join } from 'path'
import { uploadVideo } from './vimeo'
import { decrypt } from './utils'

export async function uploadFileAction(formData: FormData) {
  const name = formData.get('name') as string
  const file = formData.get('file') as File

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = join('/', 'tmp', file.name)
  await writeFile(path, buffer)

  const uri = await uploadVideo({ path, name })

  const id = uri.split('/').pop()
  revalidateTag('allVideos')
  redirect(`/video/${id}`)
}

export async function setKeycloakAttribute({
  user,
  access_token,
  attributes,
}: {
  user: string
  access_token: string
  attributes: { [key: string]: string }
}) {
  const userId = decrypt(user)
  const accessToken = decrypt(access_token)

  const url = `${process.env.KEYCLOAK_HOST}/admin/realms/eternity/users/${userId}`

  const body = JSON.stringify({
    attributes: {
      ...attributes,
    },
  })

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: body,
  })

  if (!res.ok) {
    return false
  }

  return true
}
