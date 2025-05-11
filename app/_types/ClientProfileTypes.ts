// app/_types/ClientProfileTypes.ts
export interface getClientProfileResponse {
  uuid: string;
  name: string;
  username: string;
  country: string;
  rate: number;
  skills: string[];
  languages: string[];
  description: string;
  profilePicture: string;
  coverPhoto: string;
  completedJobs: number;
  totalSpent: number;
}
