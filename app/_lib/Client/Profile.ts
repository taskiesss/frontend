'use server';
import { invariant } from '@/app/_helpers/invariant';

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
