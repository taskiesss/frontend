export interface milestone {
  milestoneNumber: number;
  title: string;
  description: string;
  dueDate: string;
  expectedHours: number;
}

export interface JobApplicationRequest {
  jobId: string;
  candidateId: string;
  pricePerHour: number;
  freelancerPayment: string;
  milestones: milestone[];
  coverLetter: string;
  attachment: string | undefined;
}
