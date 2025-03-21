import { ApiResponse } from "./apiTypes";

export type FormProps = {
    isSignup : boolean;
    authUser : (userInfo : FormInputs) => Promise<ApiResponse | void | undefined>;
}

export type FormInputs = {
    email : string;
    password : string;
    error: {
        message: string;
    }
}


