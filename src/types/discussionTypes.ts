export interface Discussion {
  id: number;
  communityId: number;
  title: string;
  content: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewDiscussion {
  communityId: number;
  title: string;
  content: string;
}

export interface DiscussionsResponse {
  discussions: Discussion[];
  total: number;
}
