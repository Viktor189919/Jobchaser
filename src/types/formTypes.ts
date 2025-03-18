export type FormProps = {
    authUser : (userInfo : FormInputs) => void;
}

export type FormInputs = {
    email : string;
    password : string;
    error: {
        message: string;
    }
}


