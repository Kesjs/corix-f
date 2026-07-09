import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Response de base, potentiellement mise à jour par le refresh des cookies
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Créer le client Supabase avec gestion complète des cookies (get/set/remove)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // getUser() revalide le token auprès de Supabase (plus sûr que getSession()
  // qui se contente de lire le cookie sans vérifier sa validité côté serveur)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthenticated = !!user

  // Routes protégées
  const protectedRoutes = ['/dashboard', '/sysadmin', '/cartes', '/transferts', '/epargne', '/profil', '/auth/kyc-upload']
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  // Routes d'authentification
  const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/pending']
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname)

  // Vérifier si c'est une route admin
  const isAdminRoute = request.nextUrl.pathname.startsWith('/sysadmin')
  const isAdminSetupRoute = request.nextUrl.pathname === '/sysadmin/setup'

  if (isAdminSetupRoute) {
    const { data: settings } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'admin_initialized')
      .single()

    if (settings && settings.value === true) {
      return NextResponse.redirect(new URL('/sysadmin/login', request.url))
    }

    return response
  }

  if (isAdminRoute && !isAuthenticated) {
    const { data: settings } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'admin_initialized')
      .single()

    if (!settings || settings.value === false) {
      return NextResponse.redirect(new URL('/sysadmin/setup', request.url))
    }

    return NextResponse.redirect(new URL('/sysadmin/login', request.url))
  }

  if (isAdminRoute && isAuthenticated) {
    const userRole = user?.user_metadata?.role
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
