"use client"

import { useContext } from "react";
import styles from "@/styles/HomePage.module.css";
import { AuthContext } from "@/context/AuthorizedContext";

export default function HomePage() {

    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("Authcontext does not have a valid value")
    }

    const { isAuthorized } = authContext;


    return (
        <>        
            <h2 className={styles.h2}>Welcome to jobChaser</h2>
            {isAuthorized ? <p className={styles.p}>Click the jobs category to start searching for jobs!</p> : <p className={styles.p}>Sign in to start searching for jobs!</p>}
        </>
    )
};
