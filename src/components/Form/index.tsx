"use client"

import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormProps, FormInputs } from "@/types/formTypes";
import styles from "@/components/Form/Form.module.css";
import { AuthContext } from "@/context/AuthorizedContext";

export default function Form({ isSignup, authenticateUser } : FormProps) {

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("Authcontext does not have a valid value");
    }

    const { authorizeUser } = authContext;

    const notify = (msg : string) => toast(msg);

    const { register, handleSubmit, formState: {errors}} = useForm<FormInputs>();
    const router = useRouter();
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        const authenticateResult = await authenticateUser(data);

        if (!authenticateResult) {
            notify("Unexpected error")
            return;
        }
        
        if (authenticateResult.status !== 201 && authenticateResult.status !== 200) {
            notify(authenticateResult.message)
            return;
        }

        if (isSignup) {

            console.log("Signup success", authenticateResult.message)
            notify(authenticateResult.message)
            setTimeout(() => {
                router.push("/signin")
            }, 2000)
            return;
            
            } else {

                const authorizeResult = await authorizeUser();

                if (!authorizeResult) {
                    console.error("Unexpected error")
                    return;
                }

                if (authorizeResult.status !== 200) {
                    console.error(authorizeResult)
                    notify(authorizeResult.message);
                    return;
                }
                
                console.log(authenticateResult.message)
                notify(authenticateResult.message)
                setTimeout(() => {
                    router.push("/")
                }, 2000)
                return;
            }
    }

    return ( 

        <>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            
            <fieldset className={styles.fieldset}>
                <label htmlFor="emailInput">Email</label>
                <input className={styles.input} 
                    id="emailInput"
                    {...register("email", 
                        {required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format",
                }})} />
                {errors.email && <p className={styles.fieldErrorMsg}>{errors.email.message}</p>}
            </fieldset>

            <fieldset className={styles.fieldset}>
                <label htmlFor="passwordInput">Password</label>
                <input className={styles.input} 
                    type="password"
                    id="passwordInput" 
                    {...register("password", 
                        {required: "Password is required", 
                            minLength: {
                                value: 6, 
                                message: "Password must be at least 6 characters"
                }})}/>
                {errors.password && <p className={styles.fieldErrorMsg}>{errors.password.message}</p>}
            </fieldset>
            <input className={styles.submitInput} type="submit" />
        </form>
        <ToastContainer />
        </>
    )
}   