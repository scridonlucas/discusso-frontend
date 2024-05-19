import { useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: authService.postLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      toast({
        title: 'Succes!',
        description: 'Successfully logged in!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/');
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: 'Incorrect Credentials!',
          description: 'Incorrent email address or password!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Network Error!',
          description: 'Unable to sign in! Please try again later!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });
};
