export interface ProposalDTO {
  date: string;
  jobTitle: string;
  proposalId: string;
  jobId: string;
  status: 'PENDING' | 'DECLINED' | 'HIRED' | 'ACCEPTED';
  contractId?: string;
}

export interface ProposalsPageDTO {
  content: ProposalDTO[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
