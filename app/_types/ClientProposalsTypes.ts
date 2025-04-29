export interface Proposal {
  proposalId: string;
  freelancerName: string;
  freelancerId: string;
  profilePicture: string;
  jobName: string;
  jobId: string;
  community: boolean;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'HIRED';
  contractId?: string; // Optional, only for accepted proposals
}

export interface ProposalsListProps {
  content: Proposal[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ProposalDetails {
  proposalId: string;
  jobName: string;
  freelancerName: string;
  freelancerId: string;
  profilePicture: string;
  isCommunity: boolean;
  coverLetter: string;
  pricePerHour: number;
  paymentMethod: 'PerMilestones' | 'PerProject';
  attachment: string;
  date: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'HIRED';
}
