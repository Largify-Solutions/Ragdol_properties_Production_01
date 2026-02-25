import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes - redirect to appropriate login if not authenticated
  const pathname = request.nextUrl.pathname

  // Skip login/signup pages from protection
  const isLoginPage =
    pathname === '/admin/login' ||
    pathname === '/customer/login' ||
    pathname === '/customer/signup' ||
    pathname === '/login'

  const isAdminPath = pathname.startsWith('/admin')
  const isAgentPath = pathname.startsWith('/agent')
  const isCustomerPath = pathname.startsWith('/customer')
  const isProtectedPath = (isAdminPath || isAgentPath || isCustomerPath) && !isLoginPage

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    if (isCustomerPath) {
      url.pathname = '/customer/login'
    } else {
      url.pathname = '/admin/login'
    }
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // Role-based access control
  if (user && isProtectedPath) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile) {
      // Admin routes - only admins
      if (isAdminPath && !isLoginPage && profile.role !== 'admin') {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
      }

      // Agent routes - only agents and admins
      if (isAgentPath && profile.role !== 'agent' && profile.role !== 'admin') {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
      }
    }
  }

  return supabaseResponse
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
