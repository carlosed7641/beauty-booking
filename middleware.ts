import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const ADMIN_ROLES = ['admin', 'employee']

const PUBLIC_ADMIN_ROUTES = [
  '/admin/auth/login',
  '/admin/auth/new-account'
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

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  const role = token?.data?.role ?? ''

  const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.some(route =>
    pathname.startsWith(route)
  )

  const isAdmin = role === 'admin'
  const isAdminOrEmployee = ADMIN_ROLES.includes(role)

  const isAdminOnlyRoute = ADMIN_ONLY_ROUTES.some(route =>
    pathname.startsWith(route)
  )

  if (isPublicAdminRoute) {
    if (token && isAdminOrEmployee) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/admin/auth/login', req.url))
  }

  if (!isAdminOrEmployee) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (isAdminOnlyRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}