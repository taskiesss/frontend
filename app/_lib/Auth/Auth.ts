/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../_types/User';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function registerUser(user: User): Promise<any> {
  const res = await fetch(`${BASE_URL}/public/signup/create-account`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(res);

  if (res.status === 400) {
    const data = await res.json();
    // console.log(data);
    throw data;
  }

  // Only throw an error if the response status is 500
  if (res.status === 500 || res.status === 404 || !res.ok) {
    throw new Error('Internal Error :(');
  }

  const data = await res.json();
  console.log(data);

  // For any other status, simply return the response details
  return data;
}

export async function otpVerify(user: User, otp: string): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/public/signup/verify`, {
      method: 'POST',
      body: JSON.stringify({ ...user, otp }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Only throw an error if the response status is 500
    if (res.status === 500 || res.status === 404 || !res.ok) {
      throw new Error('Internal Error :(');
    }
    const data = await res.json();

    return data;
  } catch (e: any) {
    throw new Error('Internal Error :(');
  }
}

export async function sendOTP(user: User): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/public/signup/send-otp`, {
      method: 'POST',
      body: JSON.stringify({ ...user }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 500 || res.status === 404 || !res.ok) {
      throw new Error('Internal Error :(');
    }

    // Only throw an error if the response status is 500

    // const data = await res.json();

    return true;
  } catch (e: any) {
    throw new Error('Internal Error :(');
  }
}

export async function Login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/public/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 400) {
    const data = await res.json();

    throw data;
  }
  const data = await res.json();

  // Only throw an error if the response status is 500
  if (res.status === 500 || res.status === 404 || !res.ok) {
    throw new Error('Internal Error :(');
  }

  return data; //token and role and isFirst
}
