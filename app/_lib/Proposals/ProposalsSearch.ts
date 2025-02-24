import { ProposalsPageDTO } from '@/app/_types/Proposals';

// services/proposals.ts
const BASE_URL = 'http://localhost:8080';

export async function getFreelancerProposals(
  token: string | undefined,
  page: number = 1,
  size: number = 10
): Promise<ProposalsPageDTO> {
  if (!token) {
    throw new Error('Unauthorized user');
  }

  const response = await fetch(
    `${BASE_URL}/freelancers/my-proposals?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let errorMessage = 'Proposals not found.';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Fallback in case errorData can't be parsed.
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
