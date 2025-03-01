export interface contractDetailsResponse {
  contractStatus: 'active' | 'ended';
  jobTitle: string;
  totalCurrentEarnings: number;
  jobId: string;
  hoursWorked: number;
  clientName: string;
  clientProfilePic: string;
  freelancerName: string;
  freelancerProfilePic: string;
  projectType: 'PerMilestones' | 'PerProject';
  pricePerHour: number;
  startDate: string;
  endDate: string;
  isCommunity: boolean;
  milestones: ContractMilestones;
}

export interface ContractMilestones {
  content: {
    title: string;
    description: string;
    expectedHours: number;
    dueDate: string;
    status: 'not_started' | 'in_review' | 'in_progress' | 'approved';
    milestoneId: string;
  }[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
