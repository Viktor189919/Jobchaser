import { Jobdata } from "@/types/jobTypes";
import { FormType } from "@/lib/FormSchema";

// These functions communicate directly with the server API routes

async function signup(userInfo : FormType) {

    const { email, password } = userInfo;

    try {

        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const data = await res.json();
        
        // Object including status code from server response
        const resData = {status: res.status, ...data};

        return resData;

    } catch (error) {
        console.error(`Error: ${error}`);
        return {status: 500, message: "Server error"};
    }
}

async function signin(userInfo : FormType) {
    
    const { email, password } = userInfo;

    try {
        
        const res = await fetch("/api/auth/signin", {
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

        const data = await res.json();

        const resData = {status: res.status, ...data};

        return resData;
    
    } catch (error) {
        console.error(`Error: ${error}`);
        return {status: 500, message: "Server error"};
    }
}

async function signout() {

    try {

        const res = await fetch("/api/auth/signout", {
            method: "POST",
            credentials: "include",
        })

        const data = await res.json();

        const resData = {status: res.status, ...data};

        return resData;

    } catch (error) {
        console.error("Error: ", error);
        return {status: 500, message: "Server error"};
    }
}

async function saveJob(job : Jobdata) {

    try {

        const res = await fetch("/api/jobs/", {
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

        const data = await res.json()
        const resData = {status: res.status, ...data}

        return resData;

    } catch (error) {
        console.error("Error from utils/api saveJob(): ", error);
        return {status: 500, message: "Internal server error"}
    }
}

async function getJobs() {
    
    try {

        const res = await fetch("/api/jobs", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        const data = await res.json();

        const resData = {status: res.status, data: [...data]};

        return resData;
        
    } catch (error) {
        console.error("Error from utils/api getJobs(): ", error);
        return {status: 500, message: "Internal server error"}
    }
}

async function removeUserJob(id : string) {

    try {
        
        const res = await fetch("/api/jobs", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
            })
        })

        const data = await res.json();
        const resData = {status: res.status, ...data};

        return resData;

    } catch (error) {
        console.error("Error from RemoveUserJob: ", error);
        return {status: 500, message: "Internal server error"}
    }
}

export { signup, signin, signout, saveJob, getJobs, removeUserJob };