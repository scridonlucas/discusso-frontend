import { ValidationSchema } from './types';

const validationSchema: ValidationSchema = {
  communityName: {
    required: 'Community Name is required',
    minLength: {
      value: 3,
      message: 'Community name should contain at least 3 characters',
    },
    maxLength: {
      value: 30,
      message: 'Community name cannot exceed 30 characters',
    },
    pattern: {
      value: /^[a-zA-Z]+$/,
      message: 'Community name can only contain alphabetic characters',
    },
  },

  description: {
    minLength: {
      value: 3,
      message: 'Community description should contain at least 3 characters',
    },
    maxLength: {
      value: 200,
      message: 'Community description cannot exceed 1000 characters',
    },
    pattern: {
      value: /^[a-zA-Z0-9\s.,'";:!?\-()&]+$/,
      message: 'Community description contains invalid characters.',
    },
  },
};

export default validationSchema;
