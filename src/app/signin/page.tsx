"use client"

import { useContext } from "react";
import Form from "@/components/Form";
import styles from "@/styles/SignupPage.module.css";
import { AuthContext } from "@/context/AuthorizedContext";

function SignInPage() {

    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value")
    }

    const { login } = authContext;

    return (
        <>
            <h2 className={styles.h2}>Enter your information to sign in</h2>
            <Form isSignup={false} authUser={login}></Form>
        </>
    )
}

export default SignInPage;