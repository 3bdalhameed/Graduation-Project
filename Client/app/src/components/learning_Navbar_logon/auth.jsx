// src/utils/auth.js
import { checkAuthentication } from '../../api/users';

export const isAuthenticated = async () => {
  try {
    return await checkAuthentication();
  } catch (error) {
    return { isAuthenticated: false };
  }
};
