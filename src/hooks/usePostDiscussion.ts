import { useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import discussionService from '../services/discussionService';
import { AxiosError } from 'axios';
import authService from '../services/authService';
import { useQueryClient } from '@tanstack/react-query';

export const usePostDiscussion = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: discussionService.postDiscussion,
    onSuccess: () => {
      toast({
        title: 'Discussion created!',
        description: 'Your discussion was successfully posted.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      queryClient.invalidateQueries({
        queryKey: ['discussions'],
      });

      navigate('/'); // Navigate to discussions list or a specific discussion page
    },
    onError: (error: unknown) => {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 401
      ) {
        authService.getLogout();
        queryClient.clear();
        navigate('/login');
        toast({
          title: 'Session expired',
          description: 'Please log in again.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else if (error instanceof Error) {
        toast({
          title: 'Error creating discussion',
          description:
            'There was an error creating your discussion. Please try again.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });
};
