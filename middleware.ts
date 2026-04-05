import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const adminOnlyRoutes = [
    '/admin/services',
    '/admin/customers',
    '/admin/followers',
    '/admin/settings',
    '/admin/shop-profile',
    '/admin/work-days',
    '/admin/linking-professional',
    '/admin/blocked-users'
]

const publicAdminRoutes = [
    '/admin/auth/login',
    '/admin/auth/new-account'
]


export async function middleware(req: NextRequest) {

    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    const { pathname } = req.nextUrl

    if (!pathname.startsWith('/admin')) {
        return NextResponse.next()
    }

    if (publicAdminRoutes.includes(pathname)) {
        return NextResponse.next()
    }

    if (!token) {
        return NextResponse.redirect(new URL('/admin/auth/login', req.url))
    }

    const role = token?.data?.role

    if (role === 'user') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    const isAdminOnlyRoute = adminOnlyRoutes.includes(pathname)

    if (isAdminOnlyRoute && role !== 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url))
    }

    return NextResponse.next()
}