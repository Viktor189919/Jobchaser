"use client"

import { createContext, useState, useRef } from "react";
import { Jobdata } from "@/types/jobTypes";

type JoblistContextType = {
    joblist : Jobdata[];
    origJoblist : React.RefObject<Jobdata[]>;
    isLoading : boolean;
    fetchJobs : (page : number) => Promise<void>;
    filterJobs : (filterValue : string) => void;
    findJobById : (id : string) => Jobdata | null;
    activePage : number;
    changeActivePage : (page : number) => void;
}

const JoblistContext = createContext<JoblistContextType | undefined>(undefined)

function JoblistProvider({children} : {children : React.ReactNode}) {

    const [ joblist, setJoblist ] = useState<Jobdata[]>([]);
    const origJoblist = useRef<Jobdata[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ activePage, setActivePage ] = useState<number>(1)

    async function fetchJobs(page : number) {

        const offset = page > 1
                            ?(20 * page).toString()
                            : 0;

        setIsLoading(true)

        try {

            const response = await fetch(`https://jobsearch.api.jobtechdev.se/search?q=programmerare&offset=${offset}&limit=20`);
            
            if (!response.ok) {
                console.error("Error from jobtech fetch: ", response)
            }

            const data = await response.json();
            const jobData = data.hits.map((job: { id: string; employer: { name: string; url: string; }; logo_url: string; headline: string; }) => {
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

    function findJobById(id : string) {

        const job = joblist.filter(job => job.id === id)

        if (job.length < 1) {
            return null;
        }
        return job[0];
    }

    function changeActivePage(page : number) {
        setActivePage(page)
    }

    return (
        <JoblistContext.Provider value={{joblist, origJoblist, isLoading, fetchJobs, filterJobs, findJobById, activePage, changeActivePage}}>{children}</JoblistContext.Provider>
    )
}

export default JoblistProvider;
export { JoblistContext };