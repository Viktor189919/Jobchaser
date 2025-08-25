"use server"

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import * as jose from "jose"

export default async function authMiddleware(req : NextRequest) {

    try {
        
        const token = req?.cookies.get("jwt-token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized, missing token" }, { status: 401 });
        }
        
        if (!process.env.JWT_SECRET) {
            console.error("Error from authMiddleware: JWT secret is not defined")
            return NextResponse.json({error: "Internal server error"}, {status: 500});
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secret);
        const decoded = payload as { userId: string };

        const res = NextResponse.next();
        res.headers.set("x-user-id", decoded.userId)

        return res;

    } catch (error) {
        console.error("Error from authMiddleware: ", error);
        return NextResponse.json({error: "Unauthorized, invalid token"}, {status: 401})
    }
}