export interface Community {
  id: number;
  name: string;
  description: string | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  followers: { id: number }[];
  _count: {
    discussions: number;
    followers: number;
  };
}

export interface NewCommunityParams {
  communityName: string;
  description?: string;
}

export interface CommunityUpdateParams {
  communityName?: string;
  description?: string;
  isDeleted?: boolean;
}

export interface FollowCommunityResponse {
  id: number;
  userId: number;
  communityId: number;
  joinedAt: Date;
}
