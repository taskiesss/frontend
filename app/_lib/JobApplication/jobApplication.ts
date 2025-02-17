import { invariant } from '@/app/_helpers/invariant';
import { JobApplicationRequest } from '@/app/_types/JobApplication';
import Cookies from 'js-cookie';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'http://localhost:8080';

const jobApplication = async (request: JobApplicationRequest) => {
  try {
    const token = Cookies.get('token');

    invariant(!token, 'unauthorized user');
    const res = await fetch(
      `${BASE_URL}/freelancers/proposals/${request.jobId}`,
      {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      }
    );
    if (res.ok) {
      return true;
    } else {
      throw new Error('forbidden');
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default jobApplication;
