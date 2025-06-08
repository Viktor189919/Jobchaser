import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const SALT_ROUNDS = process.env.SALT_ROUNDS || "10";

export async function POST(req : NextRequest) {

    const { email, password } = await req.json();

    if (email && typeof email !== "string") {
        return Response.json({error: "Invalid email type", status: 400})
    }

    if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return Response.json({error: "Invalid email address", status: 400})
    }

    if (password && typeof password !== "string") {
        return Response.json({error: "Invalid password type", status: 400})
    }

    if (password && password.length < 8) {
        return Response.json({error: "Invalid password length", status: 400})
    }

    try {

        const isUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
        if (isUser) {
            return Response.json({error: "A user with this email already exists", status: 409});
        }
    
        const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))
    
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        })
    
        if (!user) {
            return Response.json({error: "Internal server error", status: 500})
        }
    
    } catch (error) {
        console.error("Error from api/auth/signup:POST: ", error)
        return Response.json({error: "Internal server error", status: 500})
    }

    return Response.json({message: "User created successfully", status: 201});
}