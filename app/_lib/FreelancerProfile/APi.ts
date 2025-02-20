"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { invariant } from "@/app/_helpers/invariant";
import { revalidatePath } from "next/cache";

const BASE_URL = "http://localhost:8080";

export const ProfileSkillApi = async (
  token: string | undefined,
  requestBody: string[]
): Promise<any> => {
  invariant(!token, "Unauthorized user");
  const res = await fetch(`${BASE_URL}/freelancers/skills`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error("Forbidden");
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error("SomeThing went Wrong");
  }
  revalidatePath("/nx/freelancers/myprofile");
  return true;
};


export async function AboutAction(
  request: string,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/freelancers/description`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error("Forbidden");
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error("SomeThing went Wrong");
  }
  revalidatePath("/nx/freelancers/myprofile");
  return true;
}

export async function EducationAction(
  request: any,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/freelancers/educations`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error("Forbidden");
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error("SomeThing went Wrong");
  }
  revalidatePath("/nx/freelancers/myprofile");
  return true;
}

export async function EmpHistoryAction(
  request: any,
  token: string | undefined

): Promise<any> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/freelancers/employement-history`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error("Forbidden");
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error("SomeThing went Wrong");
  }
  revalidatePath("/nx/freelancers/myprofile");
  return true;
}


export async function LanguagesAction(
  request: any,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/freelancers/languages`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error("Forbidden");
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error("SomeThing went Wrong");
  }
  revalidatePath("/nx/freelancers/myprofile");
  return true;
}


export async function LinksAction(
  request: any,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/freelancers/linkedin`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error("Forbidden");
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error("SomeThing went Wrong");
  }
  revalidatePath("/nx/freelancers/myprofile");
  return true;
}


export async function HPWAction(
  request: any,
  token: string | undefined
): Promise<any> {
  invariant(!token, 'Unauthorized user');

  const res = await fetch(`${BASE_URL}/freelancers/avrg-hours-per-week`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  console.log(res);
  if (res.status === 403) {
    throw new Error("Forbidden");
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error("SomeThing went Wrong");
  }
  revalidatePath("/nx/freelancers/myprofile");
  return true;
}

export async function AddPortFolio(
  formData: FormData,
  token: string | undefined
): Promise<any> {
  // Send a POST request to the /freelancers/description endpoint
  invariant(!token, "Unauthorized user");
  const res = await fetch(`${BASE_URL}/freelancers/portfolio`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  console.log(res);
  if (res.status === 403) {
    throw new Error("Forbidden");
  }
  if (!res.ok) {
    // console.log('iam here');
    throw new Error("SomeThing went Wrong");
  }
  revalidatePath("/nx/freelancers/myprofile");
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
  invariant(!token, "Unauthorized user");

  const res = await fetch(`${BASE_URL}/freelancers/header-section`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  console.log(res);

  if (res.status === 403) {
    throw new Error("Forbidden");
  }

  if (!res.ok) {
    throw new Error("Something went Wrong");
  }

  revalidatePath("/nx/freelancers/myprofile");
  return true;
}

export async function ProfilePictureAction(
  request: FormData,
  token: string | undefined
): Promise<any> {
  invariant(!token, "Unauthorized user");

  const res = await fetch(`${BASE_URL}/freelancers/profile-picture`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: request, // Sending FormData directly
  });

  console.log(res);

  if (res.status === 403) {
    throw new Error("Forbidden");
  }

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  revalidatePath("/nx/freelancers/myprofile");
  return await res.json(); // Return the response data (e.g., new image URL)
}

export async function CoverPictureAction(
  request: FormData,
  token: string | undefined
): Promise<any> {
  invariant(!token, "Unauthorized user");

  const res = await fetch(`${BASE_URL}/freelancers/cover-picture`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: request,
  });

  if (res.status === 403) {
    throw new Error("Forbidden");
  }

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  revalidatePath("/nx/freelancers/myprofile");
  return await res.json(); // Assuming it returns { coverPhoto: "new-url" }
}
