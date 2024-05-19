import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.getLogout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    },
    onError: (error) => {
      console.error('Sign-out failed:', error);
    },
  });
};
