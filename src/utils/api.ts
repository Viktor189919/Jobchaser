import { FormInputs } from "@/types/formTypes";

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

        if (!response.ok) {
            throw new Error("Error signing up");
        }

        const data = await response.json();
        console.log(data.JWT)

    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

async function signin(userInfo : FormInputs) {
    
    const { email, password } = userInfo;

    try {
        
        const response = await fetch("https://localhost:3001/users/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })

        if (!response.ok) {
            throw new Error("Error signing in")
        }

        const data = response.json();
        console.log(data)
    
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

export { signup, signin };