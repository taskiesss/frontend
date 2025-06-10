"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { invariant } from "@/app/_helpers/invariant";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Fetches contract conversations for a given contract ID.
 *
 * @param contractId - The ID of the contract.
 * @param token - Authentication token.
 * @param page - Page number (default: 0).
 * @param size - Page size (default: 10).
 * @returns Paginated list of contract conversations.
 */
export async function getContractConversations(
  contractId: string,
  token: string | undefined,
  page: number = 0,
  size: number = 10
): Promise<any> {
  invariant(!token, "Unauthorized user");

  const res = await fetch(
    `${BASE_URL}/api/contracts/${contractId}/contract-conversations?page=${page}&size=${size}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: [`contract-conversations-${contractId}`] },
    }
  );

  if (res.status === 403 || res.status === 401) throw new Error("Forbidden");
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) throw new Error("Something went wrong");

  return await res.json();
}

/**
 * Creates a new contract conversation.
 *
 * @param contractId - The ID of the contract.
 * @param content - Text content of the conversation message.
 * @param token - Authentication token.
 * @returns A simple success response.
 */
export async function createContractConversation(
  contractId: string,
  content: string,
  token: string | undefined
): Promise<any> {
  invariant(!token, "Unauthorized user");

  const res = await fetch(
    `${BASE_URL}/api/contracts/${contractId}/contract-conversations`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
      cache: "no-store", // prevent caching for POST requests
    }
  );

  if (res.status === 403 || res.status === 401) throw new Error("Forbidden");
  if (res.status === 400) {
    const error = await res.json();
    throw new Error(error.message);
  }
  if (!res.ok) throw new Error("Something went wrong");

  revalidateTag(`contract-conversations-${contractId}`);

  return await res.json();
}
