/**
 * Request payload for searching freelancers.
 */
export interface SearchFreelancersRequest {
  /** A keyword or partial name to search for freelancers */
  search?: string;
  /** An array of skills to filter by */
  skills?: string[];
  /**
   * Freelancer's experience level.
   * Expected values: "entry_level", "intermediate", or "expert"
   */
  experienceLevel?: string[];
  /** Minimum hourly rate */
  hourlyRateMin?: number;
  /** Maximum hourly rate */
  hourlyRateMax?: number;
  /** Filter by rating (e.g., 1-5) */
  rate?: number;
  /** Zero-based page index */
  page?: number;
  /** Size of each page */
  size?: number;
  /** Sorting field, e.g., "rate", "pricePerHour", or "name" */
  sortBy?: string;
  /** Sorting direction ("ASC" or "DESC") */
  sortDirection?: 'ASC' | 'DESC';
}

/**
 * Represents a freelancer's profile in the search response.
 */
export interface FreelancerResponse {
  id: string;
  name: string;
  title: string;
  description: string;
  skills: string[];
  experienceLevel: 'entry_level' | 'intermediate' | 'expert';
  rate: number;
  avrgHoursPerWeek: number;
  pricePerHour: number;
  profilePicture: string;
}

/**
 * Defines the paginated response structure for freelancers search.
 */
export interface PageFreelancerResponse {
  content: FreelancerResponse[];
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
