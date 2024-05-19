import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/authService';

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.getLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error) => {
      console.error('Sign-out failed:', error);
    },
  });
};
