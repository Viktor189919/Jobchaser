import { createContext, useState } from "react";
import { FormInputs } from "@/types/formTypes";
import { signin } from "@/utils/api"
import { ApiResponse } from "@/types/apiTypes"


type AuthContextType = {
    isAuthorized : boolean;
    login : (userInfo : FormInputs) => Promise<ApiResponse | undefined>;
    logout : () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({children} : {children : React.ReactNode}) {
    
    const [ isAuthorized, setIsAuthorized ] = useState(false);

    async function login(userInfo : FormInputs) {

        // Call api function
        const result = await signin(userInfo);

        // Returns nothing if no result. Is handled in form component
        if (!result) {
            console.error("Unexpected error");
            return;
        }
        
        // Check if no token is returned
        if (!result.JWT) {
            console.error(result.message)
            return result;
        }

        localStorage.setItem("jobchaserToken", result.JWT)
        setIsAuthorized(prevState => !prevState);
        return result; 
    }

    async function logout() {

        localStorage.removeItem("jobchaserToken")
        setIsAuthorized(false);

    }

    return (
        <AuthContext.Provider value={{isAuthorized, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export { AuthContext };