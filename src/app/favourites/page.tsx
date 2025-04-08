"use client"

import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/navigation"
import Joblist from "@/components/Joblist"
import { Jobdata } from "@/types/jobTypes"
import { AuthContext } from "@/context/AuthorizedContext"
import { removeUserJob, getJobs } from "@/utils/api"

export default function FavouritesPage() {
    
    const notify = (msg : string) => toast(msg);
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
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    useEffect(() => {
        fetchFavJobs()
    }, [])

    async function fetchFavJobs() {

        setIsLoading(true);

        const jobs = await getJobs();
        console.log(jobs.jobs)
        if (jobs.status === 200) {
            setFavJobs(jobs.jobs)
        }

        setIsLoading(false)
    }
 
    async function removeFav(id : number) {

        const result = await removeUserJob(id) 
       
        if (result.status === 200) {
            setFavJobs(favJobs.filter(job => job.id !== id))
        }

        notify(result.message)
    }
    
    return (
        <>
        <h2>Favourite jobs</h2>
        <Joblist jobList={favJobs} modifyFunc={removeFav} isFavourites={true} isLoading={isLoading}></Joblist>
        <ToastContainer />
        </>
    )
}