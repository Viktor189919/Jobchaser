"use client";

import { useState, useEffect, useContext, useCallback } from "react";
import Link from "next/link";
import { signout } from "@/utils/api"
import ThemeSwitch from "@/components/ThemeSwitch";
import { ThemeContext } from "@/context/ThemeContext";
import styles from "@/components/Header/Header.module.css";
import { useUserStore } from "@/store/signedin";

export default function Header() {

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true); // mark that client store is hydrated
    }, []);

    const handleSignOut = useCallback( async () => {
        await signout();
        useUserStore.getState().setAuthorized(false);
    }, [])

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Themecontext does not have a valid value")
    }

    const { darkTheme } = themeContext;

    const authorized = useUserStore((state) => state.authorized);

    if (!hydrated) return null;

    return (
        <> 
            <header className={styles.header} style={darkTheme ? {border: "2px solid goldenrod"} : {border: "2px solid black"}}>
                <nav className={styles.nav}>
                    <h1 className={styles.h1}>JobChaser</h1>
                    <ul className={styles.linkContainer}>
                        <li className={styles.liElement} key="1"><Link className={styles.pageLink} href="/">Home</Link></li>
                        { 
                            authorized 
                                ?   <>
                                        <li className={styles.liElement} key="2"><Link className={styles.pageLink} href="/jobs">Jobs</Link></li>
                                        <li className={styles.liElement} key="4"><Link className={styles.pageLink} href="/favourites">Favourites</Link></li>  
                                        <li className={styles.liElement} key="5"><Link className={styles.pageLink} onClick={handleSignOut} href="/">Sign out</Link></li>
                                    </>
                                :   <li className={styles.liElement} key="3"><Link className={styles.pageLink} href="/signin">Sign in</Link></li>
                                
                        }
                        <li className={styles.liElement} key="6"><Link className={styles.pageLink} href="/signup">Sign up</Link></li>
                    </ul>
                    <ThemeSwitch />
                </nav>
            </header>
        </>
    );
};