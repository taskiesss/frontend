// Define the request schema (matching your OpenAPI schema)
export interface SearchJobsRequest {
  /** A keyword or partial title to search for jobs */
  search?: string;
  /** An array of skills to filter by */
  skills?: string[];
  /** An array of experience levels (e.g., "entry_level", "intermediate", "expert") */
  experienceLevel?: string[];
  /** Minimum hourly rate */
  hourlyRateMin?: number;
  /** Maximum hourly rate */
  hourlyRateMax?: number;
  /** An array of project length codes (e.g., "_less_than_1_month", "_1_to_3_months", etc.) */
  projectLength?: string[];
  /** Zero-based page index */
  page?: number;
  /** Size of each page */
  size?: number;
  /** Sorting field, e.g., "title" or "postedDate" */
  sortBy?: string;
  /** Sorting direction ("ASC" or "DESC") */
  sortDirection?: 'ASC' | 'DESC';
  /** Filter by rating (e.g., 1-5) */
  rate?: number;
}

// Define the job response schema (partial example)
export interface JobResponse {
  id: string;
  title: string;
  description: string;
  experienceLevel: 'Entry Level' | 'Intermediate' | 'Expert';
  skills: string[];
  pricePerHour: number;
  postedDate: string;
  projectLength: string;
  rate: number;
  isSaved: boolean;
}

// Define the page response schema
export interface PageJobResponse {
  content: JobResponse[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
