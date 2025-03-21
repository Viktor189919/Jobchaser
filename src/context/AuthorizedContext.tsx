import { createContext, useState } from "react";
import { FormInputs } from "@/types/formTypes";
import { signin } from "@/utils/api"
import { ApiResponse } from "@/types/apiTypes"
import { set } from "react-hook-form";

type AuthContextType = {
    isAuthorized : boolean;
    login : (userInfo : FormInputs) => Promise<ApiResponse | void>;
    logout : () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({children} : {children : React.ReactNode}) {
    
    const [ isAuthorized, setIsAuthorized ] = useState(false);

    async function login(userInfo : FormInputs) {

        try {

            const user = await signin(userInfo);

            if (!user) {
                console.error("Auth - No response from server");
                return;
            }

            if (!user.JWT) {
                console.error(user)
                // Insert react toast-maker with user.message
                return;
            }

            localStorage.setItem("jobchaserToken", user.JWT)
            setIsAuthorized(prevState => !prevState);
            return user; 

        } catch (error) {
            console.error("Error: ", error)
        }
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