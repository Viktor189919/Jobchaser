"use client"

import { useContext } from "react"
import styles from "@/components/Footer/Footer.module.css"
import { ThemeContext } from "@/context/ThemeContext"

export default function Footer() {

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemeContext does not have a valid value")
    }

    const { darkTheme } = themeContext;

    return (
        <footer>
            <h3 className={styles.footer} style={darkTheme ? {backgroundColor: "black"} : {}}>Created by Viktor</h3>
        </footer>
    )
}