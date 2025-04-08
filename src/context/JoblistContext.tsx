"use client"

import { createContext, useState, useRef } from "react";
import { Jobdata } from "@/types/jobTypes";

type JoblistContextType = {
    joblist : Jobdata[];
    origJoblist : React.RefObject<Jobdata[]>;
    isLoading : boolean;
    fetchJobs : () => Promise<void>;
    filterJobs : (filterValue : string) => void;
    findJobById : (id : number) => Jobdata | null;
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

            const data = await response.json();
            const jobData = data.hits.map((job: { id: any; employer: { name: any; url: any; }; logo_url: any; headline: any; }) => {
                return {id: job.id, companyName: job.employer.name, companyURL: job.employer.url, logo_url: job.logo_url, jobHeadline: job.headline}
            })

            origJoblist.current = jobData
            setJoblist([...jobData])

        } catch (error) {
            console.error("Error: ", error)

        } finally {
                setIsLoading(false)
            }
        }   
        
    function filterJobs(filterValue : string) {

        if (filterValue !== "" && filterValue !== "all") {
            const filteredJobs = origJoblist.current.filter(job => {

                const headlineIncludes = job.jobHeadline
                                            .toLowerCase()
                                            .includes(filterValue.toLowerCase())
                
                const nameIncludes =  job.companyName
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

    function findJobById(id : number) {

        const job = joblist.filter(job => job.id === id)

        if (job.length < 1) {
            return null;
        }
        return job[0];
    }

    return (
        <JoblistContext.Provider value={{joblist, origJoblist, isLoading, fetchJobs, filterJobs, findJobById}}>{children}</JoblistContext.Provider>
    )
}

export default JoblistProvider;
export { JoblistContext };