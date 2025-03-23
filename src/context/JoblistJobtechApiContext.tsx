"use client"

import { createContext, useState, useRef } from "react";
import { Jobdata } from "@/types/jobTypes";

type JoblistContextType = {
    joblist : Jobdata[];
    origJoblist : React.RefObject<Jobdata[]>;
    isLoading : boolean;
    fetchJobs : () => Promise<void>;
    filterJobs : (filterValue : string) => void;
}

const JoblistContext = createContext<JoblistContextType | undefined>(undefined)

function JoblistProvider({children} : {children : React.ReactNode}) {

    const [ joblist, setJoblist ] = useState<Jobdata[]>([]);
    const origJoblist = useRef<Jobdata[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const hasFetched = useRef<boolean>(false)

    async function fetchJobs() {

        if (hasFetched.current) {
            return;
        }

        hasFetched.current = true;
        setIsLoading(true)

        try {

            const response = await fetch("https://jobsearch.api.jobtechdev.se/search?q=programmerare&limit=20");
            
            if (!response.ok) {
                // Insert react toastify. response.status
                console.error(response.status)
            }

            const jobData = await response.json();
            origJoblist.current = jobData.hits
            setJoblist([...joblist, ...jobData.hits])
        
        } catch (error) {
            console.error("Error: ", error)

        } finally {
                setIsLoading(false)
            }
        }   
        
    function filterJobs(filterValue : string) {

        if (filterValue !== "" && filterValue !== "all") {
            const filteredJobs = origJoblist.current.filter(job => {

                const headlineIncludes = job.headline
                                            .toLowerCase()
                                            .includes(filterValue.toLowerCase())
                
                const nameIncludes =  job.employer.name
                                        .toLowerCase()
                                        .includes(filterValue.toLowerCase())                           
                if (headlineIncludes || nameIncludes) {
                    return true;
                } else {
                    return false;
                }        
            })

            setJoblist([...filteredJobs]);
        } else {
            setJoblist([...origJoblist.current]);
        }

        
    }

    return (
        <JoblistContext.Provider value={{joblist, origJoblist, isLoading, fetchJobs, filterJobs}}>{children}</JoblistContext.Provider>
    )
}

export default JoblistProvider;
export { JoblistContext };