"use client";

import { useContext } from "react";
import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthorizedContext";
import styles from "@/components/Header/Header.module.css";

export default function Header() {

    const themeContext = useContext(ThemeContext);
    const authContext = useContext(AuthContext)

    if (!themeContext) {
        throw new Error("Themecontext does not have a valid value")
    }

    if (!authContext) {
        throw new Error("Authcontext does not have a valid value")
    }

    const { darkTheme } = themeContext;

    const { isAuthorized, logout } = authContext;

    return (
        <> 
            <header className={styles.header} style={darkTheme ? {border: "2px solid goldenrod"} : {border: "2px solid black"}}>
                <nav className={styles.nav}>
                    <h1 className={styles.h1}>JobChaser</h1>
                    <ul className={styles.linkContainer}>
                        <li className={styles.liElement} key="1"><Link className={styles.pageLink} href="/">Home</Link></li>
                        {isAuthorized 
                                    ? <li className={styles.liElement} key="2"><Link className={styles.pageLink} href="/jobs">Jobs</Link></li>
                                    : <li className={styles.liElement} key="2"><Link className={styles.pageLink} href="/signin">Sign in</Link></li>}
                        {isAuthorized
                                    ? <li className={styles.liElement} key="3"><Link className={styles.pageLink} href="/favourites">Favourites</Link></li>
                                    : null}
                        {isAuthorized  
                                    ? <li className={styles.liElement} key="4"><Link className={styles.pageLink} onClick={logout} href="/">Sign out</Link></li>
                                    : <li className={styles.liElement} key="4"><Link className={styles.pageLink} href="/signup">Sign up</Link></li>}
                    </ul>
                    <ThemeSwitch />
                </nav>
            </header>
        </>
    );
};