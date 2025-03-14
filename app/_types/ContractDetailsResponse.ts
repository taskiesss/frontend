export interface contractDetailsResponse {
  contractStatus: 'active' | 'ended';
  jobTitle: string;
  totalCurrentEarnings: number;
  jobId: string;
  hoursWorked: number;
  clientId: string;
  clientName: string;
  clientProfilePic: string;
  freelancerId: string;
  freelancerName: string;
  freelancerProfilePic: string;
  projectType: 'PerMilestones' | 'PerProject';
  pricePerHour: number;
  startDate: string;
  endDate: string;
  isCommunity: boolean;
}

export interface ContractMilestones {
  content: {
    title: string;
    description: string;
    expectedHours: number;
    dueDate: string;
    status: 'not_started' | 'pending_review' | 'in_progress' | 'approved';
    milestoneId: string;
  }[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
