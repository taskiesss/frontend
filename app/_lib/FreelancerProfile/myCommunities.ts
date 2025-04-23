"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { invariant } from "@/app/_helpers/invariant";
import { revalidateTag } from "next/cache";

export type MyCommunitiesResponse = {
  adminOf: Array<{
    communityId: string;
    name: string;
    profilePicture: string;
    communityTitle: string;
  }>;
  memberOf: Array<{
    communityId: string;
    name: string;
    profilePicture: string;
    communityTitle: string;
  }>;
};

const BASE_URL = "http://localhost:8080";

export async function getMyCommunities(
  token: string | undefined
): Promise<MyCommunitiesResponse> {
  invariant(!token, "Unauthorized user");

  const res = await fetch(`${BASE_URL}/freelancers/my-communities`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["my-communities"] }, // Add cache tag for revalidation
  });

  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error("Failed to fetch communities");

  return res.json();
}

export interface CreateCommunityRequest {
  communityName: string;
  description: string;
  title: string;
  pricePerHour: number;
  avrgHoursPerWeek: number;
  skills: string[];
  adminRole: {
    positionName: string;
    percentage: number;
    description: string;
  };
  communityPositions: Array<{
    positionName: string;
    percentage: number;
    description: string;
  }>;
}

export interface CreateCommunityResponse {
  communityID: string;
}

export async function createCommunity(
  requestData: CreateCommunityRequest,
  token: string | undefined
): Promise<CreateCommunityResponse> {
  invariant(!token, "Unauthorized user");

  const response = await fetch(
    `${BASE_URL}/freelancers/communities/create-community`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    }
  );

  if (response.status === 400) {
    throw new Error("Bad request - Invalid community data");
  }
  if (response.status === 401) {
    throw new Error("Unauthorized");
  }
  if (response.status === 403) {
    throw new Error("Forbidden - Insufficient permissions");
  }
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  // Revalidate community list cache
  revalidateTag("my-communities");

  return response.json();
}
