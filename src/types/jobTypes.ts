export type JoblistProps = {
    jobList : Jobdata[]; 
    modifyFunc : (id : string, e : React.MouseEvent) => void; 
    isFavourites : boolean;
    isLoading : boolean;
}

export type JobProps = {
    jobData: Jobdata;
}

export type Jobdata = {
    id: string;
    companyName: string;
    companyURL?: string | null;
    logo_url?: string;
    jobHeadline: string;
}

export type JobsArray = {
    hits: Jobdata[];
}

export type UserJob = {
    id: string;
    user_id: string;
    job_id: string;
    Job: Jobdata;
}
 