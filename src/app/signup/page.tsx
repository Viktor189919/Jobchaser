"use client"

import { useRouter } from "next/navigation";
import { useCallback } from "react"
import { ToastContainer, toast } from "react-toastify";
import { SignUpForm } from "@/components/Forms"
import { signup } from "@/utils/api" 
import { SuccessResponse, ErrorResponse } from "@/types/apiTypes";
import styles from "@/styles/SignupPage.module.css"

export default function SignUpPage() {

    const router = useRouter();

    const handleSuccess = useCallback((result : SuccessResponse) => {
        toast(result.message)
        setTimeout(() => {
            router.push("/signin")
        }, 2000)
    }, [router])
    
    const handleError = useCallback((result : ErrorResponse | string) => {
        
        if (typeof result === "string") {
            toast(result)
            return;
        } 

        result = result as ErrorResponse

        toast(result.error)
    }, [])

    return (
        <>
            <h2 className={styles.h2}>Enter your information to sign up</h2>
            <SignUpForm authenticateUser={signup} onSuccess={handleSuccess} onError={handleError}/>
            <ToastContainer position="top-center" autoClose={2000} theme="dark" />
        </>
    )
}