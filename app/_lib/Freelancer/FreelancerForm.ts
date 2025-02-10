/* eslint-disable @typescript-eslint/no-unused-vars */
// freelancerFormApi.ts

import {
  FreelancerFormErrorResponse,
  FreelancerFormPayload,
  FreelancerFormSuccessResponse,
} from '@/app/_types/FreelancerForm';

/**
 * Submits the freelancer form data to the API endpoint.
 * @param data - The freelancer profile data.
 * @param token - Bearer token for authorization.
 * @returns A promise that resolves to a FreelancerFormSuccessResponse if the profile is submitted successfully.
 * @throws An error with an appropriate message if the submission fails.
 */
export async function submitFreelancerForm(
  data: FreelancerFormPayload,
  token: string
): Promise<FreelancerFormSuccessResponse> {
  try {
    const response = await fetch('/freelancer-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorData: FreelancerFormErrorResponse;
      try {
        errorData = await response.json();
      } catch (jsonError) {
        throw new Error(
          'An error occurred while submitting the freelancer profile.'
        );
      }

      // Check status to provide a more specific error message
      if (errorData.error.type === 'unauthorized') {
        throw new Error(`Unauthorized: ${errorData.error.message}`);
      } else if (errorData.error.type === 'forbidden') {
        throw new Error(`Forbidden: ${errorData.error.message}`);
      } else if (response.status === 500) {
        throw new Error(`Server Error: ${errorData.error.message}`);
      } else {
        throw new Error(
          errorData.error.message ||
            'An error occurred while submitting the freelancer profile.'
        );
      }
    }

    // Parse and return the success response
    const result = (await response.json()) as FreelancerFormSuccessResponse;
    return result;
  } catch (error) {
    console.error('Error submitting freelancer form:', error);
    throw error;
  }
}
