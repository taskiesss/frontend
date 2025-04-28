'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { invariant } from '@/app/_helpers/invariant';
import { revalidatePath } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ProfileSkillApi = async (
  token: string | undefined,
  requestBody: string[]
): Promise<any> => {
  const reqbody = { skills: requestBody };
  console.log(reqbody);
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/freelancers/skills`, {
    method: 'PATCH',
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
    // console.log('iam here');
    throw new Error('SomeThing went Wrong');
  }
  revalidatePath('/nx/freelancers/myprofile');
  return true;
};

export async function AboutAction(
  request: string,
  token: string | undefined
): Promise<any> {
  const reqbody = { description: request };
  // console.log(reqbody);
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/freelancers/description`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error('SomeThing went Wrong');
  }
  revalidatePath('/nx/freelancers/myprofile');
  return true;
}

export async function EducationAction(
  request: any,
  token: string | undefined
): Promise<any> {
  const reqbody = { educations: request };
  // console.log(reqbody);
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/freelancers/educations`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error('SomeThing went Wrong');
  }
  revalidatePath('/nx/freelancers/myprofile');
  return true;
}

export async function EmpHistoryAction(
  request: any,
  token: string | undefined
): Promise<any> {
  const reqbody = { employeeHistory: request };
  // console.log(reqbody);
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/freelancers/employement-history`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error('SomeThing went Wrong');
  }
  revalidatePath('/nx/freelancers/myprofile');
  return true;
}

export async function LanguagesAction(
  request: any,
  token: string | undefined
): Promise<any> {
  const reqbody = { languages: request };
  // console.log(reqbody);
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/freelancers/languages`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error('SomeThing went Wrong');
  }
  revalidatePath('/nx/freelancers/myprofile');
  return true;
}

export async function LinksAction(
  request: any,
  token: string | undefined
): Promise<any> {
  const reqbody = { linkedIn: request };
  // console.log(reqbody);
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/freelancers/linkedin`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error('SomeThing went Wrong');
  }
  revalidatePath('/nx/freelancers/myprofile');
  return true;
}

export async function HPWAction(
  request: any,
  token: string | undefined
): Promise<any> {
  const reqbody = { avrgHoursPerWeek: request };

  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/freelancers/avrg-hour-per-week`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error('SomeThing went Wrong');
  }
  revalidatePath('/nx/freelancers/myprofile');
  return true;
}

export async function AddPortFolio(
  formData: FormData,
  token: string | undefined
): Promise<any> {
  // Send a POST request to the /freelancers/description endpoint
  invariant(!token, 'Unauthorized user');
  const res = await fetch(`${BASE_URL}/freelancers/portfolio`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  console.log(res);
  if (res.status === 403) {
    throw new Error('Forbidden');
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error('SomeThing went Wrong');
  }
  revalidatePath('/nx/freelancers/myprofile');
  return true;
}

export async function HeaderSectionAction(
  request: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    pricePerHour: number;
    country: string;
  },
  token: string | undefined
): Promise<any> {
  // console.log(request);
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/freelancers/header-section`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  console.log(res);

  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went Wrong');
  }

  revalidatePath('/nx/freelancers/myprofile');
  return true;
}

export async function ProfilePictureAction(
  request: FormData,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/freelancers/profile-picture`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: request, // Sending FormData directly
  });

  console.log(res);

  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  revalidatePath('/nx/freelancers/myprofile');
  return true;
}

export async function CoverPictureAction(
  request: FormData,
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/freelancers/cover-picture`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: request,
  });

  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  revalidatePath('/nx/freelancers/myprofile');

  return true;
}

export async function getFreelancerbyID(
  id: string,
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/api/freelancers/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

export async function getWorkDonebyID(
  id: string,
  page: number,
  size: number,
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');

  const res = await fetch(
    `${BASE_URL}/api/freelancers/${id}/workdone?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 403) {
    throw new Error('Forbidden');
  }

  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  const out = await res.json();
  console.log('Work done', out);
  return out;
}

export async function getPortfoliosbyID(
  id: string,
  page: number,
  size: number,
  token: string | undefined
): Promise<any> {
  // for (const key of request.keys()) {
  //   console.log('Key:', key);
  // }
  invariant(!token, 'Unauthorized user');

  const res = await fetch(
    `${BASE_URL}/api/freelancers/${id}/portfolios?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

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

export async function DeletePortfolioAction(
  filePath: string,
  token: string | undefined
): Promise<any> {
  // Ensure that a token is provided.
  invariant(!token, 'Unauthorized user');

  // Call the API with the DELETE method, passing the filePath as a query parameter.
  const res = await fetch(
    `${BASE_URL}/freelancers/portfolio?filePath=${encodeURIComponent(
      filePath
    )}`,
    {
      method: 'DELETE',
      headers: {
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

  revalidatePath('/nx/freelancers/myprofile');
  return true;
}
