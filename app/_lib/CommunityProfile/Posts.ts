/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';
const BASE_URL = 'http://localhost:8080';

export async function PostingaPost(
  id: string,
  reqbody: {
    postTitle: FormDataEntryValue | null;
    postContent: FormDataEntryValue | null;
  },
  token: string | undefined
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  console.log(reqbody);
  const res = await fetch(`${BASE_URL}/freelancers/communities/${id}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });
  console.log(res);

  if (res.status === 403) return { error: 'Forbidden' };
  if (!res.ok) return { error: 'Error posting' };

  revalidateTag(`posts`);
  return true;
}
