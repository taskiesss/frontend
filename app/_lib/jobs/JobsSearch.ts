/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getJobDetails(
  token: string | undefined,
  jobId: string
): Promise<any> {
  // Check if the token exists; throw an error if not.
  if (!token) {
    throw new Error('Unauthorized user');
  }
  // console.log(token);

  const response = await fetch(`${BASE_URL}/freelancers/jobs/${jobId}`, {
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
    let errorMessage = 'Job not found.';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Fallback in case errorData can't be parsed.
    }
    throw new Error(errorMessage);
  }
  // console.log(response.status);
  const out = await response.json();
  // Parse and return the JSON data.

  return out;
}

export async function getOwnedCommunities(
  token: string | undefined
): Promise<any> {
  // Check if the token exists; throw an error if not.

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
