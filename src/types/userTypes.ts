import { Like, Bookmark, Comment } from './commonTypes';
import { Community } from './communityTypes';
import { Discussion } from './discussionTypes';
export interface BaseUser {
  id: number;
  roleId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: Gender;
  status: Status;
  birthDate: string;
  likes: Like[];
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface DetailedUser extends BaseUser {
  followedCommunitiesCount: number;
  commentCount: number;
  notificationsCount: number;
  followedComunities: Community[];
  discussions: Discussion[];
  comments: Comment[];
  notifications: Notification[];
  bookmarks: Bookmark[];
  _count: {
    discussions: number;
    bookmarks: number;
    comments: number;
    notifications: number;
    followedCommunities: number;
  };
}

export interface LoginUser {
  email: string;
  password: string;
}

type Gender = 'MALE' | 'FEMALE' | 'OTHER';
type Status = 'ACTIVE' | 'BANNED';
interface Role {
  roleId: number;
  roleName: 'ADMIN' | 'MODERATOR' | 'PREMIUM' | 'USER';
}
