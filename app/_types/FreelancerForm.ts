export interface FreelancerFormPayload {
  firstName: string;
  lastName: string;
  professionalTitle: string;
  skills: string[];
  hourlyRate: number;
  professionalSummary?: string;
  education?: Education[];
  languages?: string[];
  hoursPerWeek?: number;
}

export interface Education {
  degree: string;
  institution: string;
  graduationYear: number;
}
