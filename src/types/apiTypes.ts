export type SuccessResponse = {
    status : number;
    message : string;
    data? : {
        id : string;
        email : string;
    };
}

export type ErrorResponse = {
    status : number;
    error : string;
}
