import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export const config = {
    matcher: ['/', '/blocks/:path*', '/documentation/:path*', '/pages/:path*', '/uikit/:path*', '/utilities/:path*']
};

export default async function middleware(req: NextRequest, res: NextResponse) {
    const signInPage = '/auth/login';

    const requestForNextAuth: any = {
        headers: {
            cookie: req.headers.get('cookie')
        }
    };

    const session = await getSession({ req: requestForNextAuth });

    console.log(session);

    if (session) {
        return NextResponse.next();
    }

    const signInUrl = new URL(signInPage, req.nextUrl.origin);

    return NextResponse.redirect(signInUrl);
}
