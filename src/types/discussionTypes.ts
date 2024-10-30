import { Like, Comment, Bookmark } from './commonTypes';
import { User } from './userTypes';
import { Community } from './communityTypes';

export interface Discussion {
  id: number;
  title: string;
  content: string;
  userId: number;
  communityId: number;
  likes: Like[];
  comments: Comment[];
  bookmarks: Bookmark[];
  createdAt: Date;
  updatedAt: Date;
  reports: Report[];
  user: User;
  community: Community;
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
