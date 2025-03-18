"use client"

import { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"
import styles from "@/components/ThemeSwitch/ThemeSwitch.module.css"

export default function ThemeSwitch() {

    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("ThemeContext does not have a valid state")
    }

    const { setDarkTheme } = context

    return (
        <div className={styles.switchContainer}>
            <p className={styles.switchLight} onClick={() => setDarkTheme(false)}>Light</p>
            <p>/</p>
            <p className={styles.switchDark} onClick={() => setDarkTheme(true)}>Dark</p>
        </div>
    )
}