import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import userService from '../services/userService';
import { AxiosError } from 'axios';

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error trying to follow this user. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: userService.followUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['userProfile', data.followedId]);

      toast({
        title: 'Success!',
        description: `You followed this user.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: handleError,
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error trying to unfollow this user. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: userService.unfollowUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['userProfile', data.followedId]);
      toast({
        title: 'Success!',
        description: `You unfollowed this user.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: handleError,
  });
};
