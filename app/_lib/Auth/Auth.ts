/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../_types/User';

const BASE_URL = 'http://localhost:8080';
export async function registerUser(user: User): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/public/signup/create-a ccount`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Only throw an error if the response status is 500
    if (res.status === 500 || res.status === 404) {
      throw new Error('Internal Error :(');
    }

    const data = await res.json();
    console.log(data);

    // For any other status, simply return the response details
    return data;
  } catch (e: any) {
    throw new Error('Internal Error :(');
  }
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
    if (res.status === 500 || res.status === 404) {
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
    const res = await fetch(`${BASE_URL}/signup/send-otp`, {
      method: 'POST',
      body: JSON.stringify({ ...user }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 500 || res.status === 404) {
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
  try {
    const res = await fetch(`${BASE_URL}/public/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Only throw an error if the response status is 500
    if (res.status === 500 || res.status === 404) {
      throw new Error('Internal Error :(');
    }
    const data = await res.json();

    return data; //token and role and isFirst
  } catch (e: any) {
    throw new Error('Internal Error :(');
  }
}
