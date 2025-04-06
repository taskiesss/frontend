import { invariant } from '@/app/_helpers/invariant';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'http://localhost:8080';
export async function milestoneApproval(
  params: {
    contractid: string;
    milestoneIndex: string;
  },
  reqbody: { accepted: boolean },
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  //   console.log(reqbody);

  const res = await fetch(
    `${BASE_URL}/clients/contracts/${params.contractid}/milestones/${params.milestoneIndex}/approve-milestone`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqbody),
    }
  );
  // console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  return true;
}

export async function requestPayment(
  params: {
    communityid?: string;
    contractid: string;
    milestoneIndex: string;
    index: number;
  },
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  console.log(params);

  const res = await fetch(
    `${BASE_URL}/freelancers/contracts/${params.contractid}/milestones/${params.index}/request-review`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  return {
    success: true,
    contractId: params.contractid,
    milestoneIndex: params.milestoneIndex,
  };
}
