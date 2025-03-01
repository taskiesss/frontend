import { invariant } from '@/app/_helpers/invariant';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'http://localhost:8080';
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
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  const out = await res.json();
  console.log(out);
  return out;
}

export async function getContractDetails(
  reqbody: { id: string; page: number; size: number },
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');
  //   console.log(reqbody);

  const res = await fetch(
    `${BASE_URL}/freelancers/my-contracts/${reqbody.id}?page=${reqbody.page}&size=${reqbody.size}`,
    {
      method: 'GET',
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
  const out = await res.json();
  console.log(out);
  return out;
}
