import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import discussionService from '../services/discussionService';
import { AxiosError } from 'axios';
import { Discussion as DiscussionType } from '../types/discussionTypes';
import { NewLikeResponse } from '../types/commonTypes';

type PaginatedDiscussions = InfiniteData<{
  discussions: DiscussionType[];
  nextPage?: number | null;
}>;

const updateDiscussionInCache = (
  oldData: PaginatedDiscussions | undefined,
  likeData: NewLikeResponse,
  isLike: boolean
): PaginatedDiscussions | undefined => {
  if (!oldData) return oldData;

  return {
    ...oldData,
    pages: oldData.pages.map((page) => ({
      ...page,
      discussions: page.discussions.map((discussion) => {
        if (discussion.id === likeData.discussionId) {
          const isAlreadyLiked = discussion.likes.some(
            (like) => like.user.id === likeData.userId
          );
          if (isLike && !isAlreadyLiked) {
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
          } else if (!isLike && isAlreadyLiked) {
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
        }
        return discussion;
      }),
    })),
  };
};

export const useLikeDiscussion = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

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
    mutationFn: discussionService.addLike,
    onSuccess: (likeData: NewLikeResponse) => {
      const queries = queryClient.getQueryCache().findAll({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === 'discussions',
      });

      queries.forEach(({ queryKey }) => {
        queryClient.setQueryData<PaginatedDiscussions>(queryKey, (oldData) =>
          updateDiscussionInCache(oldData, likeData, true)
        );
      });

      queryClient.setQueryData<DiscussionType>(
        ['discussion', likeData.discussionId],
        (oldDiscussion) => {
          if (!oldDiscussion) return oldDiscussion;

          const isAlreadyLiked = oldDiscussion.likes.some(
            (like) => like.user.id === likeData.userId
          );

          if (isAlreadyLiked) return oldDiscussion;

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

      queryClient.invalidateQueries({
        queryKey: ['trendingDiscussions'],
      });
    },

    onError: handleError,
  });

  const unlikeDiscussion = useMutation({
    mutationFn: discussionService.deleteLike,
    onSuccess: (likeData: NewLikeResponse) => {
      const queries = queryClient.getQueryCache().findAll({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === 'discussions',
      });

      queries.forEach(({ queryKey }) => {
        queryClient.setQueryData<PaginatedDiscussions | undefined>(
          queryKey,
          (oldData) => updateDiscussionInCache(oldData, likeData, false)
        );
      });

      // Update individual discussion cache
      queryClient.setQueryData<DiscussionType>(
        ['discussion', likeData.discussionId],
        (oldDiscussion) => {
          if (!oldDiscussion) return oldDiscussion;

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

      queryClient.invalidateQueries({
        queryKey: ['trendingDiscussions'],
      });
    },
    onError: handleError,
  });

  return { likeDiscussion, unlikeDiscussion };
};
