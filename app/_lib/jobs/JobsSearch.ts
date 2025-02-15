/* eslint-disable @typescript-eslint/no-explicit-any */
import { JobDetailsResponse } from '@/app/_types/JobDetailsResponce';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8080';

export async function getJobDetails(
  jobId: string
): Promise<JobDetailsResponse> {
  // Check if the token exists; throw an error if not.
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Unauthorized user');
  }

  const response = await fetch(`${BASE_URL}/freelancers/jobs/${jobId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 403) {
    throw new Error('Forbidden');
  }

  if (!response.ok) {
    let errorMessage = 'Job not found.';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Fallback in case errorData can't be parsed.
    }
    throw new Error(errorMessage);
  }

  // Parse and return the JSON data.
  return response.json() as Promise<JobDetailsResponse>;
}

export async function getOwnedCommunities(): Promise<any> {
  // Check if the token exists; throw an error if not.
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Unauthorized user');
  }

  const response = await fetch(`${BASE_URL}/freelancers/owned-communities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response);

  if (response.status === 403) {
    throw new Error('Forbidden');
  }

  if (!response.ok) {
    let errorMessage = 'Error retrieving communities.';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Fallback in case errorData can't be parsed.
    }
    throw new Error(errorMessage);
  }
  const output = await response.json();
  // console.log(output);
  // Parse and return the JSON data as an array of OwnedCommunity.
  return output;
}
