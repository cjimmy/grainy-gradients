import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const referer = request.headers.get('referer') || 'none';
  const ua = request.headers.get('user-agent') || 'none';
  console.log(`noise.svg request — referer: ${referer}, ua: ${ua}`);
  return NextResponse.next();
}

export const config = {
  matcher: '/noise.svg',
};
