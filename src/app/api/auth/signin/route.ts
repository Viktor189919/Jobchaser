import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken";
import { serialize } from "cookie"
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export async function POST(req : NextRequest) {

    try {

        let email : string;
        let password : string;

        try {
            ({ email, password } = await req.json());
        } catch {
            return Response.json({error: "Invalid JSON format"}, {status: 400})
        }
        
        if (email && typeof email !== "string") {
            return Response.json({error: "Invalid email type"}, {status: 400});
        }

        if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return Response.json({error: "Invalid email address"}, {status: 400});
        }

        if (password && typeof password !== "string") {
            return Response.json({error: "Invalid password type"}, {status: 400});
        }

        if (password && password.length < 8) {
            return Response.json({error: "Invalid password length"}, {status: 400});
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (!user) {
            return Response.json({error: "Invalid credentials"}, {status: 401});
        }

        const isPassword = bcrypt.compare(user.password, password);

        if (!isPassword) {
            return Response.json({error: "Invalid credentials"}, {status: 401});
        }

        const JWT_SECRET = process.env.JWT_SECRET

        if (!JWT_SECRET) {
            throw new Error("JWT secret is not defined")
        }

        const jwtToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: "1h",
        });

        const cookie = serialize("jwt-token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1 * 60 * 60, 
            path: "/",
        });

        return new Response(JSON.stringify({userData: user, message: "Signed in successfully"}), {
            status: 200,
            headers: {
                'Set-Cookie': cookie,
                'Content-Type': 'application/json',
            },
        } );

    } catch (error) {
        console.error("Error from api/auth/signin:POST: ", error)
        return Response.json({error: "Internal server error", status: 500})
    }
}