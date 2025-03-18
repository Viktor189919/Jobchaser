"use client"

import MainLayout from "@/components/MainLayout";
import ThemeProvider from "@/context/ThemeContext";
import "@/styles/globals.css";

export default function RootLayout({children} : {children : React.ReactNode}) {
    return (
        <ThemeProvider>
            <MainLayout>{children}</MainLayout>
        </ThemeProvider>
    )
}
