export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: Gender;
}

type Gender = 'male' | 'female' | '';
