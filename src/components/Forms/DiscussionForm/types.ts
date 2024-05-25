export interface ValidationSchema {
  title: ValidationRule;
  content: ValidationRule;
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
