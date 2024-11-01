export interface Discussion {
  id: number;
  title: string;
  content: string;
  userId: number;
  communityId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    username: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
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
