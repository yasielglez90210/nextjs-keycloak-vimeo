'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useAccessByRol({
  rol,
  callbackUrl,
}: {
  rol: string
  callbackUrl: string
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status == 'authenticated' && !session.roles?.includes(rol)) {
      router.push('/unauthorized')
    }

    if (status == 'unauthenticated') {
      signIn('keycloak', {
        callbackUrl,
      })
    }
  }, [session, status, router, callbackUrl, rol])

  return { session, status, isRol: session?.roles?.includes(rol) }
}
