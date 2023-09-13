export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: Gender;
  password: string;
  confirmPassword: string;
}

type Gender = 'male' | 'female' | 'other';
