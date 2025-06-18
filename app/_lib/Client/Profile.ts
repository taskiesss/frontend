/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { invariant } from '@/app/_helpers/invariant';
import { revalidatePath } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// types/client-api.ts
export interface ClientProfile {
  uuid: string;
  name: string;
  username: string;
  country: string;
  rate: number;
  skills: string[];
  languages: string[];
  description: string;
  profilePicture: string;
  coverPhoto: string;
  completedJobs: number;
  totalSpent: number;
}

export interface WorkDoneItem {
  jobName: string;
  jobId: string;
  rate: number;
  pricePerHour: number;
  totalHours: number;
}

export interface WorkDoneResponse {
  content: WorkDoneItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export async function getClientById(
  id: string,
  token: string | undefined
): Promise<ClientProfile> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/api/clients/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 403 || res.status === 401) {
    throw new Error('Forbidden');
  }
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  return await res.json();
}

export async function getClientWorkDone(
  id: string,
  page: number = 0,
  size: number = 10,
  token: string | undefined
): Promise<WorkDoneResponse> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(
    `${BASE_URL}/api/clients/${id}/workdone?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 403 || res.status === 401) {
    throw new Error('Forbidden');
  }
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  return await res.json();
}

export async function ProfilePictureAction(
  formData: FormData,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/clients/profile-picture`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (res.status === 403 || res.status === 401) {
    throw new Error('Forbidden');
  }
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  revalidatePath('/nx/client/myprofile');

  return true;
}

export async function AboutAction(
  request: string,
  token: string | undefined
): Promise<any> {
  const reqbody = { description: request };
  // console.log(reqbody);
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/clients/description`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });
  console.log(res);
  if (res.status === 403 || res.status === 401) {
    throw new Error('Forbidden');
  }
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error('SomeThing went Wrong');
  }
  revalidatePath('/nx/client/myprofile');
  return true;
}

export const ProfileSkillApi = async (
  token: string | undefined,
  requestBody: string[]
): Promise<any> => {
  const reqbody = { skills: requestBody };
  console.log(reqbody);
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/clients/skills`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });
  console.log(res);
  if (res.status === 403 || res.status === 401) {
    throw new Error('Forbidden');
  }
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error('SomeThing went Wrong');
  }
  revalidatePath('/nx/client/myprofile');
  return true;
};
