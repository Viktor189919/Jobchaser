"use client"

import { useUserStore } from "@/store/signedin";
import styles from "@/styles/HomePage.module.css";

export default function HomePage() {

    const authorized = useUserStore((state) => state.authorized);

    return (
        <>        
            <h2 className={styles.h2}>Welcome to jobChaser</h2>
            { authorized 
                ? <p className={styles.p}>You are signed in! Go to jobspage to start searching for jobs</p> 
                : <p className={styles.p}>Sign in to start searching for jobs!</p>
            }
        </>
    )
};
