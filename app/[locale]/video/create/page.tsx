'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAccessByRol from '@/hooks/useAccessByRol'
import { uploadFileAction } from '@/lib/actions'
import { useTranslations } from 'next-intl'
import { dotSpinner } from 'ldrs'
import Dropzone from '@/components/Dropzone'
import { useState } from 'react'

dotSpinner.register()

export default function CreateVimeoPage() {
  const { session, isRol } = useAccessByRol({
    rol: 'admin',
    callbackUrl: '/video/create',
  })
  const t = useTranslations('Video')
  const [name, setName] = useState<string>()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>()

  const btnLoading = loading || name?.length === 0 || !file

  const uploadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name?.length === 0 || !file) return

    const formData = new FormData(event.currentTarget)
    formData.set('file', file as File)
    setLoading(true)
    await uploadFileAction(formData)
  }

  if (session && isRol) {
    return (
      <div className="container flex h-screen flex-col items-center justify-center">
        <form
          onSubmit={uploadSubmit}
          encType="multipart/form-data"
          className="w-full max-w-lg flex flex-col items-center"
        >
          <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="name">{t('Title')}</Label>
            <Input
              className="focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray-400"
              type="text"
              id="name"
              name="name"
              placeholder={t('Title')}
              value={name}
              disabled={loading}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Dropzone file={file} setFile={setFile} loading={loading} />

          <Button
            disabled={btnLoading}
            className="mt-7 flex items-center"
            type="submit"
          >
            {loading && (
              <div className="mr-2 flex justify-center items-center">
                <l-dot-spinner
                  size="20"
                  speed="1.5"
                  color="white"
                ></l-dot-spinner>
              </div>
            )}
            {loading ? t('Uploading') : t('Upload')}
          </Button>
        </form>
      </div>
    )
  }
}
