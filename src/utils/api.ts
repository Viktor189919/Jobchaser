import { FormInputs } from "@/types/formTypes";
import { Jobdata } from "@/types/jobTypes";
import { ApiResponse } from "@/types/apiTypes";

// Communicates with server directly
async function signup(userInfo : FormInputs) {

    const { email, password } = userInfo;

    // Using try/catch in case the server is not responding
    try {

        const response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const data = await response.json();
        
        // Object including status code from server response
        const responseData = {status: response.status, ...data};

        return responseData;

    } catch (error) {
        console.error(`Error: ${error}`);
        return {status: 500, message: "Server error"};
    }
}

// Communicates with server directly
async function signin(userInfo : FormInputs) : Promise<ApiResponse | undefined> {
    
    const { email, password } = userInfo;

    // Using try/catch in case the server is not responding
    try {
        
        const response = await fetch("http://localhost:3000/api/auth/signin", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const data = await response.json();

        // Object including status code from server response
        const responseData = {status: response.status, ...data};

        return responseData;
    
    } catch (error) {
        console.error(`Error: ${error}`);
        return {status: 500, message: "Server error"};
    }
}

async function checkAuth() {

    try {

        const response = await fetch("http://localhost:3000/api/user/check", {
            method: "POST",
            credentials: "include",
        })

        const data = await response.json();

        const responseData = {status: response.status, ...data};

        return responseData;

    } catch (error) {
        console.error("Error: ", error);
        return {status: 500, message: "Server error"};
    }
}


async function saveJob(job : Jobdata) {

    try {

        const response = await fetch("http://localhost:3000/jobs/favourites", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jobtechId: job.id.toString(),
                companyName: job.companyName,
                jobHeadline: job.jobHeadline,
                companyURL: job.companyURL
            })
        })

        const data = await response.json()
        const responseData = {status: response.status, ...data}

        return responseData;

    } catch (error) {
        console.error("Error from saveJob function: ", error);
    }
}

async function getJobs() {
    
    try {

        const response = await fetch("http://localhost:3000/jobs/favourites", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        const data = await response.json();
        const responseData = {status: response.status, ...data};
        console.log(responseData)
        return responseData;
        
    } catch (error) {
        console.error("Error: ", error);
        return {status: 500, message: "Server error"}
    }
}

async function removeUserJob(id : number) {

    try {
        
        const response = await fetch("http://localhost:3000/jobs/favourites", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
            })
        })

        const data = await response.json();
        const responseData = {status: response.status, ...data};

        return responseData;

    } catch (error) {
        console.error("Error from RemoveUserJob: ", error);
        return {status: 500, message: "Server error"}
    }
}

export { signup, signin, checkAuth, saveJob, getJobs, removeUserJob };