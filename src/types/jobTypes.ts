export type JoblistProps = {
  jobList: Jobdata[]; 
  isLoading : boolean;
}

export type JobProps = {
  jobData: Jobdata;
}

export type Jobdata = {
  id: number;
  employer: {
    name: string;
    url: string;
  }
  logo_url: string;
  headline: string;
}

export type JobsArray = {
  hits: Jobdata[];
}
 