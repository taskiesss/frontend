// Updated to match the Swagger GET response
export interface RoleAndPosition {
  nameAndPicture: {
    freelancerProfilePicture: string;
    name: string;
    position: string; // Matches the "position" field in nameAndPicture
    freelancerId?: string;
    admin?: boolean;
  };
  description: string;
  positionId: number;
  currentPercentage: number; // Renamed from positionPercent
  futurePercentage: number; // Added missing field
}

// Matches the Swagger POST request body
export interface UpdatePositionRequest {
  positionId: number; // 0 indicates new position
  positionName: string;
  financialPercent: number; // float format
  description: string;
}
