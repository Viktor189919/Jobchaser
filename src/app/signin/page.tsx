"use client"

import Form from "@/components/Form";
import styles from "@/styles/SignupPage.module.css";
import { signin } from "@/utils/api";

function SignInPage() {

    return (
        <>
            <h2 className={styles.h2}>Enter your information to sign in</h2>
            <Form isSignup={false} authenticateUser={signin}></Form>
        </>
    )
}

export default SignInPage;