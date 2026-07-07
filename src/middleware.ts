import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Vérifier l'authentification via les cookies directement
  const sessionCookie = request.cookies.get('sb-access-token')
  
  // Routes protégées
  const protectedRoutes = ['/dashboard', '/admin', '/cartes', '/transferts', '/epargne', '/profil', '/auth/kyc-upload']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Routes d'authentification
  const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/pending']
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname)

  if (isProtectedRoute && !sessionCookie) {
    // Rediriger vers la page de connexion si non authentifié
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isAuthRoute && sessionCookie) {
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