'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAccessByRol from '@/hooks/useAccessByRol'
import { uploadFileAction } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { XCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { dotSpinner } from 'ldrs'

dotSpinner.register()

export default function CreateVimeoPage() {
  const { session, isRol } = useAccessByRol({
    rol: 'admin',
    callbackUrl: '/video/create',
  })
  const t = useTranslations('Video')
  const [name, setName] = useState<string>()
  const [file, setFile] = useState<File | null>()
  const [loading, setLoading] = useState<boolean>()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0])
    },
    [setFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div
            {...getRootProps({
              className: cn('border border-dashed p-7 sm:px-20 w-full mt-7', {
                hidden: file,
              }),
            })}
          >
            <input {...getInputProps({ name: 'file' })} />
            <div className="flex flex-col items-center justify-center w-full">
              {/* <ArrowUpTrayIcon className="h-5 w-5 fill-current" /> */}
              {isDragActive ? (
                <p className="text-sm min-h-16 w-full flex items-center justify-center text-center">
                  {t('Drop the files here')}...
                </p>
              ) : (
                <p className="text-sm min-h-16 w-full flex items-center justify-center text-center">
                  {t('Drag & drop files here, or click to select files')}
                </p>
              )}
            </div>
          </div>

          {file && (
            <div className="mt-7 border border-dashed p-7 sm:px-20 w-full relative min-h-20">
              <div
                key={file.name}
                className="flex items-center justify-between"
              >
                <p className="text-sm min-h-16 w-full flex items-center justify-center text-center">
                  {file.name}
                </p>
                <button
                  type="button"
                  className="flex absolute -right-4 -top-4 h-8 w-8 items-center justify-center rounded-full ml-5"
                  onClick={() => setFile(null)}
                >
                  <XCircle className="h-6 w-6 fill-white transition-colors hover:fill-zinc-200" />
                </button>
              </div>
            </div>
          )}

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
