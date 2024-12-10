import { useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import authService from '../services/authService';
import { useQueryClient } from '@tanstack/react-query';
import discussionService from '../services/discussionService';
export const usePostComment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: discussionService.postComment,

    onSuccess: () => {
      toast({
        title: 'Comment successfully posted!',
        description: 'Your comment was successfully posted.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      queryClient.invalidateQueries({
        queryKey: ['comments'],
      });
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
          title: 'Error posting comment',
          description:
            'There was an error while posting your comment. Please try again.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });
};
