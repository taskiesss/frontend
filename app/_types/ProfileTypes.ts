export interface portfolioResponse {
  portfolioPdf: string;
  name: string;
}

export interface getfreelancerResponse {
  uuid: string;
  profilePicture: string;
  name: string;
  username: string;
  country: string;
  pricePerHour: number;
  rate: number;
  skills: string[];
  avrgHoursPerWeek: number;
  languages: string[];
  jobTitle: string;
  educations: {
    degree: string;
    institution: string;
    graduationYear: number;
  }[];
  linkedIn: string;
  description: string;
  employeeHistory: {
    position: string;
    company: string;
    startYear: string;
    endYear: string;
  }[];
  experienceLevel: string;
  coverPhoto: string;
}
export interface portfolios {
  content: {
    portfolioPdf: string;
    name: string;
  }[];
  pageable: {
    sort: {
      unsorted: true;
      sorted: true;
      empty: true;
    };
    pageNumber: 0;
    pageSize: 3;
    offset: 0;
    unpaged: true;
  };
  totalElements: 20;
  totalPages: 4;
  size: 10;
  number: 0;
}
