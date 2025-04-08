"use client"

import React, { useContext } from "react";
import Image from "next/image"
import { JobProps } from "@/types/jobTypes"
import { ThemeContext } from "@/context/ThemeContext";
import styles from "@/components/Job/Job.module.css"

export default function Job({jobData} : JobProps) {

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Themecontext does not have a valid value")
    }

    const { darkTheme } = themeContext;

    const { companyName, companyURL, logo_url, jobHeadline } = jobData;
    let companyLogo;

    const employerWebpage = !companyURL
                            ? "" 
                            : companyURL.startsWith("http") 
                            ? companyURL 
                            : `https://${companyURL}`

    if (!logo_url || logo_url === "") {
        companyLogo = "images/default-company-logo.svg"
    } else {
        companyLogo = logo_url
    }
                     

    return  <article className={styles.job} style={darkTheme ? {border: "solid 2px yellow"} : {}}>
                <Image className={styles.img} src={companyLogo} width={300} height={300} alt={`${companyName ? companyName : "Company"} logo`} />
                <h2 className={styles.h2}>{companyName ? companyName : "Company name unavailable"}</h2>
                <p className={styles.p}>{jobHeadline ? jobHeadline : "Jobdescription unavailable"}</p>
                <a className={styles.a} href={employerWebpage} target="_blank">Visit homepage</a>
            </article>

}
