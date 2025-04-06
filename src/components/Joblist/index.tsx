"use client"

import React, { useContext, useState, CSSProperties } from "react"
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { JoblistProps } from "@/types/jobTypes";
import Job from "@/components/Job";
import { saveJob } from "@/utils/api"
import { JoblistContext } from "@/context/JoblistContext";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthorizedContext";
import styles from "@/components/Joblist/Joblist.module.css" 

const override: CSSProperties = {
    alignSelf: "center",
}

export default function Joblist({jobList, isLoading} : JoblistProps) {

    const router = useRouter();

    const themeContext = useContext(ThemeContext);
    const authContext = useContext(AuthContext);
    const joblistContext = useContext(JoblistContext);

    if (!themeContext) {
        throw new Error("ThemeContext does not have a valid value");
    }

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value");
    }

    if (!joblistContext) {
        throw new Error("JoblistContext does not have a valid value");
    }

    const { darkTheme } = themeContext;
    const { isAuthorized } = authContext;
    const { findJobById } = joblistContext;

    console.log("Joblist from Joblist component", jobList)

    if (!isAuthorized) {
        router.push("/");
    }

    async function addFavourite(id : number) {

        const job = findJobById(id);

        if (!job) {
            // Insert toastify. Job not found
            return;
        }

        const savedJob = await saveJob(job);

        // Insert toastify. saveJob
        console.log("Log from Joblist: ", savedJob.status, savedJob.message)
    }

    const jobs = isLoading
                 ? <ClipLoader cssOverride={override} color={"goldenrod"} size={60}/>
                 :  jobList.length >= 1
                 ?  jobList.map(job => {
                        return <li className={styles.li} key={job.id}><Job jobData={job}/><button onClick={() => addFavourite(job.id)}>Add favourite</button></li>
                    })
                 : <p className={styles.emptyText}>No jobs to display</p> 

    return <ul className={styles.joblist} style={darkTheme ? {backgroundColor: "darkgreen"} : {}}>{jobs}</ul>;
}
