export type JoblistProps = {
    jobList : Jobdata[]; 
    modifyFunc : (id : number, e : React.MouseEvent) => void; 
    isFavourites : boolean;
    isLoading : boolean;
}

export type JobProps = {
    jobData: Jobdata;
}

export type Jobdata = {
    id: number;
    companyName: string;
    companyURL: string;
    logo_url?: string;
    jobHeadline: string;
}

export type JobsArray = {
    hits: Jobdata[];
}
 