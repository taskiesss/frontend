'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type Milestone = {
  title: string;
  description: string;
  dueDate: string;
  expectedHours: number;
  milestoneNumber: number;
};

export async function CreateContract(
  prevState: { error?: string | undefined },
  formData: FormData
): Promise<{ error?: string | undefined }> {
  // Get the token from cookies for authentication
  const token = (await cookies()).get('token')?.value;
  if (!token) return { error: 'Unauthorized user' };

  // Extract form data
  const proposalId = formData.get('proposalId') as string;

  const startDate = formData.get('startDate') as string;
  const costPerHour = parseFloat(formData.get('costPerHour') as string);
  const payment = formData.get('payment') as string;
  const milestonesRaw = formData.get('milestones') as string;

  // Parse milestones
  let milestones: Milestone[] = [];
  milestones = JSON.parse(milestonesRaw);

  // Prepare request body
  const reqBody = {
    startDate,
    costPerHour,
    payment,
    milestones,
  };

  console.log('Request Body:', reqBody);

  // Make API request to create the contract
  const res = await fetch(`${BASE_URL}/clients/${proposalId}/create-contract`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqBody),
  });

  // Handle API response
  if (res.status === 403) {
    return { error: 'Forbidden' };
  }

  if (!res.ok) {
    return { error: 'Something went wrong' };
  }

  // Redirect to a success page (e.g., a contracts list or confirmation page)
  redirect('/nx/client/all-proposals');
  console.log('Contract created successfully');
  return {};
}
