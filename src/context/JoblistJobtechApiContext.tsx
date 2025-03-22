"use client"

import { createContext, useState, useRef, RefObject } from "react";
import { Jobdata } from "@/types/jobTypes";

type JoblistContextType = {
    joblist : Jobdata[];
    origJoblist : React.RefObject<Jobdata[]>;
    isLoading : boolean;
    fetchJobs : () => Promise<void>;
}

const JoblistContext = createContext<JoblistContextType | undefined>(undefined)

function JoblistProvider({children} : {children : React.ReactNode}) {

    const [ joblist, setJoblist ] = useState<Jobdata[]>([]);
    const origJoblist = useRef<Jobdata[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    async function fetchJobs() {

        try {

            const response = await fetch("https://jobsearch.api.jobtechdev.se/search?q=programmerare&limit=20");
            
            if (!response.ok) {
                // Insert react toastify. response.status
                console.error(response.status)
            }

            const jobData = await response.json();
            origJoblist.current = jobData.hits
            setJoblist(prevList => [...prevList, ...jobData.hits])
        
        } catch (error) {
            console.error("Error: ", error)

        } finally {
            setIsLoading(prevState => !prevState)
        }     
    }

    return (
        <JoblistContext.Provider value={{joblist, origJoblist, isLoading, fetchJobs}}>{children}</JoblistContext.Provider>
    )
}

export default JoblistProvider;
export { JoblistContext };