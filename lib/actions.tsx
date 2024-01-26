'use server'

import { redirect } from '@/navigation'
import { writeFile } from 'fs/promises'
import { revalidateTag } from 'next/cache'
import { join } from 'path'
import { uploadVideo } from './vimeo'
import { decrypt } from './utils'
import { setAttributes } from './keycloak'

/**
 * Uploads a file and performs necessary actions after the upload is complete.
 * @param formData - The form data containing the file to be uploaded.
 * @returns {Promise<void>} - A promise that resolves when the upload and actions are complete.
 */
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

/**
 * Sets a Keycloak attribute.
 * @param {Object} options - The options for setting the attribute.
 * @returns {Promise<void>} - A promise that resolves when the attribute is set.
 */
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

  const res = await setAttributes({ userId, accessToken, attributes })

  if (!res.ok) {
    return false
  }

  return true
}
