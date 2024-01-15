import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import { jwtDecode } from 'jwt-decode'

async function refreshAccessToken(token: any) {
  const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_ID || '',
      client_secret: process.env.KEYCLOAK_SECRET || '',
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
    }),
  })
  const refreshToken = await resp.json()
  if (!resp.ok) throw refreshToken

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  }
}

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.KEYCLOAK_ID}`,
      clientSecret: `${process.env.KEYCLOAK_SECRET}`,
      issuer: `${process.env.KEYCLOAK_ISSUER}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000)

      if (account) {
        token.decoded = jwtDecode(account.access_token)
        token.access_token = account.access_token
        token.id_token = account.id_token
        token.expires_at = account.expires_at
        token.refresh_token = account.refresh_token
        return token
      } else if (nowTimeStamp < token.expires_at) {
        return token
      } else {
        console.log('Token has expired. Will refresh...')
        try {
          const refreshedToken = await refreshAccessToken(token)
          console.log('Token is refreshed.')
          return refreshedToken
        } catch (error) {
          console.error('Error refreshing access token', error)
          return { ...token, error: 'RefreshAccessTokenError' }
        }
      }
    },
    async session({ session, token }) {
      session.access_token = token.access_token
      session.id_token = token.id_token
      session.roles = token.decoded.realm_access.roles
      session.error = token.error
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
