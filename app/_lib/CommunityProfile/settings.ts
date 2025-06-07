'use server';

import { invariant } from '@/app/_helpers/invariant';
import {
  CommunityRolesResponse,
  UpdatePositionRequest,
} from '@/app/_types/CommunitySettings';
import { revalidateTag } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCommunityRolesAndPositions(
  communityId: string,
  token: string | undefined
): Promise<CommunityRolesResponse> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/roles-and-positions`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Add cache tag here
      next: { tags: [`community-${communityId}-settings`] },
    }
  );

  if (res.status === 401) throw new Error('Unauthorized');
  if (res.status === 403 || res.status === 401) throw new Error('Forbidden');
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) throw new Error('Something went wrong');

  return res.json();
}

export async function updateCommunityPositions(
  communityId: string,
  positions: UpdatePositionRequest[],
  token: string | undefined
): Promise<{ message: string }> {
  invariant(!token, 'Unauthorized user');

  const totalPercent = positions.reduce(
    (sum, pos) => sum + pos.financialPercent,
    0
  );
  if (Math.abs(totalPercent - 100) > 0.01) {
    throw new Error('Total financial percentage must equal 100%');
  }

  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/update-positions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(positions),
    }
  );

  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (res.status === 401) throw new Error('Unauthorized');
  if (res.status === 403 || res.status === 401) throw new Error('Forbidden');
  if (res.status === 404) throw new Error('Community not found');
  if (!res.ok) throw new Error('Something went wrong');

  revalidateTag(`community-${communityId}-settings`);
  return res.json();
}
