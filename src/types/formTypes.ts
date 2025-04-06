import { ApiResponse } from "./apiTypes";
// import { UnexpectedError } from "./apiTypes";

export type FormProps = {
    isSignup : boolean;
    authenticateUser : (userInfo : FormInputs) => Promise<ApiResponse | void | undefined>;
}

export type FormInputs = {
    email : string;
    password : string;
    error: {
        message: string;
    }
}


