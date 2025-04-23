/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';
const BASE_URL = 'http://localhost:8080';

//POSTING A POST
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
  const res = await fetch(`${BASE_URL}/freelancers/communities/${id}/post`, {
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

//GETTING POSTS
export async function getPosts(
  id: string,
  token: string | undefined,
  page: number = 0,
  size: number = 10
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${id}/posts?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['posts'] },
    }
  );
  if (res.status === 403) return { error: 'Forbidden' };
  if (!res.ok) return { error: 'Error fetching posts' };

  const data = await res.json();
  return data;
}

//GETTING COMMENTS FOR A POST
export async function getComments(
  postId: string,
  communityId: string,
  token: string | undefined,
  page: number = 0,
  size: number = 10
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/post/${postId}/post-comments?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.status === 403) return { error: 'Forbidden' };
  if (!res.ok) return { error: 'Error fetching comments' };

  const data = await res.json();
  return data;
}

// DELETE COMMENT
export async function deleteCommentAPI(
  postId: string,
  token: string | undefined,
  commentId: string
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/post/${postId}/comment/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.status === 403) return { error: 'Forbidden' };
  if (!res.ok) return { error: 'Error deleting comment' };

  revalidateTag(`posts`);
  return true;
}

// LIKING A POST
export async function likePost(
  postId: string,
  communityId: string,
  liked: boolean,
  token: string | undefined
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/post/${postId}/likes/${liked}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.status === 403) return { error: 'Forbidden' };
  if (!res.ok) return { error: 'Error liking post' };

  revalidateTag(`posts`);
  return true;
}

// GET LIKES FOR A POST
export async function getLikes(
  postId: string,
  communityId: string,
  token: string | undefined
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/post/${postId}/likes`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.status === 403) return { error: 'Forbidden' };
  if (!res.ok) return { error: 'Error fetching likes' };

  const data = await res.json();
  return data;
}

// DELETING A POST
export async function deletePost(
  postId: string,
  communityId: string,
  token: string | undefined
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/post/${postId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.status === 403) return { error: 'Forbidden' };
  if (!res.ok) return { error: 'Error deleting post' };

  revalidateTag(`posts`);
  return true;
}

//POSTING A COMMENT
export async function postComment(
  postId: string,
  communityId: string,
  token: string | undefined,
  reqbody: { content: FormDataEntryValue | null }
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/post/${postId}/comment`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqbody),
    }
  );
  if (res.status === 403) return { error: 'Forbidden' };
  if (!res.ok) return { error: 'Error posting comment' };

  revalidateTag(`posts`);
  return true;
}
