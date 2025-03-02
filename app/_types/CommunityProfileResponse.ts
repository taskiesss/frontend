export default interface CommunityProfileResponse {
  profilePicture: string;
  coverPhoto: string;
  title: string;
  name: string;
  country: string;
  pricePerHour: number;
  rate: number;
  skills: string[];
  description: string;
  members: Array<{
    name: string;
    position: string;
    src: string;
  }>;
  isFull: boolean;
  isMember: boolean;
  isAdmin: boolean;
}
