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

const API_KEY = 'CQvnnrzKabdKSOSUjihZUu18kdY2kpQu';

export async function fetchSuggestions(query: string) {
  // Return an empty array if the query is empty.
  if (!query.trim()) return [];

  const myHeaders = new Headers();
  myHeaders.append('apikey', API_KEY);

  try {
    const response = await fetch(
      `https://api.apilayer.com/skills?q=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      }
    );
    const result = await response.json();
    // Adjust this based on the API's actual response structure.
    return result || [];
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
}
