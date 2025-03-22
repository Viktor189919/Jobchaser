"use client"

import React, { useContext, useState, useEffect, useRef } from "react";
import Joblist from "@/components/Joblist";
import Searchbar from "@/components/Searchbar";
import { AuthContext } from "@/context/AuthorizedContext";
import { useRouter } from "next/navigation";
import { Jobdata } from "@/types/jobTypes";

export default function JobsPage() {

    const router = useRouter();

    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value")
    }

    const { isAuthorized } = authContext;

    if (!isAuthorized) {
        router.push("/");
    }

    const [ joblist, setJoblist ] = useState<Jobdata[]>([])
    const origJoblist = useRef<Jobdata>(undefined)
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ searchValue, setSearchValue ] = useState<string>("");


    useEffect(() => {
        
        async function getJobs() {

            try {

                const response = await fetch("https://jobsearch.api.jobtechdev.se/search?q=programmerare&limit=20");
                
                if (!response.ok) {
                    // Insert react toastify. response.status
                    console.error(response.status)
                }

                const jobData = await response.json();
                origJoblist.current = jobData.hits
                setJoblist(prevList => [...prevList, ...jobData.hits])
                console.log(jobData.hits)
            
            } catch (error) {
                console.error("Error: ", error)

            } finally {
                setIsLoading(prevState => !prevState)
            }     
        }

        getJobs()
    
    }, [])

    function handleSearch(e : (React.ChangeEvent<HTMLInputElement>) ) : void {
        setSearchValue(e.target.value);
    };

    function handleFilter(word : string) : void {

        if (word) {

        }
  }

  return  <>
              <Searchbar inputValue={searchValue} searchFunc={handleSearch} filterFunc={handleFilter} />
              <Joblist jobList={joblist} isLoading={isLoading}/>
          </>
};