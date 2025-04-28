/* eslint-disable @typescript-eslint/no-explicit-any */
import { invariant } from '@/app/_helpers/invariant';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const jobApplication = async (
  token: string | undefined,
  requestBody: FormData,
  jobId: string
): Promise<any> => {
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/freelancers/proposals/${jobId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: requestBody,
  });
  console.log(res);
  if (!res.ok) {
    console.log('iam here');
    throw new Error('Forbidden');
  }
  return true;
};

export default jobApplication;
