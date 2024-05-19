import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import registerService from '../services/registerService';

export const useSignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: registerService.postUser,
    onSuccess: () => {
      toast({
        title: 'Signed up!',
        description: 'Account succesfully created',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/login');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast({
          title: 'Network error!',
          description: 'Failed to create a new account! Please try again later',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });
};
