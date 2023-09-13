export interface ValidationSchema {
  firstName: ValidationRule;
  lastName: ValidationRule;
  userName: ValidationRule;
  email: ValidationRule;
  password: ValidationRule;
}

interface ValidationRule {
  required: string;
  minLength?: lengthRule;
  maxLength?: lengthRule;
  pattern?: patternRule;
}

interface lengthRule {
  value: number;
  message: string;
}

interface patternRule {
  value: RegExp;
  message: string;
}
