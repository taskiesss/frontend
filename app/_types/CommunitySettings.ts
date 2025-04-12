// Matches the GET response structure
export interface CommunityRolesResponse {
  isUserAdmin: boolean;
  communityMembers: RoleAndPosition[];
}

export interface RoleAndPosition {
  nameAndPicture: {
    freelancerProfilePicture: string;
    name: string;
    position: string; // From nameAndPicture in Swagger
    freelancerId?: string;
    admin?: boolean;
  };
  description: string;
  positionId: number;
  currentPercentage: number; // Renamed from currentPercentage
  futurePercentage: number; // Renamed from futurePercentage
}

// Matches the POST request body requirements
export interface UpdatePositionRequest {
  positionId: number; // 0 indicates new position
  positionName: string;
  financialPercent: number; // float format
  description: string;
}
