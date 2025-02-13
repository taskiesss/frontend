import { JobDetailsResponse } from "@/app/_types/JobDetailsResponce";

const BASE_URL = "http://localhost:8080";

// The function signature is updated to Promise<JobDetailsResponse>, ensuring that on success, the promise resolves to a JobDetailsResponse object.

export async function getJobDetails(
  jobId: string
): Promise<JobDetailsResponse> {
  try {
    const response = await fetch(`${BASE_URL}/freelancers/jobs/${jobId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Job not found.");
    }

    const data = await response.json();
    return data as JobDetailsResponse;
  } catch (error) {
    throw new Error("Internal Error :(");
  }
}
