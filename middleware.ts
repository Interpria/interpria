import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, isAdmin } from './lib/jwt';

export async function middleware(request: NextRequest) {
  // Get the token from the cookies
  const token = request.cookies.get('token')?.value;

  // Check if the request is for the dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Redirect to login if no token
      console.log('Middleware: No token found, redirecting to login');
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      // Verify the token and check if user is admin
      const decoded = await verifyToken(token);
      
      if (!(await isAdmin(token))) {
        // Redirect to home if not admin
        return NextResponse.redirect(new URL('/', request.url));
      }
      // Allow access if admin
      return NextResponse.next();
    } catch (error) {
      // Redirect to login if token is invalid
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [ '/dashboard', '/dashboard/:path*' ],
}