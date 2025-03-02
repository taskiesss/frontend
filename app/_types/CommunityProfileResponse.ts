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
  communityMembers: Array<{
    name: string;
    position: string;
    freelancerId: string;
    freelancerProfilePicture: string;
  }>;
  isFull: boolean;
  isMember: boolean;
  isAdmin: boolean;
}
