'use server';
import { invariant } from '@/app/_helpers/invariant';
import { revalidateTag } from 'next/cache';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getMyContracts(
  reqbody: any,
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  //   console.log(reqbody);

  const res = await fetch(`${BASE_URL}/freelancers/my-contracts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
    next: { tags: ['contracts'] },
  });
  // console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  const out = await res.json();
  // console.log(out);
  return out;
}

export async function getContractDetails(
  reqbody: { id: string },
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  //   console.log(reqbody);

  const res = await fetch(`${BASE_URL}/api/contracts/${reqbody.id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  const out = await res.json();
  // console.log(out);
  return out;
}

export async function getMilestones(
  reqbody: { id: string; page: number; size: number },
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  //   console.log(reqbody);

  const res = await fetch(
    `${BASE_URL}/api/contracts/${reqbody.id}/milestones?page=${reqbody.page}&size=${reqbody.size}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  const out = await res.json();
  // console.log(out);
  return out;
}

export async function getSubmission(
  reqbody: { contractid: string; milestoneIndex: string },
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  //   console.log(reqbody);
  // console.log(reqbody);
  const res = await fetch(
    `${BASE_URL}/api/contracts/${reqbody.contractid}/milestones/${reqbody.milestoneIndex}/submission`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  const out = await res.json();
  // console.log(out);
  return out;
}

export async function postSubmission(
  reqbody: { contractid: string; milestoneIndex: string; body: FormData },
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  //   console.log(reqbody);

  const res = await fetch(
    `${BASE_URL}/api/contracts/${reqbody.contractid}/milestones/${reqbody.milestoneIndex}/add`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: reqbody.body,
    }
  );
  console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  // console.log(out);
  return true;
}

export async function deleteFileOrLinkAPI(
  reqbody: {
    contractid: string;
    milestoneIndex: string;
    type: 'file' | 'link';
    id: string;
  },
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  //   console.log(reqbody);

  const res = await fetch(
    `${BASE_URL}/api/contracts/${reqbody.contractid}/milestones/${reqbody.milestoneIndex}/${reqbody.type}/${reqbody.id}`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

export async function postRateReview(
  reqbody: { id: string; rate: number },
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  console.log(reqbody);

  const res = await fetch(
    `${BASE_URL}/api/contracts/${reqbody.id}/rate-contract/${reqbody.rate}`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  // revalidate contract api
  revalidateTag('contracts');
}

export async function AcceptOrRejectContract(
  reqbody: { id: string; accepted: boolean },
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  console.log(reqbody);

  const res = await fetch(
    `${BASE_URL}/freelancers/contracts/${reqbody.id}/approve-contract`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ accepted: reqbody.accepted }),
    }
  );
  // console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  // revalidate contract api
  revalidateTag('contracts');
}
