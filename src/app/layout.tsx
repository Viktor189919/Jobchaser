"use client"

import MainLayout from "@/components/MainLayout";
import ThemeProvider from "@/context/ThemeContext";
import JoblistProvider from "@/context/JoblistContext"
import "@/styles/globals.css";

export default function RootLayout({children} : {children : React.ReactNode}) {
    return (
        <ThemeProvider>
        <JoblistProvider>
            <MainLayout>{children}</MainLayout>
        </JoblistProvider>
        </ThemeProvider>
    )
}
