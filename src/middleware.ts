import { edgeAuth } from '@/lib/auth.edge'
import { NextResponse } from 'next/server'

export default edgeAuth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth

  if (pathname.startsWith('/api/admin') || pathname === '/api/upload') {
    if (!isAuthenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      // Redirect to dashboard if already authenticated
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      return NextResponse.next()
    }

    // Require authentication for all other admin routes
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/upload'],
}
