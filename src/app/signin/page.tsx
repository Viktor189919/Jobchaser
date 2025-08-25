"use client"

import { SignInForm } from "@/components/Forms";
import styles from "@/styles/SignupPage.module.css";
import { signin } from "@/utils/api";
import { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SuccessResponse, ErrorResponse } from "@/types/apiTypes";
import { useUserStore } from "@/store/signedin";

export default function SignInPage() {
    
    // const notify = (msg : string) => toast(msg);

    const router = useRouter();

    if (useUserStore.getState().authorized) {
        router.push("/jobs")
    }

    const handleSuccess = useCallback((result : SuccessResponse) => {
        useUserStore.getState().setAuthorized(true);
        toast(result.message)
        setTimeout(() => {
            router.push("/")
        }, 2000)
    }, [])

    const handleError = useCallback((result : ErrorResponse | String) => {

        if (typeof result === "string") {
            toast(result)
            return;
        } 
        
        result = result as ErrorResponse

        toast(result.error)

    }, [])

    return (
        <>
            <h2 className={styles.h2}>Enter your information to sign in</h2>
            <SignInForm authenticateUser={signin} onSuccess={handleSuccess} onError={handleError}></SignInForm>
            <ToastContainer position="top-center" autoClose={2000} theme="dark" />
        </>
    )
}