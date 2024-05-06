export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: Gender;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

type Gender = 'male' | 'female' | 'other';

export interface Exists {
  exists: boolean;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}
