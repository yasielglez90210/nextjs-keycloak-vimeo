'use client'

import useAccessByRol from '@/hooks/useAccessByRol'

export default function CreateVimeoPage() {
  const { session, isRol } = useAccessByRol({
    rol: 'admin',
    callbackUrl: '/vimeo/create',
  })

  if (session && isRol) {
    return (
      <div className="flex h-screen flex-col items-center justify-center font-bold">
        <h2>Create Vimeo Page</h2>
      </div>
    )
  }
}
