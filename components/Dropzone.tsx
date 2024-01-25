'use client'

import { cn } from '@/lib/utils'
import { XCircle } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslations } from 'next-intl'

export default function Dropzone({
  file,
  setFile,
  loading,
}: {
  file: File | null
  setFile: (file: File | null) => void
  loading: boolean | undefined
}) {
  const t = useTranslations('Video')
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0])
    },
    [setFile]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: { 'video/*': ['.mp4', '.mov', '.avi', '.wmv', '.flv'] },
    disabled: loading,
    onDrop,
  })

  return (
    <>
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
          <div key={file.name} className="flex items-center justify-between">
            <p className="text-sm min-h-16 w-full flex items-center justify-center text-center">
              {file.name}
            </p>
            <button
              type="button"
              disabled={loading}
              className="flex absolute -right-4 -top-4 h-8 w-8 items-center justify-center rounded-full ml-5 disabled:cursor-not-allowed"
              onClick={() => setFile(null)}
            >
              <XCircle className="h-6 w-6 fill-white transition-colors hover:fill-zinc-200 dark:text-white dark:fill-black dark:hover:fill-zinc-600" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
