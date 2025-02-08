import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For example, check for an authentication token in cookies
  // console.log(request);
  const token = request.cookies.get('token');

  // If no token is present, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

// Configure middleware to run for protected routes
export const config = {
  matcher: ['/freelancer/:path*', '/client/:path*'],
};
