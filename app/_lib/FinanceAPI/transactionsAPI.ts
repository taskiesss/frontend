import { invariant } from '@/app/_helpers/invariant';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getProfileTransaction(
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  //   console.log(reqbody);

  const res = await fetch(`${BASE_URL}/api/finance/profile`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
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
  const out = await res.json();
  // console.log(out);
  return out;
}

export async function getTransactions(
  reqbody: any,
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  console.log(reqbody);

  const res = await fetch(`${BASE_URL}/api/finance/transactions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });
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
  const out = await res.json();
  console.log(out);
  return out;
}
