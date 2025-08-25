import type { NextRequest } from 'next/server';
import authMiddleware from '@/middleware/authorize';

export function middleware(req : NextRequest) {

    const pathname = req.nextUrl.pathname;

    if (!pathname.includes("/auth/") && !pathname.endsWith("/api/users")) {
        return authMiddleware(req)
    } 
}

export const config = {
    matcher: [
        '/favourites/:path*',
        '/jobs/:path*',
        '/api/:path*',
    ],
};