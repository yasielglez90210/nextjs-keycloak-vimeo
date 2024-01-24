'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAccessByRol from '@/hooks/useAccessByRol'
import { uploadFileAction } from '@/lib/actions'
import { useTranslations } from 'next-intl'
import Dropzone from '@/components/Dropzone'
import { useCallback, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

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

  const uploadSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (name?.length === 0 || !file) return

      const formData = new FormData(event.currentTarget)
      formData.set('file', file as File)
      setLoading(true)
      await uploadFileAction(formData)
    },
    [file, name]
  )

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
              <UploadCloud width={20} className="mr-2 animate-pulse" />
            )}
            {loading ? t('Uploading') : t('Upload')}
          </Button>

          {loading && (
            <Alert className="w-full mx-auto text-center mt-8">
              <AlertDescription>
                {t(
                  'This process may take several minutes while we load and optimize the selected video'
                )}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    )
  }
}
