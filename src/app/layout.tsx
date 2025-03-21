"use client"

import MainLayout from "@/components/MainLayout";
import ThemeProvider from "@/context/ThemeContext";
import AuthProvider from "@/context/AuthorizedContext";
import "@/styles/globals.css";

export default function RootLayout({children} : {children : React.ReactNode}) {
    return (
        <ThemeProvider>
        <AuthProvider>
            <MainLayout>{children}</MainLayout>
        </AuthProvider>
        </ThemeProvider>
    )
}
