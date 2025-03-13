export interface Contracts {
  content: {
    contractID: string;
    jobID: string;
    jobTitle: string;
    clientName: string;
    clientID: string;
    contractStatus: "ACTIVE" | "ENDED";
    budget: number;
    activeMilestone: string;
    clientRateForFreelancer?: number;
    startDate: string;
    dueDate?: string;
    endDate?: string;
  }[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
