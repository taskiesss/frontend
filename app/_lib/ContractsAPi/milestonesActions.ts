import { invariant } from '@/app/_helpers/invariant';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function milestoneApproval(
  params: {
    contractid: string;
    milestoneIndex: number;
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
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (res.status === 403 || res.status === 401) {
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
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (res.status === 403 || res.status === 401) {
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
