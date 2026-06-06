import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const ADMIN_ROLES = ['admin', 'employee']

const PUBLIC_ADMIN_ROUTES = [
  '/admin/auth/login',
  '/admin/auth/new-account'
]

const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/new-account'
]


const ADMIN_ONLY_ROUTES = [
  '/admin/services',
  '/admin/customers',
  '/admin/followers',
  '/admin/settings',
  '/admin/shop-profile',
  '/admin/work-days',
  '/admin/linking-professional',
  '/admin/blocked-users'
]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  const role = token?.data?.role ?? ''

    console.log(
      'AUTH_SECRET middleware:',
      process.env.AUTH_SECRET?.slice(0, 10)
    )

    console.log(
  'session cookie exists:',
  !!req.cookies.get('__Secure-authjs.session-token')
)

  const isAdminOrEmployee = ADMIN_ROLES.includes(role)
  const isAdminRoute = pathname.startsWith('/admin')
  const isAdminHome = pathname === '/admin'

  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    pathname.startsWith(route)
  )

  if (isAdminOrEmployee && !isAdminRoute) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  if (!isAdminRoute) {
    if (isPublicRoute && token) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
  }

  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.some(route =>
    pathname.startsWith(route)
  )

  const isAdminOnlyRoute = ADMIN_ONLY_ROUTES.some(route =>
    pathname.startsWith(route)
  )

  if (isPublicAdminRoute) {
    if (token && isAdminOrEmployee && !isAdminHome) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    if (token && !isAdminOrEmployee) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/admin/auth/login', req.url))
  }

  if (!isAdminOrEmployee) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (isAdminOnlyRoute && role !== 'admin' && !isAdminHome) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico).*)',
  ],
}