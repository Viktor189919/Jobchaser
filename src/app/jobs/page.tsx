"use client"

import React, { useContext, useState, useEffect } from "react";
import Joblist from "@/components/Joblist";
import Searchbar from "@/components/Searchbar";
import { AuthContext } from "@/context/AuthorizedContext";
import { useRouter } from "next/navigation";
import { JoblistContext } from "@/context/JoblistJobtechApiContext";

export default function JobsPage() {

    const router = useRouter();

    const authContext = useContext(AuthContext)
    const joblistContext = useContext(JoblistContext)

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value");
    }

    if (!joblistContext) {
        throw new Error("Joblistcontext does not have a valid value");
    }

    const { isAuthorized } = authContext;

    if (!isAuthorized) {
        router.push("/");
    }

    const { joblist, isLoading, fetchJobs, filterJobs } = joblistContext;

    const [ searchValue, setSearchValue ] = useState<string>("");


    useEffect(() => {
        
        fetchJobs();

    }, [])

    function handleSearch(e : (React.ChangeEvent<HTMLInputElement>) ) : void {
        setSearchValue(e.target.value);
        filterJobs(searchValue);
    };

    function handleFilter(word : string) : void {

        if (word) {
            filterJobs(word);
        }
    }

    return  <>
              <Searchbar inputValue={searchValue} searchFunc={handleSearch} filterFunc={handleFilter} />
              <Joblist jobList={joblist} isLoading={isLoading}/>
          </>
};