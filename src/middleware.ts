import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es', 'fr', 'it', 'ja', 'zh'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Host-based validation: Redirect HTTP and www. to https://travellingthroughmorocco.com
  const host = request.headers.get('host') || '';
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');

  if (!isLocalhost && (host.startsWith('www.') || host !== 'travellingthroughmorocco.com' || proto === 'http')) {
    const newUrl = new URL(pathname + request.nextUrl.search, 'https://travellingthroughmorocco.com');
    return NextResponse.redirect(newUrl.toString(), 301);
  }

  // Exclude SEO, AI discovery, and Admin CMS files from locale prefix matching
  const isExcludedFile = ['/llms.txt', '/robots.txt', '/sitemap.xml', '/wp'].includes(pathname);
  if (isExcludedFile) {
    return NextResponse.next();
  }

  // Check if the pathname is missing any locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale prefix
  if (pathnameIsMissingLocale) {
    const locale = 'en'; // default locale

    // Redirect to the locale-prefixed URL
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths, api routes, static resources, media, root discovery/SEO files, and wp dashboard
    '/((?!api|_next/static|_next/image|images|favicon.ico|llms.txt|robots.txt|sitemap.xml|wp).*)',
  ],
};
