import { Like } from './commonTypes';
export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: Gender;
  birthDate: string;
  password: string;
  confirmPassword: string;
  likes: Like[];
  role: Role;
}

export interface LoginUser {
  email: string;
  password: string;
}

type Gender = 'MALE' | 'FEMALE' | 'OTHER';

type Role = 'ADMIN' | 'MODERATOR' | 'PREMIUM' | 'USER';
