import SignInForm from "@/components/Forms/signInForm";

export { SignInForm };

// // "use client"

// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormType, FormSchema } from "@/app/lib/FormSchema";
// import { SuccessResponse, ErrorResponse } from "@/types/apiTypes";
// import styles from "@/components/Form/Form.module.css";

// export type FormProps = {
//     isSignup : boolean;
//     authenticateUser : (userInfo : FormType) => Promise<SuccessResponse | ErrorResponse | void | undefined>;
//     onSuccess?: (result) => void;
// }

// export type FormInputs = {
//     email : string;
//     password : string;
//     error: {
//         message: string;
//     }
// }

// export default function Form({ isSignup, authenticateUser, onSuccess } : FormProps) {

//     const notify = (msg : string) => toast(msg);

//         const { register, handleSubmit, formState: { errors } } = useForm<FormType>({
//         resolver: zodResolver(FormSchema),
//         mode: "onSubmit",
//         defaultValues: {
//             email: "",
//             password: "",
//         },
//     });

//     const router = useRouter();
//     const onSubmit: SubmitHandler<FormType> = async (data) => {

//         if (!data) {
//             notify("Please enter email and password")  
//             return;
//         }

//         let authenticateResult = await authenticateUser(data);

//         if (!authenticateResult) {
//             notify("Unexpected error")
//             return;
//         }
        
//         if (authenticateResult.status !== 201 && authenticateResult.status !== 200) {
//             authenticateResult = authenticateResult as ErrorResponse
//             notify(authenticateResult.error)
//             return;
//         }

//         authenticateResult = authenticateResult as SuccessResponse

//         if (isSignup) {
//             notify(authenticateResult.message)
//             setTimeout(() => {
//                 router.push("/signin")
//             }, 2000)
//             return;
//         } 

//         onSuccess && onSuccess();

//         // notify(authenticateResult.message)
//         // setTimeout(() => {
//         //     router.push("/")
//         // }, 2000)
//         // return;
//     }

//     return ( 

//         <>
//         <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            
//             <fieldset className={styles.fieldset}>
//                 <label htmlFor="emailInput">Email</label>
//                 <input className={styles.input} 
//                     id="emailInput"
//                     {...register("email")} />
//                 {errors.email && <p className={styles.fieldErrorMsg}>{errors.email.message}</p>}
//             </fieldset>

//             <fieldset className={styles.fieldset}>
//                 <label htmlFor="passwordInput">Password</label>
//                 <input className={styles.input} 
//                     type="password"
//                     id="passwordInput" 
//                     {...register("password")}/>
//                 {errors.password && <p className={styles.fieldErrorMsg}>{errors.password.message}</p>}
//             </fieldset>
//             <input className={styles.submitInput} type="submit" />
//         </form>
//         <ToastContainer />
//         </>
//     )
// }   