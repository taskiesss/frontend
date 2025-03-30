'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BASE_URL = 'http://localhost:8080';

export async function postAJob(
  prevState: { error?: string | undefined },
  formData: FormData
): Promise<{ error?: string | undefined }> {
  const token = (await cookies()).get('token')?.value;
  if (!token) return { error: 'Unauthorized user' };

  const reqbody = {
    title: formData.get('title') as string,
    skills: formData.get('skills')?.toString().split(',').filter(Boolean) || [], // Filter out empty strings
    projectLength: formData.get('projectLength') as string,
    experienceLevel: formData.get('experienceLevel') as string,
    expectedPricePerHour: parseFloat(
      formData.get('expectedPricePerHour') as string
    ),
    description: formData.get('description') as string,
  };
  // Validate skills
  if (!reqbody.skills.length) {
    return { error: 'Skills required is a mandatory field' };
  }
  console.log(reqbody);

  const res = await fetch(`${BASE_URL}/client/PostJob`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqbody),
  });

  if (res.status === 403) {
    return { error: 'Forbidden' };
  }

  if (!res.ok) {
    return { error: 'Something went wrong' };
  }

  redirect('/nx/client/all-jobs');

  return {};
}
