import { ValidationSchema } from './types';

const validationSchema: ValidationSchema = {
  comment: {
    required: 'Comment is required',
    minLength: {
      value: 3,
      message: 'Comment should contain at least 3 characters',
    },
    maxLength: {
      value: 1000,
      message: 'Comment cannot exceed 1000 characters',
    },
    pattern: {
      value: /^[\p{L}\p{N}\s.,?!'"@#$%^&*()[\]{}\-_=+\\|;:<>/~`]*$/u,
      message:
        'Content can only contain letters, numbers, spaces, emojis, and common punctuation',
    },
  },
};

export default validationSchema;
