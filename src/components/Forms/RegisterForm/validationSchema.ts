import { ValidationSchema } from './types';
import { validateBirthDate } from './customValidations';

const validationSchema: ValidationSchema = {
  firstName: {
    required: 'First name is required',
    minLength: {
      value: 3,
      message: 'First name must be at least 3 characters long',
    },
    maxLength: {
      value: 30,
      message: 'First name cannot exceed 30 characters',
    },
    pattern: {
      value: /^[A-Za-z]+$/,
      message: 'First name can only contain letters',
    },
  },
  lastName: {
    required: 'Last name is required',
    minLength: {
      value: 3,
      message: 'Last name must be at least 3 characters long',
    },
    maxLength: {
      value: 30,
      message: 'Last name cannot exceed 30 characters',
    },
    pattern: {
      value: /^[A-Za-z]+$/,
      message: 'Last name can only contain letters',
    },
  },

  userName: {
    required: 'Username is required',
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters long',
    },
    maxLength: {
      value: 16,
      message: 'Username cannot exceed 16 characters',
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: 'Username can only contain letters, numbers, and underscores',
    },
  },

  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: 'Invalid email address',
    },
  },

  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    },
  },

  birthDate: {
    required: 'Birth date is required',
    validate: validateBirthDate,
  },
};

export default validationSchema;
