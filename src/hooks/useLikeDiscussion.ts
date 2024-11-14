import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import likeService from '../services/likeDiscussionService';
import { AxiosError } from 'axios';
import { Discussion as DiscussionType } from '../types/discussionTypes';
import { useSortingOptions } from './useSortingOptions';
import { NewLikeResponse } from '../types/commonTypes';

type PaginatedDiscussions = InfiniteData<{
  discussions: DiscussionType[];
  nextPage?: number | null;
}>;

export const useLikeDiscussion = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { sortCriteria, timeFrame, feedType } = useSortingOptions();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'An error occurred while liking the discussion.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const likeDiscussion = useMutation({
    mutationFn: likeService.addLike,
    onSuccess: (likeData) => {
      queryClient.setQueryData<PaginatedDiscussions>(
        ['discussions', sortCriteria, timeFrame, feedType],
        (oldData) => {
          if (!oldData) return oldData;
          console.log(oldData);
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              discussions: page.discussions.map((discussion) => {
                if (discussion.id === likeData.discussionId) {
                  return {
                    ...discussion,
                    likes: [
                      ...discussion.likes,
                      {
                        user: {
                          id: likeData.userId,
                          username: likeData.user.username,
                        },
                      },
                    ],
                    _count: {
                      ...discussion._count,
                      likes: discussion._count.likes + 1,
                    },
                  };
                }
                return discussion;
              }),
            })),
          };
        }
      );
      queryClient.setQueryData<DiscussionType>(
        ['discussion', likeData.discussionId],
        (oldDiscussion) => {
          if (!oldDiscussion) return oldDiscussion;
          console.log(oldDiscussion);
          return {
            ...oldDiscussion,
            likes: [
              ...oldDiscussion.likes,
              {
                user: {
                  id: likeData.userId,
                  username: likeData.user.username,
                },
              },
            ],
            _count: {
              ...oldDiscussion._count,
              likes: oldDiscussion._count.likes + 1,
            },
          };
        }
      );
    },
    onError: handleError,
  });

  const unlikeDiscussion = useMutation({
    mutationFn: likeService.deleteLike,
    onSuccess: (likeData) => {
      queryClient.setQueryData<PaginatedDiscussions>(
        ['discussions', sortCriteria, timeFrame, feedType],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              discussions: page.discussions.map((discussion) => {
                if (discussion.id === likeData.discussionId) {
                  return {
                    ...discussion,
                    likes: discussion.likes.filter(
                      (like) => like.user.id !== likeData.userId
                    ),
                    _count: {
                      ...discussion._count,
                      likes: discussion._count.likes - 1,
                    },
                  };
                }
                return discussion;
              }),
            })),
          };
        }
      );
      queryClient.setQueryData<DiscussionType>(
        ['discussion', likeData.discussionId],
        (oldDiscussion) => {
          if (!oldDiscussion) return oldDiscussion;
          console.log(oldDiscussion);
          return {
            ...oldDiscussion,
            likes: oldDiscussion.likes.filter(
              (like) => like.user.id !== likeData.userId
            ),
            _count: {
              ...oldDiscussion._count,
              likes: oldDiscussion._count.likes - 1,
            },
          };
        }
      );
    },
    onError: handleError,
  });

  return { likeDiscussion, unlikeDiscussion };
};
