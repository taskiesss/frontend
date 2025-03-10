"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { invariant } from "@/app/_helpers/invariant";
import { revalidatePath } from "next/cache";

const BASE_URL = "http://localhost:8080";

// Type definitions based on Swagger schema
interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
}

interface PaginatedResponse<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

interface JoinRequest {
  freelancerID: string;
  name: string;
  profilePicture: string;
  positionName: string;
}

interface Offer {
  contractID: string;
  jobTitle: string;
  description: string;
  skills: string[];
  pricePerHour: number;
  sentDate: string;
  dueDate: string;
  voted: number;
  left: number;
  accepted: number;
  rejected: number;
  agreed: boolean;
}

interface ActiveContract {
  contractID: string;
  jobID: string;
  jobTitle: string;
  clientName: string;
  clientID: string;
  contractStatus: string;
  budget: number;
  activeMilestone: string;
  clientRateForFreelancer: number;
  startDate: string;
  dueDate: string;
  endDate: string;
}

// API Functions
export async function getCommunityJoinRequests(
  communityId: string,
  token: string | undefined,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<JoinRequest>> {
  invariant(!token, "Unauthorized user");
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/joinrequests?page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 403) throw new Error("Forbidden");
  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
}

export async function getCommunityOffers(
  communityId: string,
  token: string | undefined,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<Offer>> {
  invariant(!token, "Unauthorized user");
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/offers?page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 403) throw new Error("Forbidden");
  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
}

export async function getCommunityActiveContracts(
  communityId: string,
  token: string | undefined,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<ActiveContract>> {
  invariant(!token, "Unauthorized user");
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/active-contracts?page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 403) throw new Error("Forbidden");
  if (!res.ok) throw new Error("Something went wrong");

  return res.json();
}

export async function acceptOrRejectJoinRequest(
  communityId: string,
  request: {
    freelancerId: string;
    positionName: string;
    choice: "accept" | "reject";
  },
  token: string | undefined
): Promise<boolean> {
  invariant(!token, "Unauthorized user");
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/accept-to-join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    }
  );

  if (res.status === 403) throw new Error("Forbidden");
  if (res.status === 400) throw new Error("Invalid request data");
  if (!res.ok) throw new Error("Something went wrong");

  revalidatePath(`/communities/${communityId}`);
  return true;
}

export async function voteOnCommunityContract(
  communityId: string,
  request: {
    contractId: string;
    agreed: boolean;
  },
  token: string | undefined
): Promise<boolean> {
  invariant(!token, "Unauthorized user");
  const res = await fetch(
    `${BASE_URL}/freelancers/communities/${communityId}/vote`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    }
  );

  if (res.status === 403) throw new Error("Forbidden");
  if (res.status === 400) throw new Error("Invalid request data");
  if (!res.ok) throw new Error("Something went wrong");

  revalidatePath(`/communities/${communityId}`);
  return true;
}
