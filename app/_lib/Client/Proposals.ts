'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProposals(
  reqbody: {
    page: number;
    size: number;
    status: string[];
    search: string;
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
  if (res.status === 403) return { error: 'Forbidden' };
  if (!res.ok) return { error: 'Error fetching proposals' };

  const data = await res.json();
  return data;
}
