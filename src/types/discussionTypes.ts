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
  community: {
    name: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
  likes: {
    user: {
      id: number;
      username: string;
    };
  }[];
  comments: {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
      id: number;
      username: string;
    };
  }[];
  bookmarks: {
    user: { id: number; username: string };
  }[];
}
export interface NewDiscussion {
  communityId: number;
  title: string;
  content: string;
}

export interface DiscussionsResponse {
  discussions: Discussion[];
  total: number;
  nextCursor: number | null;
}

export interface TrendingDiscussionResponse {
  discussions: Discussion[];
}
