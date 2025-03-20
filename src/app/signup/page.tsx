"use client"

import Form from "@/components/Form"
import { signup } from "@/utils/api" 
import styles from "@/styles/SignupPage.module.css"

export default function SignUpPage() {

    return (
        <>
            <h2 className={styles.h2}>Enter your information to sign up</h2>
            <Form isSignup={true} authUser={signup} />
        </>
    )
}