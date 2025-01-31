import { ValidationSchema } from './types';

const validationSchema: ValidationSchema = {
  communityId: {
    required: 'Community is required',
  },
  title: {
    required: 'Title is required',
    minLength: {
      value: 3,
      message: 'Title should contain at least 3 characters',
    },
    maxLength: {
      value: 300,
      message: 'Title cannot exceed 300 characters',
    },
    pattern: {
      value: /^[\p{L}\p{N}\s.,!?-]+$/u,
      message: 'Title can only contain letters, numbers, and spaces',
    },
  },
  content: {
    required: 'Content is required',
    minLength: {
      value: 20,
      message: 'Content should contain at least 20 characters',
    },
    maxLength: {
      value: 1000,
      message: 'Content cannot exceed 1000 characters',
    },
    pattern: {
      value: /^[\p{L}\p{N}\p{Emoji}\s.,!?'"@#$%^&*()[\]{}\-_=+\\|;:<>/~`]+$/u,
      message:
        'Content can only contain letters, numbers, punctuation, and emojis',
    },
  },
};

export default validationSchema;
