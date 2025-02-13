/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// freelancerFormApi.ts
import { invariant } from '@/app/_helpers/invariant';
import { FreelancerFormPayload } from '@/app/_types/FreelancerForm';
import Cookies from 'js-cookie';
const BASE_URL = 'http://localhost:8080';
/**
 * Submits the freelancer form data to the API endpoint.
 * @param data - The freelancer profile data.
 * @returns A promise that resolves to a FreelancerFormSuccessResponse if the profile is submitted successfully.
 * @throws An error with an appropriate message if the submission fails.
 */
export async function submitFreelancerForm(
  data: FreelancerFormPayload
): Promise<any> {
  try {
    const token = Cookies.get('token');
    invariant(!token, 'unauthorized user');

    try {
      const res = await fetch(`${BASE_URL}/freelancers/freelancer-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return true;
      }
      if (res.status === 403) {
        throw new Error('Forbidden');
      }
      const output = await res.json();

      return output;
    } catch (e: any) {
      console.error('Interal error :(');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
