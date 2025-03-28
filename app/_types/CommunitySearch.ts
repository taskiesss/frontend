export interface SearchCommunitiesRequest {
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
  /**     Filters Full communities     */
  isFull?: boolean;
}

export interface CommunityResponse {
  id: string;
  name: string;
  description: string;
  skills: string[];
  experienceLevel: 'entry_level' | 'intermediate' | 'expert';
  memberCount: number;
  pricePerHour: number;
  rate: number;
  profilePicture: string;
  isFull: boolean;
}

// Define the page response schema
export interface PageCommunityResponse {
  content: CommunityResponse[];
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
