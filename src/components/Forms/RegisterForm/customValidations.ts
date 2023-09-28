export const validateBirthDate = (value: string) => {
  const currentDate = new Date();
  const userBirthDate = new Date(value);
  const age = currentDate.getFullYear() - userBirthDate.getFullYear();
  if (age < 16) {
    return 'You must be at least 16 years old.';
  }
  if (age > 130) {
    return 'Invalid date';
  }
  return true;
};
