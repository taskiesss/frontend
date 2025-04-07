// Type definitions based on Swagger schema
export interface RoleAndPosition {
  nameAndPicture: {
    freelancerProfilePicture: string;
    name: string;
    position: string;
    freelancerId: string;
    admin: boolean;
  };
  description: string;
  positionId: number;
  positionPercent: number;
}

export interface UpdatePositionRequest {
  positionId: number;
  positionName: string;
  financialPercent: number;
  description: string;
}
