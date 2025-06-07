'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { invariant } from '@/app/_helpers/invariant';
import { revalidatePath } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCommunityProfile(
  communityId: string,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/communities/${communityId}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 403 || res.status === 401) throw new Error('Forbidden');
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) throw new Error('Something went wrong');

  return res.json();
}

export async function getCommunityWorkDone(
  id: string,
  page: number,
  size: number,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');
  const res = await fetch(
    `${BASE_URL}/communities/${id}/workdone?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 403 || res.status === 401) throw new Error('Forbidden');
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) throw new Error('Something went wrong');

  return res.json();
}

export async function updateCommunityProfilePicture(
  id: string,
  formData: FormData,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/communities/${id}/profile-picture`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (res.status === 403 || res.status === 401) throw new Error('Forbidden');
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) throw new Error('Something went wrong');

  revalidatePath(`/communities/${id}`);
  return true;
}

export async function updateCommunityCoverPicture(
  id: string,
  formData: FormData,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/communities/${id}/cover-picture`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (res.status === 403 || res.status === 401) throw new Error('Forbidden');
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) throw new Error('Something went wrong');

  revalidatePath(`/communities/${id}`);
  return true;
}

export async function updateCommunitySkills(
  id: string,
  skills: string[],
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/communities/${id}/skills`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ skills }),
  });

  if (res.status === 403 || res.status === 401) throw new Error('Forbidden');
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) throw new Error('Something went wrong');

  revalidatePath(`/communities/${id}`);
  return true;
}

export async function updateCommunityDescription(
  id: string,
  description: string,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/communities/${id}/description`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description }),
  });

  if (res.status === 403 || res.status === 401) throw new Error('Forbidden');
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) throw new Error('Something went wrong');

  revalidatePath(`/communities/${id}`);
  return true;
}

export async function updateCommunityHeaderSection(
  id: string,
  request: {
    firstName: string;
    jobTitle: string;
    avgHoursPerWeek: number;
    pricePerHour: number;
  },
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/communities/${id}/header-section`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (res.status === 403 || res.status === 401) throw new Error('Forbidden');
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) throw new Error('Something went wrong');

  revalidatePath(`/communities/${id}`);
  return true;
}
