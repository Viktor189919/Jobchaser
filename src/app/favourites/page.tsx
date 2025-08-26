"use client"

import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react"
import Joblist from "@/components/Joblist"
import { Jobdata } from "@/types/jobTypes"
import { removeUserJob, getJobs } from "@/utils/api"



export default function FavouritesPage() {
    
    const notify = (msg : string) => toast(msg);

    const [ favJobs, setFavJobs ] = useState<Jobdata[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    useEffect(() => {
        fetchFavJobs()
    }, [])

    async function fetchFavJobs() {

        setIsLoading(true);

        let jobs = await getJobs();

        if (jobs.status === 200) {
            jobs = jobs as {status: number, data: Jobdata[]}
            setFavJobs(jobs.data)
        }

        setIsLoading(false)
    }
 
    async function removeFav(id : string) {

        const result = await removeUserJob(id) 
       
        if (result.status === 200) {
            fetchFavJobs()
        }

        notify(result.message)
    }
    
    return (
        <>
        <h2>Favourite jobs</h2>
        <Joblist jobList={favJobs} modifyFunc={removeFav} isFavourites={true} isLoading={isLoading}/>
        <ToastContainer />
        </>
    )
}