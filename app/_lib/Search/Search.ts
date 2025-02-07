import { PageJobResponse, SearchJobsRequest } from '@/app/_types/JobSearch';

const BASE_URL = 'http://localhost:8080';

// Assuming these interfaces have been defined elsewhere:

/**
 * Calls the /jobs/search API endpoint.
 * @param request - The search parameters for querying jobs.
 * @returns A promise that resolves to a PageJobResponse.
 * @throws An error if the API call fails.
 */
export async function searchJobs(
  request: SearchJobsRequest
): Promise<PageJobResponse> {
  try {
    const response = await fetch(`${BASE_URL}/jobs/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      // Try to parse the error response body (if available)
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        // Customize this based on your error response schema.
        if (errorData && errorData.error && errorData.error.message) {
          errorMessage = errorData.error.message;
        }
      } catch (parseError) {
        // If parsing fails, use the default error message.
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data as PageJobResponse;
  } catch (error) {
    console.error('Error in searchJobs:', error);
    // Rethrow the error so that calling code can handle it.
    throw error;
  }
}
