import './auth-env'
import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'

// Edge-compatible auth config without argon2
export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      const isOnLogin = nextUrl.pathname === '/admin/login'

      if (isOnAdmin && !isOnLogin) {
        if (!isLoggedIn) return false
        return true
      }

      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/admin', nextUrl))
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}

export const { auth: edgeAuth } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  trustHost: true,
})
