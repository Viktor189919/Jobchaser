import { createContext, useState } from "react";
import { FormInputs } from "@/types/formTypes";
import { checkAuth } from "@/utils/api"
import { ApiResponse } from "@/types/apiTypes"


type AuthContextType = {
    isAuthorized : boolean;
    authorizeUser : () => Promise<ApiResponse | undefined>;
    logout : () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({children} : {children : React.ReactNode}) {
    
    const [ isAuthorized, setIsAuthorized ] = useState(false);

    async function authorizeUser() {

        // Call api function
        const result = await checkAuth();

        // Returns nothing if no result. Is handled in form component
        if (!result) {
            console.error("Unexpected error");
            return;
        }
        
        // Change authorization only if successful response
        if (result.status === 200) {
            setIsAuthorized(true);
        }
        
        // Return response wheter successful or not
        return result; 
    }

    async function logout() {

        localStorage.removeItem("jobchaserToken")
        setIsAuthorized(false);

    }

    return (
        <AuthContext.Provider value={{isAuthorized, authorizeUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export { AuthContext };