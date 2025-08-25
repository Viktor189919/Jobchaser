import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormType, FormSchema } from "@/app/lib/FormSchema";
import { SuccessResponse, ErrorResponse } from "@/types/apiTypes";
import { FormProps } from "@/types/formTypes";
import styles from "@/components/Forms/Form.module.css";

export default function SignUpForm({ authenticateUser, onSuccess, onError } : FormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        mode: "onSubmit",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FormType> = async (data) => {

        if (!data) {
            onError?.("Please enter email and password")  
            return;
        }

        let authenticateResult = await authenticateUser(data);

        if (!authenticateResult) {
            onError?.("Unexpected error")
            return;
        }
        
        if (authenticateResult.status !== 201 && authenticateResult.status !== 200) {
            authenticateResult = authenticateResult as ErrorResponse
            onError?.(authenticateResult.error)
        }

        authenticateResult = authenticateResult as SuccessResponse

        onSuccess?.(authenticateResult);
    }
        
    return ( 
        <>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles.fieldset}>
                <label htmlFor="emailInput">Email</label>
                <input className={styles.input} 
                    id="emailInput"
                    {...register("email")} />
                {errors.email && <p className={styles.fieldErrorMsg}>{errors.email.message}</p>}
            </fieldset>

            <fieldset className={styles.fieldset}>
                <label htmlFor="passwordInput">Password</label>
                <input className={styles.input} 
                    type="password"
                    id="passwordInput" 
                    {...register("password")}/>
                {errors.password && <p className={styles.fieldErrorMsg}>{errors.password.message}</p>}
            </fieldset>
            <input className={styles.submitInput} type="submit" />
        </form>
        </>
    )
}