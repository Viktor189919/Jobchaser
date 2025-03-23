"use client"

import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/navigation"
import Joblist from "@/components/Joblist"
import { Jobdata } from "@/types/jobTypes"
import { AuthContext } from "@/context/AuthorizedContext"

function FavouritesPage() {
    
    const router = useRouter()
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("Authcontext does not have a valid value");
    }

    const { isAuthorized } = authContext;

    if (!isAuthorized) {
        router.push("/");
    }

    const [ favJobs, setFavJobs ] = useState<Jobdata[]>([])

    useEffect(() => {

        async function fetchFavJobs() {

            const jobs = await getJobs();

            if (!jobs) {}
        }
        

    }, [])

    return (
        <>
        <h2>Favourite jobs</h2>
        <Joblist jobList={favJobs} isLoading={false}></Joblist>
        </>
    )
}