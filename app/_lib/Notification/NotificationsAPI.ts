/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getNotifications(
  token: string | undefined,
  page: number = 0,
  size: number = 5
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  const res = await fetch(
    `${BASE_URL}/api/notifications?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['notifications'] },
    }
  );
  if (res.status === 403 || res.status === 401) return { error: 'Forbidden' };
  if (res.status === 400) {
    const error = await res.json();
    return { error: error.message };
  }
  if (!res.ok) return { error: 'Error fetching notifications' };

  const data = await res.json();
  return data;
}

export async function markAsRead(
  id: string,
  token: string | undefined
): Promise<any> {
  if (!token) {
    return { error: 'Unauthorized user' };
  }
  const res = await fetch(`${BASE_URL}/api/notifications/mark-as-read/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 403 || res.status === 401) return { error: 'Forbidden' };
  if (res.status === 400) {
    const error = await res.json();
    return { error: error.message };
  }
  if (!res.ok) return { error: 'Error fetching mark as read notification' };

  const data = await res.json();
  return data;
}
