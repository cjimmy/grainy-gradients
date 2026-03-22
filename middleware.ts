import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_REFERRERS = [
  'grainy-gradients.vercel.app',
  'css-tricks.com',
  'codepen.io',
];

export function middleware(request: NextRequest) {
  const referer = request.headers.get('referer') || '';

  const isAllowed = referer && ALLOWED_REFERRERS.some((host) => referer.includes(host));
  if (!isAllowed) {
    return new NextResponse(null, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/noise.svg',
};
