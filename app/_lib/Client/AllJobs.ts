"use server";

interface Job {
  jobName: string;
  jobId: string;
  postedAt: string;
  proposals: number;
  hired: number;
  contractId: string;
}

interface PaginatedJobs {
  content: Job[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

type GetMyJobsResponse = PaginatedJobs | { error: string };

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getMyJobs(
  token: string, // ✅ Required parameter comes first
  page?: number,
  size?: number,
  search?: string
): Promise<GetMyJobsResponse> {
  if (!token) {
    return { error: "Unauthorized user" };
  }

  let url = `${BASE_URL}/clients/my-jobs`;
  const params: string[] = [];

  if (page !== undefined) params.push(`page=${page}`);
  if (size !== undefined) params.push(`size=${size}`);
  params.push(`search=${encodeURIComponent(search || "")}`);

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  console.log(url);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["myJobs"] },
    });

    if (res.status === 403) {
      return { error: "Forbidden" };
    }

    if (!res.ok) {
      return { error: "Error fetching my jobs" };
    }

    const data: PaginatedJobs = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { error: "Failed to fetch jobs" };
  }
}
