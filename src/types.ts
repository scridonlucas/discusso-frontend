export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: Gender;
}

type Gender = 'male' | 'female' | '';
