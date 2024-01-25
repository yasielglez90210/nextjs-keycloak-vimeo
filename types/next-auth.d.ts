import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    roles?: string[]
    error?: any
    sub?: string
    access_token?: string
  }

  interface Account {
    access_token?: string
    id_token?: string
    expires_at?: number
    refresh_token?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string
    access_token?: string
    decoded?: any
    expires_at?: number
    refresh_token?: string
  }
}
