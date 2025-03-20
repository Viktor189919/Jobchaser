export type FormProps = {
    isSignup : boolean;
    authUser : (userInfo : FormInputs) => Promise<ApiResponse | undefined>;
}

export type FormInputs = {
    email : string;
    password : string;
    error: {
        message: string;
    }
}

export type ApiResponse = {
    status : number;
    message : string;
    access_token? : string;
}


