import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import communityService from '../services/communityService';
import { AxiosError } from 'axios';
import { Community } from '../types/communityTypes';

const updateCommunityInCache = (
  oldData: Community[] | undefined,
  communityId: number,
  userId: number,
  isFollow: boolean
): Community[] | undefined => {
  if (!oldData) return oldData;

  return oldData.map((community) => {
    if (community.id === communityId) {
      const isAlreadyFollowed = community.followers.some(
        (follower) => follower.id === userId
      );

      if (isFollow && !isAlreadyFollowed) {
        return {
          ...community,
          followers: [...community.followers, { id: userId }],
          _count: {
            ...community._count,
            followers: community._count.followers + 1,
          },
        };
      } else if (!isFollow && isAlreadyFollowed) {
        return {
          ...community,
          followers: community.followers.filter(
            (follower) => follower.id !== userId
          ),
          _count: {
            ...community._count,
            followers: community._count.followers - 1,
          },
        };
      }
    }
    return community;
  });
};

export const useFollowCommunity = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error trying to follow this community. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: communityService.followCommunity,
    onSuccess: (data) => {
      queryClient.setQueryData<Community[] | undefined>(
        ['communities'],
        (oldData) =>
          updateCommunityInCache(oldData, data.communityId, data.userId, true)
      );
      toast({
        title: 'Success!',
        description: 'You followed this community.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: handleError,
  });
};

export const useUnfollowCommunity = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error trying to unfollow this community. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: communityService.unfollowCommunity,
    onSuccess: (data) => {
      queryClient.setQueryData<Community[] | undefined>(
        ['communities'],
        (oldData) =>
          updateCommunityInCache(oldData, data.communityId, data.userId, false)
      );
      toast({
        title: 'Success!',
        description: 'You unfollowed this community.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: handleError,
  });
};
