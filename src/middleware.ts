import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Créer le client Supabase pour vérifier la session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  
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
    // Vérifier si l'admin est déjà initialisé
    const { data: settings } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'admin_initialized')
      .single()

    // Si déjà initialisé, rediriger vers login admin
    if (settings && settings.value === true) {
      return NextResponse.redirect(new URL('/sysadmin/login', request.url))
    }

    // Sinon autoriser l'accès au setup
    return NextResponse.next()
  }

  if (isAdminRoute && !session) {
    // Vérifier si l'admin est déjà initialisé
    const { data: settings } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'admin_initialized')
      .single()

    // Si pas initialisé, rediriger vers setup
    if (!settings || settings.value === false) {
      return NextResponse.redirect(new URL('/sysadmin/setup', request.url))
    }

    // Sinon rediriger vers login admin
    return NextResponse.redirect(new URL('/sysadmin/login', request.url))
  }

  if (isAdminRoute && session) {
    // Vérifier le rôle admin depuis les métadonnées utilisateur
    const userRole = session.user.user_metadata?.role
    if (userRole !== 'admin') {
      // Rediriger vers le dashboard client si pas admin
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  if (isProtectedRoute && !session) {
    // Rediriger vers la page de connexion si non authentifié
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isAuthRoute && session) {
    // Rediriger vers le dashboard si déjà authentifié
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}