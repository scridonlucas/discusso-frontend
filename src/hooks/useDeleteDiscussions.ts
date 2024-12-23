import discussionService from '../services/discussionService';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useToast } from '@chakra-ui/react';
export const useDeleteDiscussion = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'An error occurred while removing the discussion.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: discussionService.deleteDiscussion,
    onSuccess: () => {
      toast({
        title: 'Successfully removed discussion!',
        description: 'Your discussion has been successfully removed.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      queryClient.invalidateQueries({
        queryKey: ['discussions'],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ['trendingDiscussions'],
        exact: true,
      });

      navigate('/home');
    },
    onError: handleError,
  });
};
