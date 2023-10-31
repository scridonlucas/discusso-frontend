import userSerivces from '../../../services/register';

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

export const validateUsernameExists = async (username: string) => {
  const response = userSerivces.checkUsername(username);
  return response;
};

export const validateEmailExists = async (email: string) => {
  const response = userSerivces.checkEmail(email);
  return response;
};
