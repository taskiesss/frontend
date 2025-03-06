/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  PageCommunityResponse,
  SearchCommunitiesRequest,
} from '@/app/_types/CommunitySearch';
import { PageJobResponse, SearchJobsRequest } from '@/app/_types/JobSearch';
import {
  SearchFreelancersRequest,
  PageFreelancerResponse,
} from '@/app/_types/FreelancerSearch';

const BASE_URL = 'http://localhost:8080';

/**
 * Retrieves the API key from the environment variable.
 * Throws an error if the key is not defined.
 */
// function getApiKey(): string {
//   const key = process.env.SKILLS_API_KEY;
//   if (!key) {
//     throw new Error(
//       "Missing API key. Please set SKILLS_API_KEY in your environment variables."
//     );
//   }
//   return key;
// }

// Use the helper function to guarantee that API_KEY is a string.
// const API_KEY = getApiKey();

/**
 * Calls the /jobs/search API endpoint.
 */
export async function searchJobs(request: SearchJobsRequest): Promise<any> {
  try {
    console.log(request);
    const response = await fetch(`${BASE_URL}/jobs/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    // console.log(response);
    const data = await response.json();
    return data as PageJobResponse;
  } catch (error) {
    throw new Error('Internal Error :(');
  }
}

/**
 * Calls the /communities/search API endpoint.
 */
export async function searchCommunities(
  request: SearchCommunitiesRequest
): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/communities/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    return data as PageCommunityResponse;
  } catch (error) {
    throw new Error('Internal Error :(');
  }
}

/**
 * Calls the /freelancers/search API endpoint.
 */
export async function searchFreelancers(
  request: SearchFreelancersRequest
): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/freelancers/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    return data as PageFreelancerResponse;
  } catch (error) {
    throw new Error('Internal Error :(');
  }
}

/**
 * Fetches skill suggestions from the external API.
 */
// export async function fetchSuggestions(query: string) {
//   // Return an empty array if the query is empty.
//   if (!query.trim()) return [];

//   const myHeaders = new Headers();
//   myHeaders.append("apikey", API_KEY); // API_KEY is now guaranteed to be a string.

//   try {
//     const response = await fetch(
//       `https://api.apilayer.com/skills?q=${encodeURIComponent(query)}`,
//       {
//         method: "GET",
//         redirect: "follow",
//         headers: myHeaders,
//       }
//     );
//     const result = await response.json();
//     // Adjust this based on the API's actual response structure.
//     return result || [];
//   } catch (error) {
//     console.error("Error fetching suggestions:", error);
//     return [];
//   }
// }
