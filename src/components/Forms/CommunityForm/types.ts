export interface ValidationSchema {
  communityName: ValidationRule;
  description?: ValidationRule;
}

interface ValidationRule {
  required?: string;
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
