import { LoginResponse } from '../../types';

const storeLogin = (user: LoginResponse) => {
  window.localStorage.setItem('loggedUser', JSON.stringify(user));
};

export default {
  storeLogin,
};
