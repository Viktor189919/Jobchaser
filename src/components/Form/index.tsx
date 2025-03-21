"use client"

import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormProps, FormInputs } from "@/types/formTypes";
import styles from "@/components/Form/Form.module.css";

export default function Form({ isSignup, authUser } : FormProps) {

    const { register, handleSubmit, formState: {errors}} = useForm<FormInputs>();
    const router = useRouter();
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        const result = await authUser(data)

        if (!result) {
            // Insert toastify, unexpected error
            return
        }

        if (isSignup) {

            if (result.status !== 201) {
                // Insert toastify
                console.log("Not 201: ", result?.message)
            
            } else {

                console.log("Signup success", result.message)
                setTimeout(() => {
                    router.push("/signin")
                }, 2000)
                return;
            }
        } else {

            if (result.status !== 200) {
                // Insert toastify, result.message
                return;

            } else {
                console.log(result.message)
                // Insert toastify, result.message;
                setTimeout(() => {
                    router.push("/")
                }, 2000)
                return;
            }
        }
    }

    return ( 
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
    )
}   