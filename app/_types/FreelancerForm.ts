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

// Response type for a successful submission (HTTP 201)
export interface FreelancerFormSuccessResponse {
  message: boolean;
}

// Response type for error responses (HTTP 401, 403, 500, etc.)
export interface FreelancerFormErrorResponse {
  error: {
    type: string;
    message: string;
  };
}
export interface Education {
  degree: string;
  institution: string;
  graduationYear: number;
}
