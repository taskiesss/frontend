export interface JobDetailsResponse {
  projectTitle: string;
  postedAt: string; // ISO date-time string
  projectDescription: string;
  projectLength:
    | "_less_than_1_month"
    | "_1_to_3_months"
    | "_3_to_6_months"
    | "_more_than_6_months";
  experienceLevel: "entry_level" | "intermediate" | "expert";
  expectedPricePerHour: string;
  skills: string[];
  client: {
    completedJobs: number;
    totalSpent: string;
    rate: number;
  };
}
