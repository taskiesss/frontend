'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { invariant } from '@/app/_helpers/invariant';

const BASE_URL = 'http://localhost:8080';
export async function getAvailablePositions(
  communityId: string,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/available-positions?page=${1}&size=${15}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 403) throw new Error('Forbidden');
  if (!res.ok) throw new Error('Something went wrong');
  const out = await res.json();
  return out;
}
export async function sendJoinRequest(
  communityId: string,
  positionId: string,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/join-request/${positionId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 403) throw new Error('Forbidden');
  if (!res.ok) throw new Error('Something went wrong');

  return true;
}
