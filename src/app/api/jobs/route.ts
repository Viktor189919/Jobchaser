import type { NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient;

export async function POST(req : NextRequest) {

    try {

        const userId = req.headers.get("x-user-id");

        // Validation
        let jobtechId;
        let companyName;
        let jobHeadline;
        let companyURL;

        try {
            ({jobtechId, companyName, jobHeadline, companyURL} = await req.json());
        } catch {
            return Response.json({error: "Invalid JSON format"}, {status: 400})
        }

        if (!userId) {
            return Response.json({error: "Unauthorized, token not found"}, {status: 401});
        }

        if (jobtechId && typeof jobtechId !== "string") {
            return Response.json({error: "Invalid jobtechId type"}, {status: 400})
        }

        if (companyName && typeof companyName !== "string") {
            return Response.json({error: "Invalid companyName type"}, {status: 400})
        }

        if (jobHeadline && typeof jobHeadline !== "string") {
            return Response.json({error: "Invalid jobHeadline type"}, {status: 400})
        }

        if (companyURL && typeof companyURL !== "string") {
            return Response.json({error: "Invalid companyURL type"}, {status: 400})
        }

        const isJob = await prisma.job.findUnique({
            where: {
                id: jobtechId,
            }
        })

        if (!isJob) {

            await prisma.job.create({
                data: {
                    id: jobtechId, 
                    companyName: companyName, 
                    jobHeadline: jobHeadline, 
                    companyURL: companyURL,
                }
            })
        }

        const isUserJob = await prisma.user_jobs.findMany({
            where: {
                user_id: userId,
                job_id: jobtechId,
            }
        })

        if (!isUserJob.length) {

            const userJob = await prisma.user_jobs.create({
                data: {
                    user_id: userId,
                    job_id: jobtechId,
                }
            })

            if (!userJob) {
                return Response.json({error: "Error creating job, please try again"}, {status: 500});
            }
        }

        return Response.json({message: "Job created successfully"}, {status: 201});

    } catch (error) {
        console.error("Error from api/jobs:POST: ", error);
        return Response.json({error: "Internal server error"}, {status: 500});
    }
}

export async function GET(req : NextRequest) {

    try {

        const userId = req.headers.get("x-user-id");

        if (!userId) {
            return Response.json({error: "Unauthorized, token not found"}, {status: 401});
        }

        const user = await prisma.user.findUnique({
            where: { 
                id: userId 
            },
            include: {
                User_jobs: {
                include: {
                    Job: true,
                },
                },
            },
        });

        if (!user) {
            return Response.json({error: "User not found"}, {status: 404})
        }
          
        const jobs = user.User_jobs.map(job => job.Job) ?? [];

        return new Response(JSON.stringify(jobs), {status: 200});

    } catch (error) {
        console.error("Error from api/jobs:GET: ", error);
        Response.json({error: "Internal server error"}, {status: 500});
    }
}

export async function DELETE(req : NextRequest) {

    try {

        const userId = req.headers.get("x-user-id");

        if (!userId) {
            return Response.json({error: "Unauthorized, token not found"}, {status: 401});
        }

        const { id } = await req.json();

        const job = await prisma.job.findUnique({
            where: { 
                id: id 
            },
        });

        if (!job) {
            return Response.json({error: "Job not found"}, {status: 404})
        }

        const delJob = await prisma.user_jobs.deleteMany({
            where: {
                user_id: userId,
                job_id: id,
            }
        })

        return new Response(JSON.stringify(delJob), {status: 200});

    } catch (error) {
        console.error("Error from api/jobs:DELETE: ", error);
        Response.json({error: "Internal server error"}, {status: 500});
    }
}