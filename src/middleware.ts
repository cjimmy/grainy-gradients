import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/noise.svg') {
    return new NextResponse(null, { status: 410 });
  }
  return NextResponse.next();
}
