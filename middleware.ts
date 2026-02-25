import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const pathname = request.nextUrl.pathname

  // Pages exempt from protection
  const isLoginPage =
    pathname === '/admin/login' ||
    pathname === '/customer/login' ||
    pathname === '/customer/signup' ||
    pathname === '/login'

  const isAdminPath = pathname.startsWith('/admin')
  const isAgentPath = pathname.startsWith('/agent')
  const isCustomerPath = pathname.startsWith('/customer')
  const isProtectedPath = (isAdminPath || isAgentPath || isCustomerPath) && !isLoginPage

  // Only run auth checks on protected paths
  if (!isProtectedPath) {
    return supabaseResponse
  }

  try {
    // IMPORTANT: Use getUser() not getSession().
    // getUser() validates the JWT with Supabase's servers and automatically
    // refreshes the access token using the refresh token when expired.
    // This keeps the cookies in sync and prevents stale/invalid token errors.
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      // Invalid/expired session → clear cookies and redirect to login
      const url = request.nextUrl.clone()
      url.pathname = isCustomerPath ? '/customer/login' : '/admin/login'
      url.searchParams.set('redirectTo', pathname)
      const redirectResponse = NextResponse.redirect(url)
      // Clear stale auth cookies so the client starts fresh
      request.cookies.getAll().forEach(({ name }) => {
        if (name.startsWith('sb-')) {
          redirectResponse.cookies.delete(name)
        }
      })
      return redirectResponse
    }

    // Valid user — return response with refreshed cookies
    return supabaseResponse
  } catch {
    // Auth check errored (network, cold start, etc.) — allow through so that
    // the client-side AuthContext can recover and redirect if needed.
    return supabaseResponse
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (they handle their own auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)',
  ],
}
