import { ValidationSchema } from './types';

const validationSchema: ValidationSchema = {
  ticker: {
    required: 'Symbol is required',
  },
};

export default validationSchema;
