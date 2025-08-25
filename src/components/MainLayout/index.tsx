"use client"

import React, { useContext } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeContext } from "@/context/ThemeContext";
import styles from "@/components/MainLayout/MainLayout.module.css";

export default function MainLayout({ children }: {children: React.ReactNode}) {

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Themecontext does not have a valid value")
    }

    const { darkTheme } = themeContext;

    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@100..900&display=swap" rel="stylesheet" />
            </head>
            <body>

                <div id="root" style={darkTheme ? {backgroundColor: "black", color: "white"} : {backgroundColor: "rgb(210, 210, 210)", color: "black"}}>
                    <Header />
                        <main className={styles.main}>
                            {children}
                        </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
};