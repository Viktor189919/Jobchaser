"use client"

import React, { useContext, CSSProperties } from "react"
import ClipLoader from "react-spinners/ClipLoader";
import { JoblistProps } from "@/types/jobTypes";
import Job from "@/components/Job";
import { JoblistContext } from "@/context/JoblistContext";
import { ThemeContext } from "@/context/ThemeContext";
import styles from "@/components/Joblist/Joblist.module.css" 

const override: CSSProperties = {
    alignSelf: "center",
}

export default function Joblist({jobList, modifyFunc, isFavourites, isLoading} : JoblistProps) {

    const themeContext = useContext(ThemeContext);
    const joblistContext = useContext(JoblistContext);

    if (!themeContext) {
        throw new Error("ThemeContext does not have a valid value");
    }

    if (!joblistContext) {
        throw new Error("JoblistContext does not have a valid value");
    }

    const { darkTheme } = themeContext;

    const jobs = isLoading
                 ? <ClipLoader cssOverride={override} color={"goldenrod"} size={60}/>
                 :  jobList.length >= 1
                        ?  jobList.map(job => {
                                const type = isFavourites
                                                    ? <li className={styles.li} key={job.id}><Job jobData={job}/><button onClick={(e) => modifyFunc(job.id, e)}>Remove</button></li>
                                                    : <li className={styles.li} key={job.id}><Job jobData={job}/><button onClick={(e) => modifyFunc(job.id, e)}>Add favourite</button></li>
                                                    return type
                                                })
                        : <p className={styles.emptyText}>No jobs to display</p> 

    return <ul className={styles.joblist} style={darkTheme ? {backgroundColor: "darkgreen"} : {}}>{jobs}</ul>;

}
