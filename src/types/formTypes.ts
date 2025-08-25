import { FormType } from "@/app/lib/FormSchema";
import { SuccessResponse, ErrorResponse } from "@/types/apiTypes";

export type FormProps = {
    authenticateUser : (userInfo : FormType) => Promise<SuccessResponse | ErrorResponse>;
    onSuccess: (result : SuccessResponse) => void;
    onError: (error : ErrorResponse | String) => void;
}