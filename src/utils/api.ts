import { FormInputs } from "@/types/formTypes";
import { ApiResponse } from "@/types/apiTypes";

async function signup(userInfo : FormInputs) {

    const { email, password } = userInfo;

    try {

        const response = await fetch("http://localhost:3001/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })

        const data = await response.json();

        if (!response.ok) {
            console.log(data.message)
            return data.message;
        }

        return data;

    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

async function signin(userInfo : FormInputs) : Promise<ApiResponse | undefined> {
    
    const { email, password } = userInfo;

    try {
        
        const response = await fetch("http://localhost:3001/users/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })

        if (!response) {
            console.error("Signin - No response from server")
            return
        }

        const data = await response.json()

        if (!response.ok) {
            return data.message;
        }

        if (!data.JWT) {
            return data.message;
        }

        return data;
    
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

export { signup, signin };