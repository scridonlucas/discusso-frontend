import authService from '../services/authService';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: authService.getAuth,
    refetchOnWindowFocus: false,
  });
};
