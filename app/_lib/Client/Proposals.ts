'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProposals(
  reqbody: {
    page: number;
    size: number;
    status?: string[];
    search?: string;
    jobId?: string;
  },
  token: string | undefined
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  console.log(reqbody);
  const res = await fetch(`${BASE_URL}/api/my-proposals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
    next: { tags: ['proposals'] },
  });
  console.log(res.ok);
  if (res.status === 403 || res.status === 401) return { error: 'Forbidden' };
  if (res.status === 400) {
    const error = await res.json();
    return { error: error.message };
  }
  if (!res.ok) return { error: 'Error fetching proposals' };

  const data = await res.json();
  return data;
}

export async function getProposalsDetails(
  proposalId: string,
  token: string | undefined
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }

  const res = await fetch(`${BASE_URL}/api/proposals/${proposalId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ['proposal'] },
  });

  if (res.status === 403 || res.status === 401) return { error: 'Forbidden' };
  if (res.status === 400) {
    const error = await res.json();
    return { error: error.message };
  }
  if (!res.ok) return { error: 'Error fetching proposals' };

  const data = await res.json();
  console.log(data);
  return data;
}

export async function getProposalMilestones(
  proposalId: string,
  page: number,
  size: number,
  token: string | undefined
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  console.log(proposalId, page, size, token);
  const res = await fetch(
    `${BASE_URL}/api/proposals/${proposalId}/milestones?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['proposalMilestones'] },
    }
  );

  if (res.status === 403 || res.status === 401) return { error: 'Forbidden' };
  if (res.status === 400) {
    const error = await res.json();
    return { error: error.message };
  }
  if (!res.ok) return { error: 'Error fetching proposals' };

  const data = await res.json();
  console.log(data);
  return data;
}
